import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import multer from 'multer';
import { create } from 'ipfs-core';
import URL from './models/url.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI (replace with your own connection string)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Setup multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize IPFS (setup only once)
let ipfs;
async function initializeIpfs() {
  try {
    ipfs = await create();
    console.log("IPFS node is ready");
  } catch (error) {
    console.error("Failed to initialize IPFS:", error);
    process.exit(1);
  }
}
initializeIpfs();

// Function to detect file type based on the file's extension
function getFileType(filename) {
  const extension = filename.split('.').pop();
  const allowedTypes = ['html', 'js', 'jsx', 'ts', 'tsx', 'xlsx', 'py', 'ipynb', 'pdf', 'docx', 'txt', 'png', 'jpg'];
  return allowedTypes.includes(extension) ? extension : 'unknown';
}

// Function to handle file upload and URL generation
async function handleFileUpload(req, res) {
  try {
    const { file, body: { projectName } } = req;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Get the file type
    const fileType = getFileType(file.originalname);
    if (fileType === 'unknown') {
      return res.status(400).json({ message: "Unsupported file type." });
    }

    // Add file to IPFS
    const { cid } = await ipfs.add(file.buffer);
    const link = `https://ipfs.io/ipfs/${cid.toString()}`;

    // Generate a shortened link and save to MongoDB
    const shortId = nanoid(6);
    const newUrl = new URL({
      redirectUrl: link,
      shortId,
      projectName,
      fileType
    });

    await newUrl.save();
    res.json({ shortLink: `https://bitbnb.io/${shortId}`, ipfsLink: link });
  } catch (error) {
    console.error("File upload failed:", error);
    res.status(500).json({ message: "File upload failed" });
  }
}
// API to create a short link for an IPFS hash
app.post('/api/createLink', async (req, res) => {
    const { ipfsHash, projectName, fileType } = req.body; // fileType is now expected in the request body
    const shortId = nanoid(6);
  
    // Validate inputs
    if (!ipfsHash || !projectName || !fileType) {
      return res.status(400).json({ message: "ipfsHash, projectName, and fileType are required." });
    }
  
    // Create a new URL entry in the database
    const newLink = new URL({
      redirectUrl: ipfsHash,
      shortId,
      projectName,
      fileType
    });
  
    try {
      await newLink.save();
      res.json({ shortLink: `https://bitbnb.io/${shortId}` });
    } catch (error) {
      console.error("Failed to create link:", error);
      res.status(500).json({ message: "Failed to create link" });
    }
  });
  

// Upload file endpoint
app.post('/upload', upload.single('file'), handleFileUpload);

// Redirect route for short links
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const urlEntry = await URL.findOne({ shortId });

  if (urlEntry) {
    res.redirect(urlEntry.redirectUrl);
  } else {
    res.status(404).send('Link not found');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

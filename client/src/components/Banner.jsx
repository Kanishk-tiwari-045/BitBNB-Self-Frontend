import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import hivesigner from 'hivesigner';
import Banner_img from '../assets/img/hero-img.png';
import '../assets/css/Banner.css';

const pinataApiKey = '5004f4bb6975fc5b3dd5';
const pinataSecretApiKey = '6abc06dfffd3a54a34982349ad6281a1af35852849204db6148be88ed8444995';
const ipfsBackendUrl = 'http://localhost:8080/upload';
const shortLinkBackendUrl = 'http://localhost:8080/api/createLink';

function BannerButton({ className, text, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}

function Banner() {
  const [username, setUsername] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [shortLink, setShortLink] = useState(null);
  const [ipfsLink, setIpfsLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const client = new hivesigner.Client({
    app: 'BitBnB',
    callbackURL: 'https://your-callback-url.com',
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  const loginWithKeychain = () => {
    if (window.hive_keychain) {
      window.hive_keychain.requestHandshake(() => {
        window.hive_keychain.requestSignBuffer(null, 'Login verification', 'Posting', (response) => {
          if (response.success) {
            setUsername(response.data.username);
          } else {
            console.error('Failed to log in with Hive Keychain.');
          }
        });
      });
    } else {
      console.error('Hive Keychain is not installed. Please install it to continue.');
    }
  };

  const handleLogout = () => {
    setUsername(null);
    setFile(null);
    setFileName('');
    setProjectName('');
    setShortLink(null);
    setIpfsLink(null);
    setError('');
    console.log('Logged out successfully.');
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
    setShortLink(null);
    setIpfsLink(null);
    setError('');

    // Prompt for project name when a file is selected
    const project = prompt("Please enter the project name:");
    setProjectName(project);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const fileType = file.type; // Auto-detect file type
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    formData.append('projectName', projectName); // Use the project name entered by the user

    try {
      setLoading(true);
      if (fileType === 'text/html') {
        // HTML file upload process
        const response = await axios.post(ipfsBackendUrl, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setShortLink(response.data.shortLink);
        setIpfsLink(response.data.ipfsLink);
        await saveToMongoDB(response.data.shortLink, response.data.ipfsLink, projectName, fileName, fileType);
      } else {
        // Non-HTML file upload to Pinata
        const pinataResponse = await axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, formData, {
          headers: {
            'Content-Type': `multipart/form-data`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        });
        const ipfsHash = pinataResponse.data.IpfsHash;
        const shortLinkResponse = await axios.post(shortLinkBackendUrl, { ipfsHash });
        setShortLink(shortLinkResponse.data.shortLink);
        setIpfsLink(`https://ipfs.io/ipfs/${ipfsHash}`);
      }
    } catch (err) {
      setError('Failed to upload file: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-2" data-aos="fade-up" data-aos-delay="200">
              <h1>Future of Deployment with Decentralization</h1>
              <h2>Revolutionize your applications with our secure decentralized deployment solutions. Experience faster, more efficient deployments that empower you to take control.</h2>
              <div className="d-flex flex-column align-items-start justify-content-center justify-content-lg-start">
                {username ? (
                  <>
                    <p style={{ color: '#f3ac12', fontSize: '1.5rem', fontWeight: '600' }}>Welcome, {username}!</p>
                    <input type="file" onChange={handleFileChange} className="mb-2" />
                    {fileName && <p>Selected File: {fileName}</p>}
                    <BannerButton className="btn-get-started mb-4" text={loading ? 'Uploading...' : 'Submit'} onClick={handleUpload} />
                    {shortLink && ipfsLink && (
                      <p>
                        Short link: <a href={shortLink}>{shortLink}</a><br />
                        IPFS link: <a href={ipfsLink}>{ipfsLink}</a>
                      </p>
                    )}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <BannerButton className="btn-get-started" text="Logout" onClick={handleLogout} />
                  </>
                ) : (
                  <BannerButton className="btn-get-started" text="Start Hive Keychain" onClick={loginWithKeychain} />
                )}
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
              <img src={Banner_img} className="img-fluid animated" alt="Banner" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;

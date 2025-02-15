import React from "react";
import "./App.css";
import 'aos/dist/aos.css';
import Header from './components/Nav.jsx';
import Banner from './components/Banner.jsx';
import Services from './components/Services.jsx';
import Portfolio from './components/Templates.jsx';
import Pricing from './components/Pricing.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner/>
      <Services />
      <Portfolio />
      <Pricing />
      <Contact />
      <Footer/>
    </div>
  );
}

export default App;

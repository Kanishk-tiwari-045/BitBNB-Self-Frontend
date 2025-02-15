import React from "react";
import "./App.css";
import 'aos/dist/aos.css';
import Header from './Components/Nav.jsx';
import Banner from './Components/Banner.jsx';
import Services from './Components/Services.jsx';
import Portfolio from './Components/Templates.jsx';
import Pricing from './Components/Pricing.jsx';
import Contact from './Components/Contact.jsx';
import Footer from './Components/Footer.jsx';

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

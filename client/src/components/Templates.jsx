import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/Templates.css';
import portfolioImg2 from '../assets/img/sddefault.jpg';
import portfolioImg3 from '../assets/img/desktop-wallpaper-react-js-reactjs.jpg';
import portfolioImg7 from '../assets/img/DWxBwZz.png';

function PortfolioItem({ image, title, category, imageFull, detailsLink }) {
  return (
    <div className={`col-lg-4 col-md-6 portfolio-item ${category}`}>
      <div className="portfolio-img"><img src={image} className="img-fluid" alt={title} /></div>
      <div className="portfolio-info">
        <h4>{title}</h4>
        <p>{category}</p>
        <a href={imageFull} data-gallery="portfolioGallery" className="portfolio-lightbox preview-link" title={title}><i className="bx bx-plus"></i></a>
        <a href={detailsLink} className="details-link" title="More Details"><i className="bx bx-link"></i></a>
      </div>
    </div>
  );
}

function Portfolio() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  const [activeFilter, setActiveFilter] = useState('*');

  const portfolioItems = [
    
    { image: portfolioImg2, title: 'Responsive Portfolio Template', category: 'HTML-CSS-JS', imageFull: 'assets/img/portfolio/portfolio-2.jpg', detailsLink: 'portfolio-details.html' },
    { image: portfolioImg7, title: 'Admin Dashboard Template', category: 'Vite React App', imageFull: 'assets/img/portfolio/portfolio-7.jpg', detailsLink: 'portfolio-details.html' },
    { image: portfolioImg3, title: 'E-commerce Store Template', category: 'Create React App', imageFull: 'assets/img/portfolio/portfolio-3.jpg', detailsLink: 'portfolio-details.html' },
  ];

  const filteredItems = activeFilter === '*'
    ? portfolioItems
    : portfolioItems.filter(item => item.category.includes(activeFilter));

  return (
      <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Portfolio</h2>
            <p>What we offer in our Deploying Templates</p>
          </div>
          <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
            {filteredItems.map((item, index) => (
              <PortfolioItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
  );
}

export default Portfolio;

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/Services.css';

const ServiceCard = ({ iconClass, title, description, delay }) => (
  <div className={`col-xl-3 col-md-6 d-flex align-items-stretch mt-4 ${delay ? `mt-xl-0` : ''}`} data-aos="zoom-in" data-aos-delay={delay}>
    <div className="icon-box">
      <div className="icon"><i className={iconClass}></i></div>
      <h4><a href="">{title}</a></h4>
      <p>{description}</p>
    </div>
  </div>
);

function Services() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }, []);

  const services = [
    {
      iconClass: "bx bxl-dribbble",
      title: " Decentralized App Deployment",
      description: "Deploy your applications across multiple nodes, ensuring high availability and resilience against outages. We use cutting-edge technologies to manage your deployments seamlessly.",
      delay: "100"
    },
    {
      iconClass: "bx bx-file",
      title: "Secure Blockchain Integration",
      description: "Integrate blockchain technology into your applications for enhanced security and transparency. Our team helps you harness the power of smart contracts and decentralized networks.",
      delay: "200"
    },
    {
      iconClass: "bx bx-tachometer",
      title: "Real-time Monitoring & Management",
      description: "Keep track of your deployments in real-time. Our monitoring tools provide insights into performance and security, allowing you to make informed decisions.",
      delay: "300"
    },
    {
      iconClass: "bx bx-layer",
      title: "Custom Development Solutions",
      description: "From concept to deployment, we offer tailored solutions that meet your specific needs. Our developers are experts in modern frameworks and decentralized technologies.",
      delay: "400"
    }
  ];

  return (
    <section id="services" className="services section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Services</h2>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

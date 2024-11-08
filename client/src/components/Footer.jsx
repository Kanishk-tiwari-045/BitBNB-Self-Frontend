import React from 'react';
import '../assets/css/Footer.css';

const FooterLinkList = ({ title, links }) => (
    <div className="col-lg-3 col-md-6 footer-links">
        <h4>{title}</h4>
        <ul>
            {links.map((link) => (
                <li key={link.title}><i className="bx bx-chevron-right"></i> <a href={link.url}>{link.title}</a></li>
            ))}
        </ul>
    </div>
);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

const SocialLinks = ({ links }) => (
    <div className="social-links mt-3 d-flex align-items-center">
        {links.map((link) => (
            <a key={link.name} href={link.url} className={`me-3 ${link.name}`}>
                <i className={`bx bxl-${link.name}`}></i>
            </a>
        ))}
        <a 
            onClick={scrollToTop} 
            className="back-to-top d-flex align-items-center justify-content-center" 
            href="javascript:void(0)"
            style={{ borderRadius: '50%', textDecoration: 'none' }}>
            <i className="bi bi-arrow-up-short"></i>
        </a>
    </div>
);

const Footer = () => {
    const usefulLinks = [
        { title: "Home", url: "#hero" },
        { title: "About us", url: "#about-2" },
        { title: "Services", url: "#services" },
        { title: "Terms of service", url: "#" },
    ];

    const serviceLinks = [
        { title: "Web Design", url: "#" },
        { title: "Web Development", url: "#" },
        { title: "Deployment", url: "#" },
        { title: "Dectralization", url: "#" },
    ];

    const socialLinks = [
        { name: "twitter", url: "#" },
        { name: "instagram", url: "https://www.instagram.com/imtiyaz_15/?hl=en" },
        { name: "linkedin", url: "https://in.linkedin.com/in/shamim-imtiyaz-11a3406b" }
    ];

    return (
        <footer id="footer">
            {/* <Newsletter /> */}
            <div className='footer-top'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h3>BitBNB</h3>
                            <address>
                            JK Lakshmipat University,<br />near Mahindra Seiz <br />Mahapura, Rajasthan 302026 <br />
                            <br />
                                <strong>Phone:</strong> +1 5589 55488 55<br />
                                <strong>Email:</strong> info@example.com<br />
                            </address>
                        </div>

                        <FooterLinkList title="Useful Links" links={usefulLinks} />
                        <FooterLinkList title="Our Services" links={serviceLinks} />
                        
                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Our Social Networks</h4>
                            <SocialLinks links={socialLinks} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container footer-bottom clearfix">
            <div className="copyright" style={{ fontSize: '12px' }}>
                &copy; Copyright <span>BitBNB</span>. All Rights Reserved
            </div>
                <div className="credits">
                    Designed by <a href="https://github.com/Kanishk-tiwari-045/Trial-Page">Our Team</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

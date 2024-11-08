import React, { useState } from 'react';
import '../assets/css/Contact.css';

function Contact() {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', contact);
    // Reset form after submission
    setContact({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Contact</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>

        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
              <i className="bx bx-current-location"></i> 
                <h4>Location:</h4>
                <p>JK Lakshmipat University, Mahapura, Rajasthan 302026</p>
              </div>

              <div className="email">
                <i className="bx bx-mail-send"></i>
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>

              <div className="phone">
                <i className="bx bx-phone"></i>
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div>
              <iframe 
                src="https://www.google.com/maps/place/JK+Lakshmipat+University/@26.8361186,75.6476541,17z/data=!3m1!4b1!4m6!3m5!1s0x396c4af4fe68f403:0x3bf05f95df22b8c4!8m2!3d26.8361138!4d75.650229!16s%2Fm%2F0cp46q7?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
                frameBorder="0" 
                title='Google-Maps'
                style={{borderRadius:'10px', width: '100%', height: '290px'}} 
                allowFullScreen>
              </iframe>
            </div>
          </div>

          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    required 
                    value={contact.name} 
                    onChange={handleInputChange}
                    style={{
                      boxShadow: 'none', // Default state
                      transition: 'box-shadow 0.3s ease-in-out' // Smooth transition for focus effect
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(243, 172, 18, 0.8)'} // Yellow shadow on focus
                    onBlur={(e) => e.target.style.boxShadow = 'none'} // Remove shadow on blur
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email" 
                    required 
                    value={contact.email} 
                    onChange={handleInputChange}
                    style={{
                      boxShadow: 'none', // Default state
                      transition: 'box-shadow 0.3s ease-in-out' // Smooth transition for focus effect
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(243, 172, 18, 0.8)'} // Yellow shadow on focus
                    onBlur={(e) => e.target.style.boxShadow = 'none'} // Remove shadow on blur
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="subject" 
                  id="subject" 
                  required 
                  value={contact.subject} 
                  onChange={handleInputChange}
                  style={{
                    boxShadow: 'none', // Default state
                    transition: 'box-shadow 0.3s ease-in-out' // Smooth transition for focus effect
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(243, 172, 18, 0.8)'} // Yellow shadow on focus
                  onBlur={(e) => e.target.style.boxShadow = 'none'} // Remove shadow on blur
                />
              </div>
              <div className="form-group">
              <label htmlFor="message">Message</label>
                <textarea 
                  className="form-control" 
                  name="message" 
                  rows="10" 
                  required 
                  value={contact.message} 
                  onChange={handleInputChange}
                  style={{
                    boxShadow: 'none', // Default state
                    transition: 'box-shadow 0.3s ease-in-out' // Smooth transition for focus effect
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 10px rgba(243, 172, 18, 0.8)'} // Yellow shadow on focus
                  onBlur={(e) => e.target.style.boxShadow = 'none'} // Remove shadow on blur
                ></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

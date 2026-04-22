import { useState } from 'react';

const contactInfo = [
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    text: 'pawanchoudhary882455@gmail.com',
    link: 'mailto:pawanchoudhary882455@gmail.com',
  },
  {
    icon: 'fas fa-phone-alt',
    title: 'Phone',
    text: '+91 7851876776',
    link: 'tel:+917851876776',
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Location',
    text: 'Jaipur, India',
    link: 'https://maps.app.goo.gl/2opVU8RE46BxCRG46',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get Web3Forms access key from environment variables
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    // Check if the key is missing or is the default placeholder
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      alert(
        "API Key is missing! To make this form work:\n\n" +
        "1. Go to https://web3forms.com/\n" +
        "2. Enter your email to get a free Access Key.\n" +
        "3. Open the '.env' file in your project and paste your key.\n" +
        "4. Restart the development server."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission from Portfolio',
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you! Your message has been sent successfully to Pawan.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(result.message || 'Something went wrong sending the message. Please try again.');
        console.error('Web3Forms Error:', result);
      }
    } catch (error) {
      console.error('Email error:', error);
      alert('Error sending message. Please check your internet connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section bg-light" id="contact">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </div>

        <div className="contact-wrapper">
          {/* Contact Info */}
          <div className="contact-info-block">
            <h3 className="contact-heading">
              <i className="fas fa-phone-alt" style={{ marginRight: '12px', color: '#3b82f6' }}></i>
              Contact Information
            </h3>
            <p className="contact-desc">
              Feel free to reach out through any of these channels. I'm always excited to discuss new projects
              and opportunities.
            </p>

            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <a 
                  href={info.link} 
                  target={info.title === 'Location' ? '_blank' : '_self'} 
                  rel="noopener noreferrer" 
                  className="info-card" 
                  key={index}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="info-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div>
                    <h4 className="info-title">{info.title}</h4>
                    <p className="info-text">{info.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-block">
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

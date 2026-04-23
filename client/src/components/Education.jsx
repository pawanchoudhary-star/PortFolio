import React from 'react';

const Education = () => {
  return (
    <section id="education" className="section bg-light">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Education & Certifications</h2>
          <p className="section-subtitle">My academic background and professional qualifications</p>
        </div>

        <div className="education-wrapper">
          <div className="education-column">
            <h3 className="education-heading"><i className="fas fa-graduation-cap"></i> Education</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2025 - Present</div>
                <h4 className="timeline-title">Bachelor of Computer Applications (BCA)</h4>
                <p className="timeline-text">Focusing on practical software development, data structures, and modern web technologies.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2022 - 2024</div>
                <h4 className="timeline-title">Higher Secondary Education</h4>
                <p className="timeline-text">Completed higher secondary education in Commerce stream with a focus on Business Studies, Accountancy, and Economics.</p>
              </div>
            </div>
          </div>

          <div className="education-column">
            <h3 className="education-heading"><i className="fas fa-certificate"></i> Certifications</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2026</div>
                <h4 className="timeline-title">Introduction to Frontend Developer</h4>
                <p className="timeline-text">
                  <a href="https://simpli.app.link/xdbcLzliOZb" target="_blank" rel="noopener noreferrer" className="cert-link">View Certificate</a>
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2026</div>
                <h4 className="timeline-title">React</h4>
                <p className="timeline-text">
                  <a href="https://simpli.app.link/6rsJsTLiOZb" target="_blank" rel="noopener noreferrer" className="cert-link">View Certificate</a>
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2026</div>
                <h4 className="timeline-title">C++</h4>
                <p className="timeline-text">
                  <a href="https://simpli.app.link/iU6nVhxiO" target="_blank" rel="noopener noreferrer" className="cert-link">View Certificate</a>
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2026</div>
                <h4 className="timeline-title">SQL</h4>
                <p className="timeline-text">
                  <a href="https://simpli.app.link/Z29Ush4hOZb" target="_blank" rel="noopener noreferrer" className="cert-link">View Certificate</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

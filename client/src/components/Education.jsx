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
                <div className="timeline-date">2021 - Present</div>
                <h4 className="timeline-title">Bachelor of Computer Applications (BCA)</h4>
                <p className="timeline-text">Focusing on practical software development, data structures, and modern web technologies.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2019 - 2021</div>
                <h4 className="timeline-title">Higher Secondary Education</h4>
                <p className="timeline-text">Completed with a strong foundation in Science and Mathematics.</p>
              </div>
            </div>
          </div>

          <div className="education-column">
            <h3 className="education-heading"><i className="fas fa-certificate"></i> Certifications</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2023</div>
                <h4 className="timeline-title">Full Stack Web Development</h4>
                <p className="timeline-text">Comprehensive bootcamp covering React, Node.js, Express, and MongoDB.</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2023</div>
                <h4 className="timeline-title">Advanced React Patterns</h4>
                <p className="timeline-text">Deep dive into custom hooks, state management, and performance optimization techniques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

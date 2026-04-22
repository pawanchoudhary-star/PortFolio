const services = [
  {
    icon: 'fas fa-palette',
    title: 'Creative Design',
    desc: 'Crafting visually stunning interfaces that captivate users',
  },
  {
    icon: 'fas fa-code',
    title: 'Clean Code',
    desc: 'Writing maintainable, scalable code following best practices',
  },
  {
    icon: 'fas fa-rocket',
    title: 'Fast Delivery',
    desc: 'Delivering high-quality projects on time, every time',
  },
  {
    icon: 'fas fa-users',
    title: 'Collaboration',
    desc: 'Working seamlessly with teams to achieve common goals',
  },
];

const About = () => {
  return (
    <section className="section" id="about">
      <div className="container text-center">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          I am a passionate Full Stack Developer and a quick learner. I have experience working with HTML, CSS, JavaScript, React.js, and Tailwind CSS. I create clean and user-friendly websites my skills by building real-world projects.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

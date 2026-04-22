import profilePhoto from '../assets/DSLR photo.jpg';
import heroBg from '../assets/hero_bg.png';

const Hero = () => {
  const scrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <header className="hero" id="home">
      <img src={heroBg} alt="3D Clean Background" className="hero-bg" />
      <div className="hero-container">
        <div className="hero-avatar">
          <img
            src={profilePhoto}
            alt="Pawan Choudhary"
          />
        </div>
        <h2 className="hero-greeting">
          Hi, I'm <span className="text-blue">Pawan Choudhary</span>
        </h2>
        <h1 className="hero-title">Full stack Developer</h1>
        <p className="hero-subtitle">
          I craft beautiful digital experiences that combine stunning design with powerful functionality. Let's
          build something amazing together.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary" onClick={(e) => scrollTo(e, 'contact')}>
            Get in Touch
          </a>
          <a href="#projects" className="btn btn-outline" onClick={(e) => scrollTo(e, 'projects')}>
            View Work
          </a>
        </div>
        <div className="hero-socials">
          <a href="https://github.com/pawanchoudhary-star" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/pawan-choudhary-864100341/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="mailto:pawanchoudhary882455@gmail.com"><i className="fas fa-envelope"></i></a>
        </div>
        <a href="#about" className="scroll-down" onClick={(e) => scrollTo(e, 'about')}>
          <i className="fas fa-arrow-down"></i>
        </a>
      </div>
    </header>
  );
};

export default Hero;

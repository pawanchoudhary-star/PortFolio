import { useState, useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!targetId) return;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
          Pawan Choudhary
        </a>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About</a></li>
          <li><a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')}>Projects</a></li>
          <li><a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')}>Skills</a></li>
          <li><a href="#education" onClick={(e) => handleLinkClick(e, 'education')}>Education</a></li>
          <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a></li>
          <li>
            <a href="#contact" className="btn btn-primary" onClick={(e) => handleLinkClick(e, 'contact')}>
              Hire Me
            </a>
          </li>
        </ul>
        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import healthImg from '../assets/health.png';
import sarkarImg from '../assets/sarkar.png';
import gameImg from '../assets/game.png';

const projects = [
  {
    image: healthImg,
    title: 'Health guru ai',
    desc: 'AI-powered personalized health assistant providing predictive medical insights and wellness guidance.',
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
  },
  {
    image: sarkarImg,
    title: 'Sarkar Setu Ai',
    desc: 'Intelligent e-governance portal bridging the gap between citizens and government services using AI.',
    tags: ['TypeScript', 'React', 'Firebase', 'Tailwind'],
  },
  {
    image: gameImg,
    title: 'Number Guessing Game',
    desc: 'A fun interactive mini-game where the system generates a random secret number and the user must guess it correctly.',
    tags: ['JavaScript', 'React', 'Logic', 'CSS3'],
  },
];

const Projects = () => {
  return (
    <section className="section bg-light" id="projects">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of my recent work showcasing various skills in design, development, and branding.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-img">
                <div
                  className="img-placeholder"
                  style={{
                    background: `center/cover url('${project.image}')`,
                  }}
                ></div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="tag" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

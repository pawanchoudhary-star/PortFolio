const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'HTML5', level: 100, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'JavaScript', level: 50, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind CSS', level: 30, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'React.js', level: 10, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js', level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
      { name: 'MongoDB', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'TypeScript', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git/GitHub', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'Responsive Design', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
      { name: 'Performance Optimization', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg' },
      { name: 'Team Collaboration', level: 92, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg' },
    ],
  },
];

const Skills = () => {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Skills &amp; Expertise</h2>
          <p className="section-subtitle">
            A diverse skill set honed through years of experience and continuous learning.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div className="skills-category" key={index}>
              <h3 className="skills-category-title text-blue">{category.title}</h3>
              {category.skills.map((skill, i) => (
                <div className="skill-item" key={i}>
                  <div className="skill-info">
                    <div className="skill-name-container">
                      {skill.icon && <img src={skill.icon} alt={skill.name} className="skill-icon-3d" />}
                      <span>{skill.name}</span>
                    </div>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

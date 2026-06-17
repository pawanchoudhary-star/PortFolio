import { useState, useRef, useEffect, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   3-D TILT HOOK  — tracks mouse, tilts card on hover
═══════════════════════════════════════════════════════════ */
function use3DTilt(strength = 13) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) *  strength;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -strength;
    el.style.transform  = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateY(-8px) scale(1.02)`;
    el.style.boxShadow  = `${-x * 2}px ${y * 1.5}px 40px rgba(37,99,235,0.22), 0 20px 40px rgba(0,0,0,0.1)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.boxShadow = '';
  }, []);

  return { ref, onMove, onLeave };
}

/* ═══════════════════════════════════════════════════════════
   SHARED — Mac-like window chrome bar
═══════════════════════════════════════════════════════════ */
const WinBar = ({ title, live = false }) => (
  <div className="pp-bar">
    <span className="pp-dots">
      <span className="pp-dot r" />
      <span className="pp-dot y" />
      <span className="pp-dot g" />
    </span>
    <span className="pp-bar-title">{title}</span>
    {live && <span className="pp-live-tag"><span className="pp-live-dot" />LIVE</span>}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   PREVIEW 1 — Health Guru AI  (live vitals dashboard)
═══════════════════════════════════════════════════════════ */
const HealthPreview = () => {
  const [hr,   setHr]   = useState(72);
  const [spo2, setSpo2] = useState(98);

  useEffect(() => {
    const t = setInterval(() => {
      setHr  (v => Math.min(95, Math.max(58, v + Math.floor(Math.random() * 7 - 3))));
      setSpo2(v => Math.min(99, Math.max(95, v + (Math.random() > .5 ? 1 : -1))));
    }, 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="proj-preview health-preview">
      <WinBar title="Health Dashboard" live />
      <div className="pp-body">
        {/* ECG line */}
        <div className="ecg-wrap">
          <svg viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <polyline className="ecg-poly"
              points="0,20 22,20 32,4 42,36 52,20 80,20 90,6 100,34 110,20 138,20 148,4 158,36 168,20 196,20 206,8 216,32 226,20 240,20"/>
          </svg>
        </div>
        {/* Metric cards */}
        <div className="health-metrics">
          <div className="hm-card">
            <div className="hm-icon">❤️</div>
            <div className="hm-val">{hr}</div>
            <div className="hm-label">BPM</div>
          </div>
          <div className="hm-card">
            <div className="hm-icon">💧</div>
            <div className="hm-val">{spo2}%</div>
            <div className="hm-label">SpO₂</div>
          </div>
          <div className="hm-card">
            <div className="hm-icon">🩺</div>
            <div className="hm-val">120/80</div>
            <div className="hm-label">BP mmHg</div>
          </div>
        </div>
        <div className="ai-insight-bar">
          <span>🤖</span>
          <span>AI: Vitals are within healthy range</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PREVIEW 2 — Sarkar Setu AI  (real-time gov portal data)
═══════════════════════════════════════════════════════════ */
const SarkarPreview = () => {
  const [step, setStep] = useState(0); // 0: Login, 1: Loading, 2: Results
  const [typed, setTyped] = useState('');
  const aadhar = 'XXXX-XXXX-1234';

  useEffect(() => {
    let t;
    if (step === 0) {
      let i = 0;
      t = setInterval(() => {
        if (i < aadhar.length) {
          setTyped(aadhar.slice(0, ++i));
        } else {
          clearInterval(t);
          setTimeout(() => setStep(1), 800);
        }
      }, 100);
    } else if (step === 1) {
      t = setTimeout(() => setStep(2), 1500);
    } else if (step === 2) {
      t = setTimeout(() => {
        setStep(0);
        setTyped('');
      }, 4000);
    }
    return () => { clearInterval(t); clearTimeout(t); };
  }, [step, aadhar]);

  return (
    <div className="proj-preview sarkar-preview" style={{ background: '#0f172a', color: '#f8fafc' }}>
      <WinBar title="Sarkar Setu Portal" live />
      <div className="pp-body" style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
        
        {step === 0 && (
          <div style={{ animation: 'sarkarFadeIn 0.3s' }}>
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <div style={{ fontSize: '20px' }}>🏛️</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#38bdf8', fontFamily: 'var(--ff-heading)' }}>Sarkar Setu</div>
              <div style={{ fontSize: '9px', color: '#94a3b8' }}>Citizen Login</div>
            </div>
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '10px' }}>
              <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Enter Aadhar Number</div>
              <div style={{ color: '#f8fafc', fontWeight: 'bold', letterSpacing: '1px' }}>{typed}<span className="blink-cur">|</span></div>
            </div>
            <div style={{ background: '#38bdf8', color: '#0f172a', textAlign: 'center', padding: '8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', marginTop: '12px', opacity: typed.length === aadhar.length ? 1 : 0.5, transition: 'opacity 0.3s' }}>
              Verify & Login
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'sarkarFadeIn 0.3s' }}>
            <div style={{ fontSize: '24px', animation: 'sarkarSpin 1s linear infinite' }}>⏳</div>
            <div style={{ fontSize: '10px', color: '#38bdf8', marginTop: '12px', fontWeight: 'bold' }}>Analyzing Profile...</div>
            <div style={{ fontSize: '8px', color: '#94a3b8', marginTop: '4px' }}>Finding eligible schemes</div>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'sarkarFadeIn 0.3s' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
               <div>
                 <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>Welcome, Ramesh</div>
                 <div style={{ fontSize: '8px', color: '#22c55e', fontWeight: 'bold', marginTop: '2px' }}>✓ KYC Verified</div>
               </div>
               <div style={{ fontSize: '20px' }}>👤</div>
             </div>
             <div style={{ fontSize: '8px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold', letterSpacing: '0.5px' }}>ELIGIBLE SCHEMES (2)</div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px' }}>
                 <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8' }}>PM Awas Yojana</div>
                 <div style={{ fontSize: '8px', color: '#cbd5e1', marginBottom: '8px' }}>Housing subsidy up to ₹2.67L</div>
                 <div style={{ background: '#22c55e', color: '#fff', fontSize: '9px', textAlign: 'center', padding: '5px', borderRadius: '4px', fontWeight: 'bold' }}>Apply Now</div>
               </div>

               <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '8px' }}>
                 <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#38bdf8' }}>Ayushman Bharat</div>
                 <div style={{ fontSize: '8px', color: '#cbd5e1', marginBottom: '8px' }}>Health cover of ₹5L/family</div>
                 <div style={{ background: '#22c55e', color: '#fff', fontSize: '9px', textAlign: 'center', padding: '5px', borderRadius: '4px', fontWeight: 'bold' }}>Apply Now</div>
               </div>
             </div>
          </div>
        )}

      </div>
      <style>{`
        @keyframes sarkarFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sarkarSpin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PREVIEW 3 — AI Resume Builder  (ATS ring + typing effect)
═══════════════════════════════════════════════════════════ */
const ResumePreview = () => {
  const [text, setText] = useState('');
  const full = 'Build your perfect resume with AI.';
  
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= full.length) setText(full.slice(0, i++));
      else { i = 0; setText(''); }
    }, 120);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="proj-preview resume-preview" style={{ background: '#000000' }}>
      <WinBar title="ResumeAI Pro" />
      <div className="pp-body" style={{ alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
        <div style={{ fontSize: '9px', color: '#c084fc', border: '1px solid rgba(192,132,252,0.3)', padding: '3px 10px', borderRadius: '12px', background: 'rgba(192,132,252,0.05)' }}>
          <span style={{ display:'inline-block', width:'6px', height:'6px', background:'#c084fc', borderRadius:'50%', marginRight:'4px'}}></span>
          AI-Powered Career Coach is Live
        </div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', textAlign: 'center', lineHeight: '1.2', fontFamily: 'var(--ff-heading)', maxWidth: '90%' }}>
          {text}<span className="blink-cur">|</span>
        </div>
        <div style={{ fontSize: '8px', color: '#8b949e', textAlign: 'center', padding: '0 10px' }}>
          Generate ATS-friendly resumes, analyze your skills, and land your dream job faster.
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
          <div style={{ background: '#ffffff', color: '#000000', fontSize: '9px', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', boxShadow: '0 0 10px rgba(255,255,255,0.2)' }}>Create Resume</div>
          <div style={{ background: 'transparent', color: '#ffffff', border: '1px solid #333', fontSize: '9px', padding: '6px 12px', borderRadius: '20px' }}>View Templates</div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PREVIEW 5 — KrishiMitra AI  (Crop Analysis / Weather data)
═══════════════════════════════════════════════════════════ */
const KrishiPreview = () => {
  return (
    <div className="proj-preview krishi-preview" style={{ background: '#e8f5e9', color: '#1a1a1a' }}>
      <WinBar title="KrishiMitra AI" live />
      <div className="pp-body" style={{ background: '#e6f4ea', padding: '10px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '8px', color: '#188038', fontWeight: 'bold' }}>📍 Jaipur, Rajasthan</div>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#1a1a1a', fontFamily: 'var(--ff-heading)' }}>Good Afternoon!</div>
          </div>
          <div style={{ fontSize: '9px', background: '#ffffff', padding: '3px 8px', borderRadius: '15px', border: '1px solid #ceead6', color: '#188038', fontWeight: 'bold' }}>A/अ</div>
        </div>
        
        {/* Weather Card */}
        <div style={{ background: '#ffffff', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', boxShadow: '0 2px 8px rgba(24,128,56,0.08)', border: '1px solid #ceead6' }}>
          <div style={{ fontSize: '20px' }}>☁️</div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a1a1a' }}>31°C</div>
            <div style={{ fontSize: '9px', color: '#5f6368' }}>Broken Clouds</div>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {['Kya Ugau?', 'Crop Care', 'Mandi Price', 'Ask AI'].map((item, i) => (
            <div key={i} style={{ background: '#ffffff', borderRadius: '10px', padding: '10px 5px', textAlign: 'center', boxShadow: '0 2px 8px rgba(24,128,56,0.08)', border: '1px solid #ceead6' }}>
              <div style={{ fontSize: '16px', marginBottom: '4px', color: '#188038' }}>{['🌱','🍃','📈','💬'][i]}</div>
              <div style={{ fontSize: '10px', fontWeight: '600', color: '#1a1a1a' }}>{item}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PREVIEW 4 — Number Guessing Game  (animated gameplay)
═══════════════════════════════════════════════════════════ */
const GamePreview = () => {
  const seq = [
    { g: 42, hint: '📈 Too Low! Go Higher' },
    { g: 78, hint: '📉 Too High! Go Lower' },
    { g: 63, hint: '🔥 Getting Warmer!' },
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(v => (v + 1) % seq.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="proj-preview game-preview">
      <WinBar title="Number Guessing Game" />
      <div className="pp-body">
        <div className="game-mystery">
          <span className="game-q">?</span>
          <span className="game-q">?</span>
          <span className="game-q">?</span>
        </div>
        <div className="game-label">Guess the Secret Number</div>
        <div className="game-feed">
          {seq.slice(0, step + 1).reverse().map((item, i) => (
            <div className="game-feed-row" key={i} style={{ opacity: i === 0 ? 1 : 0.45 }}>
              <span className="game-feed-num">{item.g}</span>
              <span className="game-feed-hint">{item.hint}</span>
            </div>
          ))}
        </div>
        <div className="game-input-area">
          <input className="game-inp" type="number" placeholder="Enter your guess…" readOnly />
          <button className="game-go-btn">Guess!</button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PROJECT DATA
═══════════════════════════════════════════════════════════ */
const defaultProjects = [
  {
    Preview: HealthPreview,
    title: 'Health Guru AI',
    desc: 'AI-powered personalized health assistant providing predictive medical insights and wellness guidance.',
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    link: null,
  },
  {
    Preview: SarkarPreview,
    title: 'Sarkar Setu AI',
    desc: 'Intelligent e-governance portal bridging the gap between citizens and government services using AI.',
    tags: ['TypeScript', 'React', 'Firebase', 'Tailwind'],
    link: null,
    pitch: {
      problem: 'India mein schemes ki kami nahi hai — problem hai awareness aur accessibility ki. Logon ko pata hi nahi hota kaunsi scheme unke liye hai, eligibility samajh nahi aati, aur alag-alag portals par bhatakna padta hai. Result? Jo log deserve karte hain, wahi benefits miss kar dete hain.',
      whyMatters: 'Yeh sirf inconvenience nahi hai — yeh real impact create karta hai. Millions of people apne entitled benefits miss kar rahe hain. Time waste hota hai, frustration badhta hai, aur inequality aur deepen hoti hai.',
      solution: 'User apna profile enter karta hai → AI relevant schemes match karti hai → eligibility simple language mein explain hoti hai → aur direct apply link milta hai. Matlab discovery se action tak ka pura flow simplify ho jata hai.',
      keyFeatures: ['AI Personalized Recommendations', 'Simple Eligibility Checking', 'Chatbot Guidance', 'Multilingual Support', 'Smart Alerts for Deadlines'],
      techStack: 'Backend mein Node.js aur MongoDB use ho raha hai, frontend Flutter pe built hai. AI layer Grok-based hai with rule-based hybrid system. Real-time data ke liye live scraping engine use ho raha hai jo government portals se data sync karta hai.',
      differentiation: 'Market mein information platforms hain, lekin SarkarSetu AI ka focus hai intelligent matching. Yeh AI + rule-based hybrid approach use karta hai, profile-based personalization deta hai, real-time data maintain karta hai, aur chatbot context samajh kar answer deta hai — generic nahi.',
      impact: 'Iska impact wide hai — citizens, NGOs, aur CSC centers sab isse benefit le sakte hain. System scalable hai across India, aur future mein voice support, regional languages, aur assisted applications add kiye jayenge.',
    }
  },
  {
    Preview: ResumePreview,
    title: 'AI Resume Builder',
    desc: 'Build your perfect resume with AI. Generate ATS-friendly resumes, analyze your skills, and get a custom 30-day roadmap.',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind'],
    link: 'https://ai-resume-builder-3ms9.vercel.app',
  },
];

const moreProjects = [
  {
    Preview: KrishiPreview,
    title: 'KrishiMitra AI',
    desc: 'AI-powered agriculture assistant providing crop analysis, soil moisture tracking, and weather predictions to farmers.',
    tags: ['React', 'Node.js', 'Machine Learning', 'CSS3'],
    link: 'https://krishimitra-ai-m3oo.onrender.com',
  },
  {
    Preview: GamePreview,
    title: 'Number Guessing Game',
    desc: 'A fun interactive mini-game where the system generates a random secret number and the user must guess it correctly.',
    tags: ['JavaScript', 'React', 'Logic', 'CSS3'],
    link: null,
  },
];

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════ */
const ProjectCard = ({ project, onShowPitch }) => {
  const { Preview } = project;

  return (
    <div className="project-card">
      <div className="project-img">
        <Preview />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-live-btn" style={{ textDecoration: 'none' }}>
              <i className="fas fa-external-link-alt" /> Live Preview
            </a>
          )}
          {project.pitch && (
            <button className="project-pitch-btn" onClick={onShowPitch} style={{ background: '#3b82f6', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
              <i className="fas fa-info-circle" /> See Description
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PITCH MODAL
═══════════════════════════════════════════════════════════ */
const PitchModal = ({ pitch, onClose }) => {
  return (
    <div className="pitch-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="pitch-modal-content" style={{ background: '#fff', borderRadius: '12px', padding: '30px', maxWidth: '750px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#64748b' }}>&times;</button>
        <h2 style={{ marginBottom: '20px', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', fontSize: '24px' }}>SarkarSetu AI — Project Overview</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#ef4444', marginBottom: '6px', fontSize: '16px' }}>🚨 The Problem</h4>
          <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>{pitch.problem}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#f59e0b', marginBottom: '6px', fontSize: '16px' }}>💡 Why It Matters</h4>
          <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>{pitch.whyMatters}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#10b981', marginBottom: '6px', fontSize: '16px' }}>✅ The Solution</h4>
          <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>{pitch.solution}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#3b82f6', marginBottom: '6px', fontSize: '16px' }}>✨ Key Features</h4>
          <ul style={{ fontSize: '15px', color: '#334155', paddingLeft: '20px', lineHeight: '1.6' }}>
            {pitch.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#8b5cf6', marginBottom: '6px', fontSize: '16px' }}>🛠️ Tech Stack</h4>
          <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>{pitch.techStack}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#ec4899', marginBottom: '6px', fontSize: '16px' }}>🚀 Differentiation</h4>
          <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>{pitch.differentiation}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#06b6d4', marginBottom: '6px', fontSize: '16px' }}>🌍 Impact & Roadmap</h4>
          <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>{pitch.impact}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════════════ */
const Projects = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState(null);

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
          {defaultProjects.map((p, i) => <ProjectCard key={i} project={p} onShowPitch={() => p.pitch && setSelectedPitch(p.pitch)} />)}
        </div>

        <div className={`projects-more-section ${showMore ? 'projects-more-open' : ''}`}>
          <div className="projects-grid projects-grid-more">
            {moreProjects.map((p, i) => <ProjectCard key={i} project={p} onShowPitch={() => p.pitch && setSelectedPitch(p.pitch)} />)}
          </div>
        </div>

        <div className="projects-more-wrap">
          <button
            className={`btn-more-projects ${showMore ? 'btn-more-active' : ''}`}
            onClick={() => setShowMore(v => !v)}
          >
            <i className={`fas ${showMore ? 'fa-chevron-up' : 'fa-th-large'}`} />
            <span>{showMore ? 'Show Less' : 'More Projects'}</span>
          </button>
        </div>
      </div>
      {selectedPitch && <PitchModal pitch={selectedPitch} onClose={() => setSelectedPitch(null)} />}
    </section>
  );
};

export default Projects;

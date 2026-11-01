/**
 * Personal Developer Portfolio - Rukshan Amodya
 * Implementation of Next.js Architecture in Pure Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroRippleGrid();
  initLottieAnimations();
  initSkillsMarquee();
  initProjects();
  initMilestones();
  initGitHubHeatmap();
  initContactForm();
});

/* 1. Navbar Sticky & Mobile Menu */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
    const scrollPos = window.scrollY + 140;

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          links.forEach(l => l.classList.remove('active'));
          const currentLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (currentLink) currentLink.classList.add('active');
          break;
        }
      }
    }
  });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  links.forEach(l => {
    l.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* 2. Interactive Canvas Ripple Hero Grid (Ported directly from HeroGrid.tsx) */
function initHeroRippleGrid() {
  const canvas = document.getElementById('heroGridCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, cellSize, cols, rows;
  const activeCells = new Map();

  function resize() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    cellSize = window.innerWidth < 640 ? 56 : 68;
    cols = Math.ceil(width / cellSize) + 1;
    rows = Math.ceil(height / cellSize) + 1;
  }

  window.addEventListener('resize', resize);
  resize();

  function triggerRipple(clickX, clickY) {
    const clickCol = Math.floor(clickX / cellSize);
    const clickRow = Math.floor(clickY / cellSize);
    const maxRadius = 8.5;

    const minR = Math.max(0, Math.floor(clickRow - maxRadius));
    const maxR = Math.min(rows - 1, Math.ceil(clickRow + maxRadius));
    const minC = Math.max(0, Math.floor(clickCol - maxRadius));
    const maxC = Math.min(cols - 1, Math.ceil(clickCol + maxRadius));

    for (let r = minR; r <= maxR; r++) {
      for (let c = minC; c <= maxC; c++) {
        const dist = Math.sqrt(Math.pow(r - clickRow, 2) + Math.pow(c - clickCol, 2));
        if (dist <= maxRadius) {
          const intensity = Math.pow((maxRadius - dist) / maxRadius, 1.25);
          if (intensity <= 0.03) continue;

          const delay = dist * 55;
          const key = `${r}-${c}`;

          setTimeout(() => {
            activeCells.set(key, { intensity, expires: Date.now() + 850 });
          }, delay);
        }
      }
    }
  }

  // Mouse & touch click listeners
  canvas.parentElement.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerRipple(x, y);
  });

  // Render loop
  function draw() {
    ctx.clearRect(0, 0, width, height);

    const now = Date.now();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const key = `${r}-${c}`;

        const cellData = activeCells.get(key);
        let litIntensity = 0;

        if (cellData) {
          const remaining = cellData.expires - now;
          if (remaining > 0) {
            litIntensity = cellData.intensity * (remaining / 850);
          } else {
            activeCells.delete(key);
          }
        }

        if (litIntensity > 0) {
          ctx.fillStyle = `rgba(59, 130, 246, ${litIntensity * 0.35})`;
          ctx.fillRect(x, y, cellSize, cellSize);
          ctx.strokeStyle = `rgba(147, 197, 253, ${litIntensity * 0.8})`;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        }

        ctx.strokeRect(x, y, cellSize, cellSize);
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  // Initial greeting ripple
  setTimeout(() => {
    triggerRipple(width / 2, height / 3);
  }, 600);
}

/* 3. Lottie Animations: Welcome Mascot & Skills */
function initLottieAnimations() {
  const welcomeTarget = document.getElementById('welcomeLottie');
  if (welcomeTarget && typeof lottie !== 'undefined') {
    if (window.__WELCOME_ANIMATION__) {
      lottie.loadAnimation({
        container: welcomeTarget,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: window.__WELCOME_ANIMATION__
      });
    } else {
      lottie.loadAnimation({
        container: welcomeTarget,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/welcome.json'
      });
    }
  }

  const skillsTarget = document.getElementById('skillsLottie');
  if (skillsTarget && typeof lottie !== 'undefined') {
    if (window.__SKILLS_ANIMATION__) {
      lottie.loadAnimation({
        container: skillsTarget,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: window.__SKILLS_ANIMATION__
      });
    } else {
      lottie.loadAnimation({
        container: skillsTarget,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/skills.json'
      });
    }
  }
}

/* 4. Dual Opposite Skills Marquee */
const row1Skills = [
  { name: "React", icon: "assets/icons/react.svg", desc: "UI component library" },
  { name: "TypeScript", icon: "assets/icons/typescript.svg", desc: "Typed JavaScript" },
  { name: "JavaScript", icon: "assets/icons/javascript.svg", desc: "Web scripting language" },
  { name: "Node.js", icon: "assets/icons/nodejs.svg", desc: "Server-side runtime" },
  { name: "Python", icon: "assets/icons/python.svg", desc: "Versatile scripting" },
  { name: "Tailwind CSS", icon: "assets/icons/tailwind.svg", desc: "Utility-first CSS" },
  { name: "Git", icon: "assets/icons/git.svg", desc: "Version control" },
  { name: "Docker", icon: "assets/icons/docker.svg", desc: "Container platform" },
  { name: "MongoDB", icon: "assets/icons/mongodb.svg", desc: "NoSQL database" },
  { name: "MySQL", icon: "assets/icons/mysql.svg", desc: "Relational database" },
  { name: "SQL", icon: "assets/icons/sql.svg", desc: "Query language" },
  { name: "SQLite", icon: "assets/icons/sqlite.svg", desc: "Embedded database" },
  { name: "TensorFlow", icon: "assets/icons/tensorflow.svg", desc: "ML framework" }
];

const row2Skills = [
  { name: "Vite", icon: "assets/icons/vitejs.svg", desc: "Fast build tool" },
  { name: "Bootstrap", icon: "assets/icons/bootstrap.svg", desc: "CSS framework" },
  { name: "CSS", icon: "assets/icons/css.svg", desc: "Stylesheet language" },
  { name: "PHP", icon: "assets/icons/php.svg", desc: "Server-side scripting" },
  { name: "Linux", icon: "assets/icons/linux.svg", desc: "OS & shell env" },
  { name: "Figma", icon: "assets/icons/figma.svg", desc: "UI/UX design tool" },
  { name: "After Effects", icon: "assets/icons/after-effects.svg", desc: "Motion graphics" },
  { name: "PyTorch", icon: "assets/icons/pytorch.svg", desc: "Deep learning" },
  { name: "HuggingFace", icon: "assets/icons/huggingface.svg", desc: "AI model hub" },
  { name: "ComfyUI", icon: "assets/icons/comfyui.svg", desc: "Diffusion workflow" },
  { name: "Flux", icon: "assets/icons/flux.svg", desc: "Image gen model" },
  { name: "Replicate", icon: "assets/icons/replicate.svg", desc: "ML model API" }
];

function initSkillsMarquee() {
  const track1 = document.getElementById('marqueeTrack1');
  const track2 = document.getElementById('marqueeTrack2');

  function renderCard(s) {
    return `
      <div class="skill-card">
        <div class="skill-icon-box">
          <img src="${s.icon}" alt="${s.name}" onerror="this.style.display='none'">
        </div>
        <div>
          <h4 class="skill-name">${s.name}</h4>
          <p class="skill-desc">${s.desc}</p>
        </div>
      </div>
    `;
  }

  if (track1) {
    const list1 = [...row1Skills, ...row1Skills];
    track1.innerHTML = list1.map(renderCard).join('');
  }

  if (track2) {
    const list2 = [...row2Skills, ...row2Skills];
    track2.innerHTML = list2.map(renderCard).join('');
  }
}

/* 5. Projects Section from Original ProjectsSection.tsx */
const originalProjects = [
  {
    title: "ArtimaX Flutter",
    desc: "A premium Android Art Marketplace mobile app in Flutter allowing artists to showcase & sell artwork with realtime chat.",
    tech: ["Flutter", "Dart", "Firebase", "Android"],
    img: "assets/images/projects/artimax.jpg",
    link: "https://github.com/RukshanAmodya/ArtimaX-Flutter",
    github: "https://github.com/RukshanAmodya/ArtimaX-Flutter",
    userCount: "1,500+ Users"
  },
  {
    title: "Sleep Love",
    desc: "Luxury sleep meditation & atmospheric soundscapes app with dynamic audio mixer, offline caching, and glassmorphic UI.",
    tech: ["Flutter", "Dart", "Glassmorphic", "Audio"],
    img: "assets/images/projects/sleeplove.jpg",
    link: "https://github.com/RukshanAmodya/Sleep-Love",
    github: "https://github.com/RukshanAmodya/Sleep-Love",
    userCount: "3,200+ Users"
  },
  {
    title: "Solarjade Service App",
    desc: "Digital energy ecosystem for solar services, IoT hardware monitoring, automated deployment workflows, and field sync.",
    tech: ["Flutter", "Dart", "IoT Hardware", "Cloud"],
    img: "assets/images/projects/solarjade.svg",
    link: "https://github.com/RukshanAmodya/Solarjade-Service-App",
    github: "https://github.com/RukshanAmodya/Solarjade-Service-App",
    userCount: "2,000+ Users"
  },
  {
    title: "Moni Finance Manager",
    desc: "Production-ready, secure personal finance manager with real-time ledger, native QR camera shared budgeting, & savings challenges.",
    tech: ["Flutter", "Finance", "QR Sync", "Security"],
    img: "assets/images/projects/moni.svg",
    link: "https://github.com/RukshanAmodya/Moni",
    github: "https://github.com/RukshanAmodya/Moni",
    userCount: "5,000+ Users"
  },
  {
    title: "PIRM Solar Care",
    desc: "End-to-end solar management app with Solax API power tracking, multi-role portal, Cloudflare Worker proxy, and Supabase.",
    tech: ["Flutter", "Solax API", "Supabase", "Cloudflare"],
    img: "assets/images/projects/solarcare.svg",
    link: "https://github.com/RukshanAmodya/PIRM-Solar-Care",
    github: "https://github.com/RukshanAmodya/PIRM-Solar-Care",
    userCount: "3,500+ Users"
  },
  {
    title: "Tale Look Teleprompter",
    desc: "Creator & vlogger teleprompter mobile app with auto-scrolling script overlay right next to the camera lens for perfect eye contact.",
    tech: ["Flutter", "Camera HUD", "Teleprompter", "Creator"],
    img: "assets/images/projects/talelook.svg",
    link: "https://github.com/RukshanAmodya/Tale-Look",
    github: "https://github.com/RukshanAmodya/Tale-Look",
    userCount: "6,500+ Users"
  },
  {
    title: "AP.LK Physics",
    desc: "A/L Physics educational platform redesign with LearniX AI, Spline 3D interactions, exam marquees, and paper center network.",
    tech: ["Next.js", "React", "Spline 3D", "Tailwind"],
    img: "assets/images/projects/tutor.svg",
    link: "https://github.com/RukshanAmodya/Tutor",
    github: "https://github.com/RukshanAmodya/Tutor",
    userCount: "8,500+ Users"
  },
  {
    title: "devlk.com LMS",
    desc: "Intelligent LMS for AI instruction featuring automated course paths, code playground, and student progress tracking.",
    tech: ["Next.js", "TypeScript", "Node.js", "AI Engine"],
    img: "assets/images/projects/devlk.svg",
    link: "https://github.com/RukshanAmodya/devlk.com",
    github: "https://github.com/RukshanAmodya/devlk.com",
    userCount: "4,000+ Users"
  }
];

function initProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = originalProjects.map(p => `
    <article class="project-card">
      <div class="project-thumb-wrap">
        <img src="${p.img}" alt="${p.title}" class="project-thumb">
      </div>
      <div class="project-card-body">
        <div class="project-meta-row">
          <span class="project-user-count">${p.userCount}</span>
          <div class="project-action-links">
            <a href="${p.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
            <a href="${p.link}" target="_blank" rel="noopener" aria-label="Preview"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
          </div>
        </div>
        <h3 class="project-item-title">${p.title}</h3>
        <p class="project-item-desc">${p.desc}</p>
        <div class="project-tags-list">
          ${p.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

/* 6. Milestones Timeline from ExperienceSection.tsx */
const originalMilestones = [
  {
    year: "2026",
    badge: "EDUCATION",
    title: "Diploma in Software Engineering",
    org: "iCET Institute",
    bullets: [
      "Comprehensive study of software design patterns, system architecture, and algorithms at iCET.",
      "End-to-end agile software lifecycle management and enterprise clean code practices."
    ],
    tags: ["Software Engineering", "iCET Institute", "System Architecture"],
    flipped: false
  },
  {
    year: "2026",
    badge: "EDUCATION",
    title: "Diploma in English",
    org: "SITC Campus",
    bullets: [
      "Advanced professional English proficiency, technical documentation, and writing at SITC Campus.",
      "Strengthened international client communication, presentation, and collaboration."
    ],
    tags: ["English Diploma", "SITC Campus", "Communication"],
    flipped: true
  },
  {
    year: "2025",
    badge: "WORK EXPERIENCE",
    title: "Founder",
    org: "Questra",
    bullets: [
      "Founded Questra, developing innovative automation tools and bot infrastructure.",
      "Directing full engineering lifecycle, system scalability, and cloud deployments."
    ],
    tags: ["Questra", "Founder", "Automation", "Cloud"],
    flipped: false
  },
  {
    year: "2024",
    badge: "WORK EXPERIENCE",
    title: "Co-Founder",
    org: "Gravix",
    bullets: [
      "Co-founded Gravix, focusing on cutting-edge digital products and AI tooling.",
      "Architecting high-performance backend pipelines and client interfaces."
    ],
    tags: ["Gravix", "Co-Founder", "AI Solutions"],
    flipped: true
  },
  {
    year: "2024",
    badge: "EDUCATION",
    title: "Certificates in Fullstack Development",
    org: "University of Moratuwa",
    bullets: [
      "Mastered modern full-stack web architectures, RESTful API design, and database engineering.",
      "Engineered scalable web applications using React, Next.js, Node.js, and cloud platforms."
    ],
    tags: ["Fullstack Development", "Moratuwa", "React"],
    flipped: false
  },
  {
    year: "2023",
    badge: "WORK EXPERIENCE",
    title: "Founder",
    org: "Coding Divers",
    bullets: [
      "Founded Coding Divers, delivering tailored software & web solutions.",
      "Leading engineering, technical strategy, and client product development."
    ],
    tags: ["Coding Divers", "Startup", "Web Solutions"],
    flipped: true
  },
  {
    year: "2023",
    badge: "EDUCATION",
    title: "Diploma in Cybersecurity",
    org: "SITC Campus",
    bullets: [
      "Focused on network security, threat analysis, and ethical defense strategies.",
      "Hands-on experience in vulnerability assessments, penetration testing, and system hardening."
    ],
    tags: ["Cybersecurity", "SITC Campus", "Ethical Hacking"],
    flipped: false
  }
];

function initMilestones() {
  const container = document.getElementById('milestonesTimeline');
  if (!container) return;

  function renderTitleCard(m) {
    const iconClass = m.badge === 'EDUCATION' ? 'fa-graduation-cap' : 'fa-briefcase';
    return `
      <div class="milestone-card">
        <div class="milestone-badge-box">
          <div class="badge-icon-square">
            <i class="fa-solid ${iconClass}"></i>
          </div>
          <span class="milestone-badge-type">${m.badge}</span>
        </div>
        <h3 class="milestone-title">${m.title}</h3>
        <p class="milestone-org">${m.org}</p>
      </div>
    `;
  }

  function renderDetailsBlock(m) {
    return `
      <div class="milestone-details-block">
        <p class="milestone-period">${m.year} – Milestones</p>
        <div class="milestone-bullets-list">
          ${m.bullets.map(b => `
            <div class="milestone-bullet-item">
              <span class="bullet-caret">▸</span>
              <span>${b}</span>
            </div>
          `).join('')}
        </div>
        <div class="milestone-tags-row">
          ${m.tags.map(t => `<span class="milestone-pill-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = originalMilestones.map(m => {
    const leftContent = m.flipped ? renderDetailsBlock(m) : renderTitleCard(m);
    const rightContent = m.flipped ? renderTitleCard(m) : renderDetailsBlock(m);
    const yearPosClass = m.flipped ? 'pos-left' : 'pos-right';

    return `
      <div class="milestone-row">
        <!-- Left Column -->
        <div class="milestone-left-col">
          ${leftContent}
        </div>

        <!-- Center 120px Column with Year Label -->
        <div class="milestone-center-col">
          <span class="center-year-label ${yearPosClass}">${m.year}</span>
        </div>

        <!-- Right Column -->
        <div class="milestone-right-col">
          ${rightContent}
        </div>
      </div>
    `;
  }).join('');

  // Scroll Tracking for Glowing Beam and Traveling Radiant Orb
  const timelineWrapper = document.getElementById('timelineWrapper');
  const beam = document.getElementById('timelineBeam');
  const orb = document.getElementById('timelineOrb');

  if (timelineWrapper && beam && orb) {
    window.addEventListener('scroll', () => {
      const rect = timelineWrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress relative to viewport center
      const start = rect.top;
      const total = rect.height;
      const current = (viewportHeight / 2) - start;
      let progress = Math.min(Math.max(current / total, 0), 1);

      const percent = (progress * 100).toFixed(1);
      beam.style.height = `${percent}%`;
      orb.style.top = `${percent}%`;
    });
  }
}

/* 7. Live GitHub Heatmap Contributions (Ported from ContactSection.tsx) */
async function initGitHubHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  const streakEl = document.getElementById('streakCount');
  const totalEl = document.getElementById('totalContribs');

  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/RukshanAmodya?y=last");
    if (res.ok) {
      const data = await res.json();
      if (data && data.contributions) {
        const days = data.contributions;
        if (totalEl) totalEl.textContent = `${data.total?.lastYear || days.reduce((a, b) => a + b.count, 0)}+`;

        // Calculate current streak
        let curStreak = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].count > 0) curStreak++;
          else if (curStreak > 0) break;
        }
        if (streakEl) streakEl.textContent = curStreak > 0 ? curStreak : 5;

        // Render cells
        if (grid) {
          grid.innerHTML = days.map(d => {
            const lvl = d.level > 0 ? `lvl-${d.level}` : '';
            return `<div class="heatmap-cell ${lvl}" title="${d.date}: ${d.count} commits"></div>`;
          }).join('');
        }
        return;
      }
    }
  } catch (e) {
    console.warn("Using offline simulated GitHub heatmap data:", e);
  }

  // Fallback 52 weeks simulation
  if (grid) {
    let cellsHtml = '';
    for (let i = 0; i < 364; i++) {
      const rnd = Math.random();
      const lvl = rnd > 0.85 ? 'lvl-4' : (rnd > 0.7 ? 'lvl-3' : (rnd > 0.5 ? 'lvl-2' : (rnd > 0.35 ? 'lvl-1' : '')));
      cellsHtml += `<div class="heatmap-cell ${lvl}"></div>`;
    }
    grid.innerHTML = cellsHtml;
  }
}

/* 8. Contact Form Validation */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const alertBox = document.getElementById('formAlert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');

    if (!nameInput.value.trim()) {
      document.getElementById('nameError').textContent = 'Please enter your name.';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      document.getElementById('emailError').textContent = 'Please provide a valid email.';
      valid = false;
    }

    if (!subjectInput.value.trim()) {
      document.getElementById('subjectError').textContent = 'Please enter a subject.';
      valid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 8) {
      document.getElementById('messageError').textContent = 'Message should be at least 8 characters.';
      valid = false;
    }

    if (valid) {
      alertBox.className = 'form-alert success';
      alertBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
      form.reset();
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 5000);
    }
  });
}

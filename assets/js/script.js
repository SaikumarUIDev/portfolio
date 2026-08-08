document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile sidebar toggle ---------- */
  const sidebar = document.getElementById('sidebar');

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'nav-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle navigation');
  toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    icon.className = sidebar.classList.contains('open')
      ? 'fa-solid fa-xmark'
      : 'fa-solid fa-bars';
  });

  /* ---------- Smooth-scroll links + close mobile nav on click ---------- */
  document.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('open');
        toggleBtn.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  });

  /* ---------- Scroll-spy: highlight active section in sidebar ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.side-link');

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));

  /* ---------- Resume download buttons ---------- */
  const resumeButtons = [
    document.getElementById('downloadResumeSide'),
    document.getElementById('downloadResumeHero')
  ];

  resumeButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Replace 'resume.pdf' below with the actual path to your resume file.
      const resumeUrl = 'G.Saikumar.pdf';
      const a = document.createElement('a');
      a.href = resumeUrl;
      a.download = 'Sai_Kumar_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });

});

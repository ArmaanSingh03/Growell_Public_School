/**
 * ============================================================
 * GROWELL PUBLIC SCHOOL — system.js
 * Full-featured school website JavaScript
 * ============================================================
 */

/* =============================================
   1. LOADER
   ============================================= */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});


/* =============================================
   2. LANGUAGE TOGGLE (English ↔ Hindi)
   ============================================= */
let currentLang = 'en';
const whatsappNumber = '918295122061'; // default WhatsApp contact number

const langToggle = document.getElementById('langToggle');

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Toggle UI state
  if (lang === 'hi') {
    langToggle.classList.add('hindi');
    langToggle.querySelector('.lang-label.en').classList.remove('active');
    langToggle.querySelector('.lang-label.hi').classList.add('active');
  } else {
    langToggle.classList.remove('hindi');
    langToggle.querySelector('.lang-label.en').classList.add('active');
    langToggle.querySelector('.lang-label.hi').classList.remove('active');
  }

  // Update all elements with data-en / data-hi attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  // Update select option placeholders
  document.querySelectorAll('select option').forEach(opt => {
    const text = opt.getAttribute(`data-${lang}`);
    if (text) opt.textContent = text;
  });

  // Re-render dynamic sections that contain translatable text
  renderNotices();
  renderEvents(activeEventTab);
  renderGallery(activeFilter);
  renderTimetable(document.getElementById('ttClassSelect').value);
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'en' ? 'hi' : 'en');
});


/* =============================================
   3. STICKY NAVBAR + ACTIVE LINK
   ============================================= */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Back-to-top
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);

  // Active link highlight
  let currentId = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) currentId = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });
});

/* Back to top */
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* =============================================
   4. HAMBURGER MENU
   ============================================= */
const hamburger   = document.getElementById('hamburger');
const navLinksEl  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close on link click
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});


/* =============================================
   5. SCROLL REVEAL ANIMATIONS
   ============================================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.children).filter(c => c.classList.contains('reveal'))
          : [];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(idx * 80, 400)}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
observeReveal();


/* =============================================
   6. NOTICE BOARD DATA + RENDER
   ============================================= */
const noticesData = [
  {
    id: 1,
    title_en: 'Admissions Open for Session 2026–27',
    title_hi: 'सत्र 2026–27 के लिए प्रवेश खुले',
    body_en:  'Online admission forms for session 2026–27 are now available. Last date for submission: 31 March 2026.',
    body_hi:  'सत्र 2026–27 के लिए ऑनलाइन प्रवेश फॉर्म अब उपलब्ध हैं। जमा करने की अंतिम तिथि: 31 मार्च 2026।',
    date: 'XX Dec XXXX', type: 'urgent', icon: 'urgent'
  },
  {
    id: 2,
    title_en: 'Admissions Open for Session 2026–27',
    title_hi: 'सत्र 2026–27 के लिए प्रवेश खुले',
    body_en:  'Online admission forms for session 2026–27 are now available. Last date for submission: 31 March 2026.',
    body_hi:  'सत्र 2026–27 के लिए ऑनलाइन प्रवेश फॉर्म अब उपलब्ध हैं। जमा करने की अंतिम तिथि: 31 मार्च 2026।',
    date: 'XX Dec XXXX', type: 'urgent', icon: 'urgent'
  },
  {
    id: 3,
    title_en: 'Admissions Open for Session 2026–27',
    title_hi: 'सत्र 2026–27 के लिए प्रवेश खुले',
    body_en:  'Online admission forms for session 2026–27 are now available. Last date for submission: 31 March 2026.',
    body_hi:  'सत्र 2026–27 के लिए ऑनलाइन प्रवेश फॉर्म अब उपलब्ध हैं। जमा करने की अंतिम तिथि: 31 मार्च 2026।',
    date: 'XX Dec XXXX', type: 'urgent', icon: 'urgent'
  },
  {
    id: 4,
    title_en: 'Admissions Open for Session 2026–27',
    title_hi: 'सत्र 2026–27 के लिए प्रवेश खुले',
    body_en:  'Online admission forms for session 2026–27 are now available. Last date for submission: 31 March 2026.',
    body_hi:  'सत्र 2026–27 के लिए ऑनलाइन प्रवेश फॉर्म अब उपलब्ध हैं। जमा करने की अंतिम तिथि: 31 मार्च 2026।',
    date: 'XX Dec XXXX', type: 'urgent', icon: 'urgent'
  },
  
];

function renderNotices() {
  const noticesList = document.getElementById('noticesList');
  if (!noticesList) return;

  // Render timeline notices
  noticesList.innerHTML = noticesData.map(n => `
    <div class="notice-timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h4>${currentLang === 'hi' ? n.title_hi : n.title_en}</h4>
        <span class="notice-date">${n.date}</span>
      </div>
    </div>
  `).join('');
}

function iconForType(type) {
  const map = { urgent: 'fa-exclamation-circle', info: 'fa-info-circle', event: 'fa-calendar-star', result: 'fa-award', holiday: 'fa-umbrella-beach' };
  return map[type] || 'fa-bell';
}


/* =============================================
   7. EVENTS DATA + RENDER
   ============================================= */
const eventsData = {
  upcoming: [
    {
      title_en: 'Annual Sports Day',
      title_hi: 'वार्षिक खेल दिवस',
      date: 'XX January 20XX',
      desc_en: 'A full-day celebration of athletic talent featuring track & field, team sports, and prize distribution.',
      desc_hi: 'ट्रैक & फील्ड, टीम खेल और पुरस्कार वितरण के साथ एथलेटिक प्रतिभा का पूरे दिन का उत्सव।',
      color: 'linear-gradient(135deg,#1a3c6e,#2756a0)',
      icon: 'fa-running',
    },
    {
      title_en: 'Science Exhibition 20XX',
      title_hi: 'विज्ञान प्रदर्शनी 20XX',
      date: 'XX January 20XX',
      desc_en: 'Students showcase their innovative science projects to parents, peers, and industry experts.',
      desc_hi: 'छात्र माता-पिता, साथियों और उद्योग विशेषज्ञों को अपनी अभिनव विज्ञान परियोजनाएं प्रदर्शित करते हैं।',
      color: 'linear-gradient(135deg,#9c27b0,#ce93d8)',
      icon: 'fa-flask',
    },
    {
      title_en: 'Republic Day Celebration',
      title_hi: 'गणतंत्र दिवस समारोह',
      date: 'XX January 20XX',
      desc_en: 'Flag hoisting ceremony, cultural performances, and patriotic speeches by students.',
      desc_hi: 'ध्वजारोहण समारोह, सांस्कृतिक प्रस्तुतियां और छात्रों द्वारा देशभक्ति पूर्ण भाषण।',
      color: 'linear-gradient(135deg,#ff9800,#ff6d00)',
      icon: 'fa-flag',
    },
  ],
  past: [
    {
      title_en: 'Annual Prize Distribution',
      title_hi: 'वार्षिक पुरस्कार वितरण',
      date: 'XX November 20XX',
      desc_en: 'Meritorious students honoured with prizes, certificates, and special recognition by the Director.',
      desc_hi: 'मेधावी छात्रों को निदेशक द्वारा पुरस्कार, प्रमाण पत्र और विशेष मान्यता से सम्मानित किया गया।',
      color: 'linear-gradient(135deg,#e8a020,#f5b942)',
      icon: 'fa-trophy',
    },
    {
      title_en: 'Diwali Cultural Program',
      title_hi: 'दीवाली सांस्कृतिक कार्यक्रम',
      date: 'XX October 20XX',
      desc_en: 'A vibrant cultural evening with dance, music, drama, and lantern-making workshops.',
      desc_hi: 'नृत्य, संगीत, नाटक और लालटेन बनाने की कार्यशालाओं के साथ एक जीवंत सांस्कृतिक शाम।',
      color: 'linear-gradient(135deg,#f44336,#ef9a9a)',
      icon: 'fa-star',
    },
    {
      title_en: 'Inter-School Debate Competition',
      title_hi: 'अंतर-विद्यालय वाद-विवाद प्रतियोगिता',
      date: 'XX September 20XX',
      desc_en: 'Growell hosted 12 schools in the annual debate competition. Our team won 1st and 2nd prizes.',
      desc_hi: 'ग्रोवेल ने वार्षिक वाद-विवाद प्रतियोगिता में 12 स्कूलों की मेजबानी की। हमारी टीम ने 1st और 2nd पुरस्कार जीते।',
      color: 'linear-gradient(135deg,#4caf50,#81c784)',
      icon: 'fa-comments',
    },
  ],
};

let activeEventTab = 'upcoming';

function renderEvents(tab) {
  activeEventTab = tab;
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  const data = eventsData[tab];
  grid.innerHTML = data.map(ev => `
    <div class="event-card reveal visible">
      <div class="event-img" style="background:${ev.color}">
        <i class="fas ${ev.icon}"></i>
        <span>${ev.date}</span>
      </div>
      <div class="event-body">
        <div class="event-date-badge"><i class="fas fa-calendar-alt"></i>${ev.date}</div>
        <h4>${currentLang === 'hi' ? ev.title_hi : ev.title_en}</h4>
        <p>${currentLang === 'hi' ? ev.desc_hi : ev.desc_en}</p>
        <span class="event-type type-${tab}">${tab === 'upcoming' ? (currentLang === 'hi' ? 'आगामी' : 'Upcoming') : (currentLang === 'hi' ? 'बीता' : 'Past')}</span>
      </div>
    </div>
  `).join('');
}

// Tab buttons
document.querySelectorAll('.event-tab').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.event-tab').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderEvents(this.dataset.tab);
  });
});


/* =============================================
   8. GALLERY DATA + RENDER + LIGHTBOX
   ============================================= */
const galleryData = [
  { id: 1, category: 'campus',  icon: 'fa-school',      color: '#1a3c6e', label_en: 'Main Building',    label_hi: 'मुख्य भवन' },
  { id: 2, category: 'campus',  icon: 'fa-tree',        color: '#4caf50', label_en: 'School Garden',    label_hi: 'स्कूल उद्यान' },
  { id: 3, category: 'events',  icon: 'fa-music',       color: '#9c27b0', label_en: 'Annual Function',  label_hi: 'वार्षिक कार्यक्रम' },
  { id: 4, category: 'sports',  icon: 'fa-running',     color: '#e8a020', label_en: 'Sports Day',       label_hi: 'खेल दिवस' },
  { id: 5, category: 'labs',    icon: 'fa-microscope',  color: '#f44336', label_en: 'Science Lab',      label_hi: 'विज्ञान प्रयोगशाला' },
  { id: 6, category: 'labs',    icon: 'fa-desktop',     color: '#2196f3', label_en: 'Computer Lab',     label_hi: 'कंप्यूटर प्रयोगशाला' },
  { id: 7, category: 'sports',  icon: 'fa-futbol',      color: '#009688', label_en: 'Sports Ground',    label_hi: 'खेल मैदान' },
  { id: 9, category: 'campus',  icon: 'fa-book',        color: '#673ab7', label_en: 'Library',          label_hi: 'पुस्तकालय' },
  { id:10, category: 'events',  icon: 'fa-award',       color: '#e8a020', label_en: 'Prize Ceremony',   label_hi: 'पुरस्कार समारोह' },
];

// Gradient backgrounds for gallery items
const galleryBgs = [
  'linear-gradient(135deg,#1a3c6e,#2756a0)',
  'linear-gradient(135deg,#388e3c,#66bb6a)',
  'linear-gradient(135deg,#7b1fa2,#ba68c8)',
  'linear-gradient(135deg,#e65100,#ff8a65)',
  'linear-gradient(135deg,#c62828,#ef9a9a)',
  'linear-gradient(135deg,#1565c0,#64b5f6)',
  'linear-gradient(135deg,#006064,#4dd0e1)',
  'linear-gradient(135deg,#bf360c,#ffcc80)',
  'linear-gradient(135deg,#4527a0,#9575cd)',
  'linear-gradient(135deg,#e8a020,#f5b942)',
  'linear-gradient(135deg,#006064,#80deea)',
  'linear-gradient(135deg,#33691e,#aed581)',
];

let activeFilter = 'all';
let currentLbIndex = 0;
let filteredItems = [];

function renderGallery(filter) {
  activeFilter = filter;
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  filteredItems = filter === 'all' ? galleryData : galleryData.filter(g => g.category === filter);

  grid.innerHTML = filteredItems.map((g, idx) => `
    <div class="gallery-item" data-idx="${idx}" data-id="${g.id}">
      <div class="g-placeholder" style="background:${galleryBgs[g.id - 1]}">
        <i class="fas ${g.icon}"></i>
        <span>${currentLang === 'hi' ? g.label_hi : g.label_en}</span>
      </div>
      <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
    </div>
  `).join('');

  // Attach click events
  grid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.idx)));
  });
}

// Filter buttons
document.getElementById('galleryFilter').querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    renderGallery(this.dataset.filter);
  });
});

// Lightbox
function openLightbox(index) {
  currentLbIndex = index;
  updateLightboxContent();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const item = filteredItems[currentLbIndex];
  if (!item) return;
  document.getElementById('lbImgWrap').innerHTML = `
    <div class="g-placeholder" style="background:${galleryBgs[item.id - 1]}; min-height:340px; width:100%">
      <i class="fas ${item.icon}" style="font-size:5rem; opacity:.6"></i>
      <span style="font-size:1.1rem">${currentLang === 'hi' ? item.label_hi : item.label_en}</span>
    </div>
  `;
  document.getElementById('lbCaption').textContent =
    `${currentLang === 'hi' ? item.label_hi : item.label_en} — ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}`;
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
document.getElementById('lbPrev').addEventListener('click', () => {
  currentLbIndex = (currentLbIndex - 1 + filteredItems.length) % filteredItems.length;
  updateLightboxContent();
});
document.getElementById('lbNext').addEventListener('click', () => {
  currentLbIndex = (currentLbIndex + 1) % filteredItems.length;
  updateLightboxContent();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   { currentLbIndex = (currentLbIndex - 1 + filteredItems.length) % filteredItems.length; updateLightboxContent(); }
  if (e.key === 'ArrowRight')  { currentLbIndex = (currentLbIndex + 1) % filteredItems.length; updateLightboxContent(); }
});


/* =============================================
   9. TIMETABLE DATA + RENDER
   ============================================= */
const timetableData = {
  primary: {
    periods: ['8:00–8:45', '8:45–9:30', '9:30–10:15', 'Break', '10:30–11:15', '11:15–12:00', '12:00–12:45'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    grid: [
      ['XXXX',   'XXXX',    'XXXX',  'XXXX', 'XXXX',     'XXXX',    'XXXX'],
      ['XXXX',     'XXXX',  'XXXX',    'XXXX', 'XXXX', 'XXXX',      'XXXX'],
      ['XXXX',   'XXXX',    'XXXX',    'XXXX', 'XXXX', 'XXXX', 'XXXX'],
      ['XXXX',       'XXXX',  'XXXX',  'XXXX', 'XXXX',   'XXXX', 'XXXX'],
      ['XXXX',     'XXXX',      'XXXX', 'XXXX', 'XXXX', 'XXXX',  'XXXX'],
      ['XXXX',  'XXXX',    'XXXX',       'XXXX', 'XXXX',   'XXXX', 'XXXX'],
    ],
  },
  middle: {
    periods: ['8:00–8:45', '8:45–9:30', '9:30–10:15', 'Break', '10:30–11:15', '11:15–12:00', '12:00–12:45'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    grid: [
      ['XXXX',   'XXXX',    'XXXX',  'XXXX', 'XXXX',     'XXXX',    'XXXX'],
      ['XXXX',     'XXXX',  'XXXX',    'XXXX', 'XXXX', 'XXXX',      'XXXX'],
      ['XXXX',   'XXXX',    'XXXX',    'XXXX', 'XXXX', 'XXXX', 'XXXX'],
      ['XXXX',       'XXXX',  'XXXX',  'XXXX', 'XXXX',   'XXXX', 'XXXX'],
      ['XXXX',     'XXXX',      'XXXX', 'XXXX', 'XXXX', 'XXXX',  'XXXX'],
      ['XXXX',  'XXXX',    'XXXX',       'XXXX', 'XXXX',   'XXXX', 'XXXX'],
    ],
  },
  secondary: {
    periods: ['8:00–8:45', '8:45–9:30', '9:30–10:15', 'Break', '10:30–11:15', '11:15–12:00', '12:00–12:45'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    grid: [
      ['XXXX',   'XXXX',    'XXXX',  'XXXX', 'XXXX',     'XXXX',    'XXXX'],
      ['XXXX',     'XXXX',  'XXXX',    'XXXX', 'XXXX', 'XXXX',      'XXXX'],
      ['XXXX',   'XXXX',    'XXXX',    'XXXX', 'XXXX', 'XXXX', 'XXXX'],
      ['XXXX',       'XXXX',  'XXXX',  'XXXX', 'XXXX',   'XXXX', 'XXXX'],
      ['XXXX',     'XXXX',      'XXXX', 'XXXX', 'XXXX', 'XXXX',  'XXXX'],
      ['XXXX',  'XXXX',    'XXXX',       'XXXX', 'XXXX',   'XXXX', 'XXXX'],
    ],
  
 }
}

function renderTimetable(classKey) {
  const data = timetableData[classKey];
  const thead = document.getElementById('ttHead');
  const tbody = document.getElementById('ttBody');
  if (!thead || !tbody) return;

  const dayLabels = {
    en: ['Mon','Tue','Wed','Thu','Fri','Sat'],
    hi: ['सोम','मंगल','बुध','गुरु','शुक्र','शनि'],
  };

  thead.innerHTML = `<tr>
    <th>${currentLang === 'hi' ? 'दिन/पीरियड' : 'Day / Period'}</th>
    ${data.periods.map(p => `<th>${p}</th>`).join('')}
  </tr>`;

  tbody.innerHTML = data.days.map((day, i) => `
    <tr>
      <td>${dayLabels[currentLang][i]}</td>
      ${data.grid[i].map(sub => `<td>${sub}</td>`).join('')}
    </tr>
  `).join('');
}

document.getElementById('ttClassSelect').addEventListener('change', function () {
  renderTimetable(this.value);
});


/* =============================================
   10. FORM VALIDATION — ADMISSIONS
   ============================================= */
document.getElementById('admissionForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateAdmissionForm()) {
    const formData = {
      studentName: document.getElementById('studentName').value.trim(),
      dob: document.getElementById('dob').value,
      classApply: document.getElementById('classApply').value,
      gender: document.getElementById('gender').value,
      parentName: document.getElementById('parentName').value.trim(),
      mobile: document.getElementById('mobile').value.trim(),
      email: document.getElementById('admEmail').value.trim(),
      prevSchool: document.getElementById('prevSchool').value.trim(),
    };
    openAdmissionWhatsApp(formData);
    this.style.display = 'none';
    document.getElementById('admSuccess').classList.remove('hidden');
    // Update language on success message
    applyLanguage(currentLang);
  }
});

function validateAdmissionForm() {
  let valid = true;

  const fields = [
    { id: 'studentName', errId: 'nameErr',   pattern: /\S{2,}/,          msgEn: 'Please enter student name.',      msgHi: 'कृपया छात्र का नाम दर्ज करें।' },
    { id: 'dob',         errId: 'dobErr',    pattern: /\d{4}-\d{2}-\d{2}/,msgEn: 'Please select date of birth.',   msgHi: 'कृपया जन्म तिथि चुनें।' },
    { id: 'classApply',  errId: 'classErr',  pattern: /\S+/,             msgEn: 'Please select a class.',          msgHi: 'कृपया कक्षा चुनें।' },
    { id: 'gender',      errId: 'genderErr', pattern: /\S+/,             msgEn: 'Please select gender.',           msgHi: 'कृपया लिंग चुनें।' },
    { id: 'parentName',  errId: 'parentErr', pattern: /\S{2,}/,          msgEn: 'Please enter parent name.',       msgHi: 'कृपया माता-पिता का नाम दर्ज करें।' },
    { id: 'mobile',      errId: 'mobileErr', pattern: /^[6-9]\d{9}$/,    msgEn: 'Enter valid 10-digit mobile.',    msgHi: 'वैध 10 अंकों का मोबाइल दर्ज करें।' },
  ];

  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!f.pattern.test(el.value.trim())) {
      el.classList.add('error');
      err.textContent = currentLang === 'hi' ? f.msgHi : f.msgEn;
      valid = false;
    } else {
      el.classList.remove('error');
      err.textContent = '';
    }
  });

  // Email (optional but if filled must be valid)
  const emailEl  = document.getElementById('admEmail');
  const emailErr = document.getElementById('emailErr');
  if (emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
    emailEl.classList.add('error');
    emailErr.textContent = currentLang === 'hi' ? 'वैध ईमेल दर्ज करें।' : 'Enter a valid email.';
    valid = false;
  } else {
    emailEl.classList.remove('error');
    emailErr.textContent = '';
  }

  return valid;
}


/* =============================================
   11. FORM VALIDATION — CONTACT
   ============================================= */
function sendToWhatsApp(text) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function openWhatsAppContact(formData) {
  const subject = formData.subject || (currentLang === 'hi' ? 'संपर्क अनुरोध' : 'Contact Request');
  const template = currentLang === 'hi'
    ? `नमस्ते Growell पब्लिक स्कूल,

मैं ${formData.name} हूँ।
मोबाइल: ${formData.mobile}
ईमेल: ${formData.email}
विषय: ${subject}

संदेश:
${formData.message}`
    : `Hello Growell Public School,

My name is ${formData.name}.
Mobile: ${formData.mobile}
Email: ${formData.email}
Subject: ${subject}

Message:
${formData.message}`;
  sendToWhatsApp(template);
}

function openAdmissionWhatsApp(formData) {
  const template = currentLang === 'hi'
    ? `नमस्ते Growell पब्लिक स्कूल,

मैं एक प्रवेश जांच सबमिट करना चाहता/चाहती हूँ।
छात्र का नाम: ${formData.studentName}
जन्म तिथि: ${formData.dob}
कक्षा: ${formData.classApply}
लिंग: ${formData.gender}
माता/पिता/अभिभावक का नाम: ${formData.parentName}
मोबाइल: ${formData.mobile}
${formData.email ? `ईमेल: ${formData.email}\n` : ''}${formData.prevSchool ? `पिछला स्कूल: ${formData.prevSchool}\n` : ''}`
    : `Hello Growell Public School,

I would like to submit an admission enquiry.
Student Name: ${formData.studentName}
Date of Birth: ${formData.dob}
Class Applying For: ${formData.classApply}
Gender: ${formData.gender}
Parent/Guardian Name: ${formData.parentName}
Mobile: ${formData.mobile}
${formData.email ? `Email: ${formData.email}\n` : ''}${formData.prevSchool ? `Previous School: ${formData.prevSchool}\n` : ''}`;
  sendToWhatsApp(template);
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateContactForm()) {
    const formData = {
      name: document.getElementById('ctName').value.trim(),
      mobile: document.getElementById('ctMobile').value.trim(),
      email: document.getElementById('ctEmail').value.trim(),
      subject: document.getElementById('ctSubject').value.trim(),
      message: document.getElementById('ctMessage').value.trim(),
    };
    openWhatsAppContact(formData);
    this.style.display = 'none';
    document.getElementById('ctSuccess').classList.remove('hidden');
    applyLanguage(currentLang);
  }
});

function validateContactForm() {
  let valid = true;

  const fields = [
    { id: 'ctName',    errId: 'ctNameErr',   pattern: /\S{2,}/,              msgEn: 'Please enter your name.',      msgHi: 'कृपया अपना नाम दर्ज करें।' },
    { id: 'ctMobile',  errId: 'ctMobileErr', pattern: /^[6-9]\d{9}$/,        msgEn: 'Enter valid 10-digit mobile.', msgHi: 'वैध 10 अंकों का मोबाइल दर्ज करें।' },
    { id: 'ctEmail',   errId: 'ctEmailErr',  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msgEn: 'Enter a valid email.', msgHi: 'वैध ईमेल दर्ज करें।' },
    { id: 'ctMessage', errId: 'ctMsgErr',    pattern: /\S{10,}/,             msgEn: 'Please write a message (min 10 chars).', msgHi: 'कृपया संदेश लिखें (न्यूनतम 10 अक्षर)।' },
  ];

  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!f.pattern.test(el.value.trim())) {
      el.classList.add('error');
      err.textContent = currentLang === 'hi' ? f.msgHi : f.msgEn;
      valid = false;
    } else {
      el.classList.remove('error');
      err.textContent = '';
    }
  });

  return valid;
}


/* =============================================
   12. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});


/* =============================================
   13. HERO STAT COUNTER ANIMATION
   ============================================= */
function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 20);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const raw   = el.textContent.replace(/\D/g, '');
        const suffix = el.textContent.replace(/[\d]/g, '');
        el.dataset.suffix = suffix;
        animateCounter(el, parseInt(raw));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);


/* =============================================
   15. INIT — render dynamic sections on load
   ============================================= */
(function init() {
  renderNotices();
  renderEvents('upcoming');
  renderGallery('all');
  renderTimetable('primary');
  // Re-observe any dynamically added reveal elements
  setTimeout(observeReveal, 200);
})();
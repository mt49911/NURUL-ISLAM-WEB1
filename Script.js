javascript
// ==================== GLOBAL DATA ====================
let posts = [];
let unreadCount = 0;
let currentLanguage = 'en';

// Translations
const translations = {
    en: {
        home: "Home",
        tafseer: "Tafseer",
        hadith: "Hadith Reminder",
        quran: "Quran Reminder",
        motivation: "Daily Motivation",
        calendar: "Islamic Calendar",
        ramadan: "Ramadan Countdown",
        about: "About",
        contact: "Contact",
        admin: "Admin Dashboard",
        ramadanGreeting: "🌙 Ramadan Kareem",
        heroSub: "Daily reminders & tafseer to brighten your Ramadan",
        tafseerCard: "Tafseer",
        hadithCard: "Hadith",
        quranCard: "Quran",
        motivationCard: "Motivation",
        islamicCalendar: "Islamic Calendar",
        latestPosts: "Latest Posts"
    },
    ar: {
        home: "الرئيسية",
        tafseer: "التفسير",
        hadith: "تذكير بالحديث",
        quran: "تذكير بالقرآن",
        motivation: "تحفيز يومي",
        calendar: "التقويم الإسلامي",
        ramadan: "عد تنازلي رمضان",
        about: "حول",
        contact: "اتصل",
        admin: "لوحة الإدارة",
        ramadanGreeting: "🌙 رمضان كريم",
        heroSub: "تذكير يومي وتفسير لإشراق رمضانك",
        tafseerCard: "التفسير",
        hadithCard: "الحديث",
        quranCard: "القرآن",
        motivationCard: "تحفيز",
        islamicCalendar: "التقويم الإسلامي",
        latestPosts: "آخر المنشورات"
    }
};

// ==================== INITIAL LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    setupEventListeners();
    applyLanguage('en');
    loadPage('home');
});

// ==================== SIMPLE ROUTER ====================
function loadPage(page) {
    const contentDiv = document.getElementById('content');
    switch (page) {
        case 'home':
            contentDiv.innerHTML = getHomePageHTML();
            // Initialize home components after DOM update
            setTimeout(() => {
                updateRamadanCountdown();
                displayHijriDate();
                displayPostsInHome();
            }, 0);
            break;
        case 'about':
            contentDiv.innerHTML = getAboutPageHTML();
            break;
        case 'contact':
            contentDiv.innerHTML = getContactPageHTML();
            break;
        case 'tafseer':
        case 'hadith':
        case 'quran':
        case 'motivation':
        case 'calendar':
        case 'ramadan':
            contentDiv.innerHTML = `<div style="text-align: center; padding: 50px 20px;"><h2>${page.charAt(0).toUpperCase() + page.slice(1)}</h2><p>Content will be added soon. Please visit the Home page for daily posts.</p></div>`;
            break;
        default:
            contentDiv.innerHTML = '<h2>Page not found</h2>';
    }
    document.getElementById('sideMenu').classList.remove('open');
}

// ==================== HOME PAGE HTML ====================
function getHomePageHTML() {
    return `
        <section class="hero">
            <h1 class="ramadan-greeting" data-key="ramadanGreeting">🌙 Ramadan Kareem</h1>
            <div class="countdown" id="ramadanCountdown"></div>
            <p class="hero-sub" data-key="heroSub">Daily reminders & tafseer to brighten your Ramadan</p>
        </section>

        <section class="cards">
            <div class="card" data-key="tafseerCard" onclick="loadPage('tafseer')">
                <i class="fas fa-book-open"></i>
                <h3>Tafseer</h3>
                <p>Understand the Quran deeply</p>
            </div>
            <div class="card" data-key="hadithCard" onclick="loadPage('hadith')">
                <i class="fas fa-hadith"></i>
                <h3>Hadith</h3>
                <p>Prophetic traditions</p>
            </div>
            <div class="card" data-key="quranCard" onclick="loadPage('quran')">
                <i class="fas fa-quran"></i>
                <h3>Quran</h3>
                <p>Verses & reminders</p>
            </div>
            <div class="card" data-key="motivationCard" onclick="loadPage('motivation')">
                <i class="fas fa-heart"></i>
                <h3>Motivation</h3>
                <p>Daily spiritual boost</p>
            </div>
        </section>

        <section class="calendar-widget">
            <h2><i class="fas fa-calendar-alt"></i> <span data-key="islamicCalendar">Islamic Calendar</span></h2>
            <div id="hijriDate"></div>
            <div id="gregorianDate"></div>
            <div id="nextEvent"></div>
        </section>

        <section class="posts-feed">
            <h2><i class="fas fa-newspaper"></i> <span data-key="latestPosts">Latest Posts</span></h2>
            <div id="postsContainer"></div>
        </section>
    `;
}

// ==================== ABOUT PAGE HTML ====================
function getAboutPageHTML() {
    return `
        <div class="about-section">
            <h1>About NURUL ISLAM</h1>
            <p>Welcome to NURUL ISLAM</p>
            <p>NURUL ISLAM is a global Islamic reminder and Tafseer platform dedicated to spreading authentic knowledge of the Qur’an and Sunnah to Muslims worldwide.</p>
            <p>This website was established to serve as a source of spiritual guidance, daily Islamic reminders, Qur’anic reflections (Tafseer), Hadith teachings, and motivational content — especially during the blessed month of Ramadan and beyond.</p>
            
            <div class="mission-box">
                <p><strong>Our mission is simple:</strong> To illuminate hearts with the light of the Qur’an and authentic Islamic knowledge.</p>
            </div>

            <h2>Our Purpose</h2>
            <p>NURUL ISLAM was created as an act of Sadaqatu Jariyah — a continuous charity — seeking the pleasure of Allah alone.</p>
            <p>The intention behind this platform is purely for the sake of Allah (Subhanahu wa Ta’ala), hoping that it becomes a source of ongoing reward in this life and after death.</p>
            <p>We pray that:</p>
            <ul>
                <li><i class="fas fa-check-circle"></i> Allah accepts this effort.</li>
                <li><i class="fas fa-check-circle"></i> Allah forgives our shortcomings.</li>
                <li><i class="fas fa-check-circle"></i> Allah grants Jannatul Firdaus to our beloved parents.</li>
                <li><i class="fas fa-check-circle"></i> Allah makes this platform beneficial for the entire Ummah. Ameen.</li>
            </ul>

            <h2>What We Offer</h2>
            <p>Through NURUL ISLAM, we provide:</p>
            <ul>
                <li><i class="fas fa-book-open"></i> 📖 Qur’an Tafseer (Audio, Text, and Video)</li>
                <li><i class="fas fa-hadith"></i> 📜 Authentic Hadith Reminders</li>
                <li><i class="fas fa-moon"></i> 🌙 Ramadan Special Reflections</li>
                <li><i class="fas fa-calendar-alt"></i> 🗓 Islamic Calendar & Important Dates</li>
                <li><i class="fas fa-heart"></i> 💬 Daily Islamic Motivation</li>
                <li><i class="fas fa-bell"></i> 🔔 Timely Notifications for New Posts</li>
                <li><i class="fas fa-globe"></i> 🌍 Content accessible to Muslims worldwide</li>
                <li><i class="fas fa-language"></i> 🌐 Language selection (English & Arabic)</li>
            </ul>
            <p>Our goal is to make Islamic knowledge accessible, structured, and spiritually uplifting.</p>

            <h2>Our Vision</h2>
            <p>We envision NURUL ISLAM becoming a trusted digital Islamic platform where Muslims can:</p>
            <ul>
                <li><i class="fas fa-star"></i> Strengthen their Iman</li>
                <li><i class="fas fa-star"></i> Reflect deeply on the Qur’an</li>
                <li><i class="fas fa-star"></i> Learn authentic teachings</li>
                <li><i class="fas fa-star"></i> Stay connected to beneficial reminders</li>
                <li><i class="fas fa-star"></i> Grow spiritually every single day</li>
            </ul>
            <p>This platform is continuously updated with new content to ensure fresh and relevant reminders.</p>

            <h2>About the Founder</h2>
            <div class="founder-card">
                <img src="logo.jpg" alt="Abdullahi Muhammad Tukur">
                <div>
                    <p><strong>NURUL ISLAM</strong> was created and developed by:</p>
                    <p><strong>Abdullahi Muhammad Tukur</strong></p>
                    <p>A student dedicated to Islamic learning and digital da’wah, striving to use modern technology to serve Islam responsibly.</p>
                    <p>This project was built with sincere intention, hoping it becomes a means of ongoing reward and benefit for the Ummah.</p>
                </div>
            </div>

            <h2>A Message to the Ummah</h2>
            <div class="dua-section">
                <p>We extend our sincere gratitude and prayers to Muslims all around the world.</p>
                <p>May Allah unite our hearts upon truth. May He strengthen our faith. May He grant relief to those in hardship. May He grant victory to the oppressed. May He admit us all into Jannah without reckoning.</p>
                <p><strong>Ameen.</strong></p>
            </div>

            <h2>Stay Connected</h2>
            <p>We encourage you to:</p>
            <ul>
                <li><i class="fas fa-check"></i> Visit daily for new reminders.</li>
                <li><i class="fas fa-check"></i> Reflect upon what you learn.</li>
                <li><i class="fas fa-check"></i> Share beneficial knowledge.</li>
                <li><i class="fas fa-check"></i> Make du’a for this project.</li>
            </ul>
            <p>May this platform be a light for us in this world and the next.</p>
        </div>
    `;
}// ==================== CONTACT PAGE HTML ====================
function getContactPageHTML() {
    return `
        <div class="contact-section">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Reach out via WhatsApp or email.</p>
            <div class="contact-cards">
                <div class="contact-card">
                    <i class="fab fa-whatsapp"></i>
                    <h3>WhatsApp</h3>
                    <p>+234 902 089 9102</p>
                    <a href="https://wa.me/2349020899102" target="_blank">Chat Now</a>
                </div>
                <div class="contact-card">
                    <i class="fas fa-envelope"></i>
                    <h3>Email</h3>
                    <p>emteeydigitalservice11@gmail.com</p>
                    <a href="mailto:emteeydigitalservice11@gmail.com">Send Email</a>
                </div>
            </div>
            <p>You can also use the AI assistant below for quick questions.</p>
        </div>
    `;
}

// ==================== POSTS & NOTIFICATIONS ====================
async function loadPosts() {
    try {
        const response = await fetch('posts.json?t=' + Date.now());
        posts = await response.json();
        checkNewPosts();
        if (document.getElementById('postsContainer')) {
            displayPostsInHome();
        }
    } catch (e) {
        console.log('No posts yet or error loading posts.json');
    }
}

function displayPostsInHome() {
    const container = document.getElementById('postsContainer');
    if (!container) return;
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 30px;">📭 No posts yet. Check back soon!</p>';
        return;
    }
    container.innerHTML = '';
    posts.slice().reverse().forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'post';
        let mediaHtml = '';
        if (post.type === 'photo' && post.url) {
            mediaHtml = `<img src="${post.url}" alt="post image" loading="lazy">`;
        } else if (post.type === 'video' && post.url) {
            mediaHtml = `<video controls><source src="${post.url}" type="video/mp4"></video>`;
        } else if (post.type === 'audio' && post.url) {
            mediaHtml = `<audio controls><source src="${post.url}" type="audio/mpeg"></audio>`;
        }
        const date = new Date(post.date).toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        postEl.innerHTML = `
            <h3>${escapeHtml(post.title)}</h3>
            <div class="post-meta"><i class="far fa-calendar-alt"></i> ${date}</div>
            <p>${escapeHtml(post.content).replace(/\n/g, '<br>')}</p>
            ${mediaHtml}
        `;
        container.appendChild(postEl);
    });
}

// Simple escape to prevent XSS
function escapeHtml(unsafe) {
    return unsafe.replace(/[&<>"]/g, function(m) {
        if(m === '&') return '&amp;';
        if(m === '<') return '&lt;';
        if(m === '>') return '&gt;';
        if(m === '"') return '&quot;';
        return m;
    });
}

function checkNewPosts() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().toISOString();
    if (!lastVisit) {
        localStorage.setItem('lastVisit', now);
        return;
    }
    const newPosts = posts.filter(post => new Date(post.date) > new Date(lastVisit));
    unreadCount = newPosts.length;
    const badge = document.getElementById('notificationBadge');
    if (badge) badge.innerText = unreadCount;
}

// Mark as read when bell clicked
document.getElementById('notificationBell').addEventListener('click', () => {
    localStorage.setItem('lastVisit', new Date().toISOString());
    document.getElementById('notificationBadge').innerText = '0';
});

// ==================== RAMADAN COUNTDOWN ====================
function updateRamadanCountdown() {
    const countdownEl = document.getElementById('ramadanCountdown');
    if (!countdownEl) return;

    // Approximate next Ramadan (you can adjust based on actual sighting)
    const now = new Date();
    let year = now.getFullYear();
    // Ramadan 1 usually around March/April; we set a fixed date for demo
    // For production, use an API or adjust yearly.
    let ramadanStart = new Date(year, 2, 1); // March 1
    if (now > ramadanStart) {
        ramadanStart = new Date(year + 1, 2, 1);
    }
    const diff = ramadanStart - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (86400000)) / (3600000));
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    setTimeout(updateRamadanCountdown, 1000);
}
// ==================== HIJRI CALENDAR ====================
function displayHijriDate() {
    const hijriEl = document.getElementById('hijriDate');
    const gregorianEl = document.getElementById('gregorianDate');
    const nextEventEl = document.getElementById('nextEvent');
    if (!hijriEl || !gregorianEl || !nextEventEl) return;

    const today = new Date();
    gregorianEl.innerText = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    fetch(`https://api.aladhan.com/v1/gToH?date=${formattedDate}`)
        .then(response => response.json())
        .then(data => {
            if (data.code === 200 && data.data) {
                const hijri = data.data.hijri;
                hijriEl.innerText = `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;

                const nextDay = new Date(today);
                nextDay.setDate(today.getDate() + 1);
                const nextDayFormatted = `${String(nextDay.getDate()).padStart(2, '0')}-${String(nextDay.getMonth() + 1).padStart(2, '0')}-${nextDay.getFullYear()}`;
                return fetch(`https://api.aladhan.com/v1/gToH?date=${nextDayFormatted}`);
            } else {
                throw new Error('Invalid API response');
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200 && data.data) {
                const hijri = data.data.hijri;
                nextEventEl.innerHTML = `Tomorrow: ${hijri.day} ${hijri.month.en}`;
            }
        })
        .catch(error => {
            console.error('Error fetching Hijri date:', error);
            hijriEl.innerText = 'Unable to load Hijri date';
            nextEventEl.innerHTML = '';
        });
}

// ==================== LANGUAGE SELECTOR ====================
document.getElementById('langSelect').addEventListener('change', function(e) {
    currentLanguage = e.target.value;
    applyLanguage(currentLanguage);
    document.body.className = currentLanguage === 'ar' ? 'ar' : '';
    // Re-display posts if on home page
    if (document.getElementById('postsContainer')) {
        displayPostsInHome();
    }
});

function applyLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
    document.querySelectorAll('.side-menu a span').forEach(span => {
        const key = span.parentElement.getAttribute('data-key');
        if (key && translations[lang][key]) {
            span.innerText = translations[lang][key];
        }
    });
}

// ==================== MENU TOGGLE & ROUTING ====================
document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('sideMenu').classList.toggle('open');
});

document.querySelectorAll('.side-menu a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        loadPage(page);
    });
});

// Make loadPage globally accessible for card clicks
window.loadPage = loadPage;

// ==================== AI ASSISTANT ====================
const aiModal = document.getElementById('aiModal');
const aiBtn = document.getElementById('aiBtn');
const closeModal = document.querySelector('.close');
const sendBtn = document.getElementById('sendChat');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

const islamicQA = {
    'salaam': 'Wa alaikum assalaam! How can I assist you with Islamic knowledge today?',
    'ramadan': 'Ramadan is the ninth month of the Islamic calendar, during which Muslims fast from dawn to sunset. It is a time of spiritual reflection, increased worship, and charity.',
    'zakat': 'Zakat is an obligatory charity – 2.5% of savings above a certain threshold – given to the poor and needy. It purifies wealth.',
    'hajj': 'Hajj is the pilgrimage to Mecca that every able Muslim must perform at least once in their lifetime.',
    'quran': 'The Quran is the holy book of Islam, revealed to Prophet Muhammad (peace be upon him) over 23 years.',
    'hadith': 'Hadith are the recorded sayings and actions of Prophet Muhammad (peace be upon him), serving as a guide for Muslims.',
    'default': 'I am here to answer questions about Islam, Quran, Hadith, and Ramadan. Please ask something specific.'
};

aiBtn.addEventListener('click', () => {
    aiModal.style.display = 'flex';
    chatMessages.innerHTML = '';
    addBotMessage('Assalamu alaikum! I am your Islamic assistant. How can I help you?');
});

closeModal.addEventListener('click', () => {
    aiModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === aiModal) {
        aiModal.style.display = 'none';
    }
});

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addUserMessage(msg);
    chatInput.value = '';

    const lowerMsg = msg.toLowerCase();
    let response = islamicQA.default;
    for (let key in islamicQA) {
        if (lowerMsg.includes(key)) {
            response = islamicQA[key];
            break;
        }
    }
    setTimeout(() => addBotMessage(response), 500);
}

function addUserMessage(text) {
    const msgDiv = document.createElement('p');
    msgDiv.className = 'user';
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    const msgDiv = document.createElement('p');
    msgDiv.className = 'bot';
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ==================== MISC ====================
function setupEventListeners() {
    // Additional global listeners if needed
}
```

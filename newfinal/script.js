

// Typewriter text configurations
const headings = {
    'typewriter': ['Situationship or Dating?', 'Find Your Soulmate', 'Love Compatible?', 'Ready for Marriage?'],
    'typewriter-genz': ['GenZ Dating Guide', 'Modern Love Stories', 'Digital Romance', 'Future of Dating'],
    'typewriter-compatibility': ['Perfect Match Analysis', 'Love Compatibility', 'Relationship Goals', 'Soul Connection'],
    'typewriter-marriage': ['Marriage Guidance', 'Build Forever Love', 'Strengthen Bonds', 'Growing Together'],
    'typewriter-contact': ['Book Your Session', 'Start Your Journey', 'Transform Your Love Life', 'Find The One']
};

// Typewriter effect function
function typeWriter(elementId, texts, index = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let textIndex = index % texts.length;
    let charIndex = 0;
    let currentText = texts[textIndex];

    element.innerHTML = '';
    
    function type() {
        if (charIndex < currentText.length) {
            element.innerHTML += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                erase();
            }, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            element.innerHTML = currentText.substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            currentText = texts[textIndex];
            setTimeout(() => {
                type();
            }, 500);
        }
    }

    type();
}

// Initialize typewriter effects
Object.keys(headings).forEach(id => {
    typeWriter(id, headings[id]);
});

// Section visibility handler
function handleSectionVisibility() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const contents = section.querySelectorAll('.section-content');
        contents.forEach(content => {
            if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
                content.classList.add('visible');
            } else {
                content.classList.remove('visible');
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Scroll handler
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black/50', 'nav-blur');
    } else {
        navbar.classList.remove('bg-black/50', 'nav-blur');
    }
    handleSectionVisibility();
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitButton.classList.add('bg-green-500');
            
            setTimeout(() => {
                this.reset();
                submitButton.innerHTML = 'Book Session Now';
                submitButton.classList.remove('bg-green-500');
            }, 2000);
        }, 1500);
    });
}

// Initialize visibility check
handleSectionVisibility();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        if (window.innerWidth < 768) {
            toggleMobileMenu();
        }
    });
});

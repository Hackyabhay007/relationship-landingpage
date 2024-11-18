// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Global Variables
let currentSection = 'section1';
let isInterestsOpen = false;
let currentStep = 1;

// Typewriter Effect
const typewriterTexts = [
    "Love is the Only Door",
    "Find Your Soulmate",
    "Transform Your Life",
    "Discover True Connection"
];

class TypeWriter {
    constructor(texts, element) {
        this.texts = texts;
        this.element = element;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        const speed = this.isDeleting ? 50 : 150;

        if (this.isDeleting) {
            this.currentCharIndex--;
        } else {
            this.currentCharIndex++;
        }

        this.element.textContent = currentText.substring(0, this.currentCharIndex);

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            setTimeout(() => this.isDeleting = true, 2000);
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), speed);
    }
}

// Initialize Typewriter
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        new TypeWriter(typewriterTexts, typewriterElement);
    }
});

// Section Navigation
function changeSection(sectionId) {
    if (currentSection === sectionId) return;
    
    const currentElement = document.getElementById(currentSection);
    const newSection = document.getElementById(sectionId);
    
    gsap.to(currentElement, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        onComplete: () => {
            currentElement.style.display = 'none';
            currentElement.classList.remove('active');
            
            newSection.style.display = 'block';
            gsap.fromTo(newSection,
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5,
                    onComplete: () => newSection.classList.add('active')
                }
            );
        }
    });
    
    currentSection = sectionId;
    if (isInterestsOpen) toggleInterests();
}

// Interests Menu
function toggleInterests() {
    const popup = document.querySelector('.interests-popup');
    const options = document.querySelectorAll('.interest-option');
    
    isInterestsOpen = !isInterestsOpen;
    
    if (isInterestsOpen) {
        popup.style.display = 'block';
        gsap.fromTo(popup,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3 }
        );
        
        options.forEach((option, index) => {
            gsap.fromTo(option,
                { opacity: 0, x: -20 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.3,
                    delay: index * 0.1 
                }
            );
        });
    } else {
        gsap.to(popup, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            onComplete: () => popup.style.display = 'none'
        });
    }
}

// Booking Form Functions
function openBookingForm() {
    const overlay = document.getElementById('bookingFormOverlay');
    const form = document.getElementById('bookingForm');
    
    overlay.style.display = 'block';
    form.style.display = 'block';
    
    gsap.from(form, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
}

function closeBookingForm() {
    const overlay = document.getElementById('bookingFormOverlay');
    const form = document.getElementById('bookingForm');
    
    gsap.to(form, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            overlay.style.display = 'none';
            form.style.display = 'none';
            resetForm();
        }
    });
}

function nextStep() {
    if (currentStep < 3) {
        const currentStepElement = document.querySelector(`.step[data-step="${currentStep}"]`);
        const nextStepElement = document.querySelector(`.step[data-step="${currentStep + 1}"]`);
        
        gsap.to(currentStepElement, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            onComplete: () => {
                currentStepElement.classList.remove('active');
                nextStepElement.classList.add('active');
                gsap.fromTo(nextStepElement,
                    { opacity: 0, x: 20 },
                    { opacity: 1, x: 0, duration: 0.3 }
                );
            }
        });
        
        currentStep++;
    }
}

function prevStep() {
    if (currentStep > 1) {
        const currentStepElement = document.querySelector(`.step[data-step="${currentStep}"]`);
        const prevStepElement = document.querySelector(`.step[data-step="${currentStep - 1}"]`);
        
        gsap.to(currentStepElement, {
            opacity: 0,
            x: 20,
            duration: 0.3,
            onComplete: () => {
                currentStepElement.classList.remove('active');
                prevStepElement.classList.add('active');
                gsap.fromTo(prevStepElement,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.3 }
                );
            }
        });
        
        currentStep--;
    }
}

function resetForm() {
    currentStep = 1;
    const form = document.getElementById('consultationForm');
    form.reset();
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.querySelector('.step[data-step="1"]').classList.add('active');
}

// Form Submission
document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('.submit-button');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate API call
    setTimeout(() => {
        this.innerHTML = `
            <div class="text-center">
                <i class="fas fa-check-circle fa-3x mb-3" style="color: var(--accent)"></i>
                <h4>Booking Successful!</h4>
                <p>We'll contact you shortly to confirm your session.</p>
                <button type="button" class="submit-button mt-3" onclick="closeBookingForm()">
                    Close <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }, 2000);
});

// Floating Elements Animation
function initFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach(element => {
        gsap.to(element, {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: "random(2, 4)",
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: "random(0, 2)"
        });
    });
}

// Initialize everything when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFloatingElements();
    AOS.refresh();
});

// Handle form steps navigation
document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', nextStep);
});

document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', prevStep);
});

// Handle overlay clicks
document.getElementById('bookingFormOverlay').addEventListener('click', closeBookingForm);

// Prevent form closing when clicking inside the form
document.getElementById('bookingForm').addEventListener('click', e => {
    e.stopPropagation();
});

// Handle window resize
window.addEventListener('resize', () => {
    AOS.refresh();
});

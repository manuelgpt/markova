// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    
    mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navWrapper.setAttribute('data-visible', !isExpanded);
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navWrapper.setAttribute('data-visible', 'false');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event for performance
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            updateActiveNavLink();
        }, 100);
    }, false);

    // Initialize active nav link on page load
    updateActiveNavLink();

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.75) {
                item.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', animateTimeline);
    window.addEventListener('load', animateTimeline);

    // Load timeline data
    const timelineData = [
        {
            year: "1942",
            title: "Japanese Occupation Begins",
            description: "The Imperial Japanese Army occupies the Philippines during World War II."
        },
        {
            year: "1943",
            title: "Establishment of Comfort Stations",
            description: "The Japanese military establishes so-called 'comfort stations' across occupied territories."
        },
        {
            year: "1945",
            title: "Liberation of the Philippines",
            description: "Allied forces liberate the Philippines from Japanese occupation."
        },
        {
            year: "1993",
            title: "First Public Testimonies",
            description: "Survivors begin coming forward with their stories of wartime sexual slavery."
        },
        {
            year: "2018",
            title: "Establishment of Markova Archives",
            description: "The archives are founded to preserve and document survivor testimonies."
        }
    

        {
        year: "2020",
        title: "Digital Archive Launch",
        description: "The complete collection becomes available online for researchers worldwide."
    },
    {
        year: "2023",
        title: "Educational Program",
        description: "School outreach program launched to teach younger generations."
    }
];
  
    const timelineContainer = document.querySelector('.timeline');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h4>${item.year}</h4>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
    });

    // Load exhibits data
    const exhibitsData = [
        {
            title: "Survivor Testimonies",
            description: "First-hand accounts from those who experienced the wartime atrocities.",
            image: "assets/images/exhibit1.jpg"
        },
        {
            title: "Historical Documents",
            description: "Official records and correspondence documenting the occupation period.",
            image: "assets/images/exhibit2.jpg"
        },
        {
            title: "Photographic Evidence",
            description: "Rare photographs from the wartime period showing daily life under occupation.",
            image: "assets/images/exhibit3.jpg"
        }
    ];
    
    const exhibitsContainer = document.querySelector('.exhibits-grid');
    const exhibitTemplate = document.getElementById('exhibit-template');
    
    exhibitsData.forEach(exhibit => {
        const exhibitCard = exhibitTemplate.content.cloneNode(true);
        exhibitCard.querySelector('.card-title').textContent = exhibit.title;
        exhibitCard.querySelector('.card-description').textContent = exhibit.description;
        exhibitCard.querySelector('img').src = exhibit.image;
        exhibitCard.querySelector('img').alt = exhibit.title;
        exhibitCard.querySelector('.card-link').href = `#${exhibit.title.toLowerCase().replace(/\s+/g, '-')}`;
        exhibitsContainer.appendChild(exhibitCard);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            try {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                const response = await fetch(contactForm.action || '/', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    contactForm.reset();
                    showToast('Message sent successfully!');
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showToast('Error sending message. Please try again.');
                console.error('Form submission error:', error);
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // Initialize animations for dynamically loaded content
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.timeline-item, .exhibit-card, .resource-card').forEach(el => {
        observer.observe(el);
    });
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    
    // Toggle hamburger animation
    mobileMenuButton.classList.toggle('open');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});
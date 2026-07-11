// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (!contactForm.checkValidity() === false) {
                e.stopPropagation();
            }

            // Check if form is valid
            if (name && email && subject && message) {
                // Show success message (in production, send to server)
                alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill out all fields correctly.');
            }

            contactForm.classList.add('was-validated');
        }, false);
    }

    // Add smooth scroll to anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar active link highlight
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);

    function updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (navLink) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom > 0) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Add animation on scroll for cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));

    // Modal functionality for project details
    const projectModals = document.querySelectorAll('[id^="project"][id$="Modal"]');
    projectModals.forEach((modal, index) => {
        const button = document.querySelector(`[data-bs-target="#${modal.id}"]`);
        if (button) {
            button.addEventListener('click', function() {
                showProjectDetails(index + 1);
            });
        }
    });

    // Carousel auto-play with better control
    const carousel = document.getElementById('bannerCarousel');
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 6000,
            wrap: true,
            keyboard: true,
            pause: 'hover'
        });

        // Pause carousel on hover
        carousel.addEventListener('mouseenter', function() {
            bsCarousel.pause();
        });

        // Resume carousel on mouse leave
        carousel.addEventListener('mouseleave', function() {
            bsCarousel.cycle();
        });

        // Handle carousel indicators click
        const indicators = document.querySelectorAll('[data-bs-slide-to]');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                bsCarousel.to(index);
            });
        });
    }

    // Add scroll-to-top button
    addScrollToTopButton();
});

// Show project details in modal
function showProjectDetails(projectNumber) {
    const projectData = {
        1: {
            title: 'Business Website',
            description: 'A fully responsive business website with modern design and SEO optimization. Features include responsive navigation, service sections, testimonials, and contact form.',
            technologies: 'HTML5, CSS3, Bootstrap 5, JavaScript',
            duration: '3 weeks',
            client: 'Local Business Client'
        },
        2: {
            title: 'E-Commerce Platform',
            description: 'Interactive shopping platform with product catalog and shopping cart functionality. Includes search, filtering, and user-friendly checkout process.',
            technologies: 'HTML5, JavaScript, Bootstrap 5',
            duration: '4 weeks',
            client: 'Online Store'
        },
        3: {
            title: 'Portfolio Website',
            description: 'Personal portfolio showcasing projects and professional information with contact form. Mobile-responsive design and smooth animations.',
            technologies: 'HTML5, CSS3, Bootstrap 5, JavaScript',
            duration: '2 weeks',
            client: 'Personal Project'
        },
        4: {
            title: 'Blog Platform',
            description: 'Content management system with article listing, categories, and search functionality. Clean interface for easy content management.',
            technologies: 'HTML5, CSS3, Bootstrap 5, JavaScript',
            duration: '3 weeks',
            client: 'Content Creator'
        },
        5: {
            title: 'Event Management Site',
            description: 'Event listing and registration website with calendar integration and ticket booking system.',
            technologies: 'HTML5, JavaScript, Bootstrap 5',
            duration: '4 weeks',
            client: 'Event Organization'
        },
        6: {
            title: 'Weather App',
            description: 'Interactive weather application with real-time data and detailed forecasts. Features include search, favorites, and detailed weather information.',
            technologies: 'HTML5, CSS3, JavaScript, Bootstrap 5, API Integration',
            duration: '2 weeks',
            client: 'Personal Project'
        }
    };

    const project = projectData[projectNumber];
    if (project) {
        const modalContent = `
            <div class="modal fade" id="project${projectNumber}Modal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${project.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <h6>Project Description</h6>
                            <p>${project.description}</p>
                            <h6>Technologies Used</h6>
                            <p>${project.technologies}</p>
                            <h6>Project Duration</h6>
                            <p>${project.duration}</p>
                            <h6>Client</h6>
                            <p>${project.client}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a href="#" class="btn btn-primary">View Project</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log(modalContent);
    }
}

// Scroll to top functionality
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scrollToTop';
    scrollButton.className = 'btn btn-primary btn-lg';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: none;
        z-index: 999;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        padding: 0;
        text-align: center;
        line-height: 50px;
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add fade-in-up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Console log for debugging
console.log('Portfolio website loaded successfully!');

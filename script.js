        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 1000,
            once: true
        });

        // Mobile Menu Toggle
        function toggleMobileMenu() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
        }

        // Show Section Function
        function showSection(sectionName) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show selected section
            document.getElementById(sectionName).classList.add('active');

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Download Syllabus Function
        function downloadSyllabus(course) {
            // In a real application, you would have actual PDF files
            alert(`Downloading ${course} syllabus... \n\nNote: In a real implementation, this would download the actual PDF file for ${course}.`);
            
            // Simulate download - in real app, you'd link to actual PDF files
            const syllabusLinks = {
                'grade11-science': 'syllabi/grade11-science-syllabus.pdf',
                'grade12-science': 'syllabi/grade12-science-syllabus.pdf',
                'management': 'syllabi/management-syllabus.pdf',
                'technical': 'syllabi/technical-syllabus.pdf',
                'law': 'syllabi/law-syllabus.pdf',
                'arts': 'syllabi/arts-syllabus.pdf'
            };
            
            // This would be the actual download implementation:
            // const link = document.createElement('a');
            // link.href = syllabusLinks[course];
            // link.download = `${course}-syllabus.pdf`;
            // link.click();
        }

        // Form Validation Functions
        function validateName(name) {
            return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validatePhone(phone) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            return phoneRegex.test(phone.replace(/\s/g, ''));
        }

        function validateDate(date) {
            const today = new Date();
            const inputDate = new Date(date);
            const minAge = new Date();
            minAge.setFullYear(today.getFullYear() - 5); // Minimum age 5 years
            const maxAge = new Date();
            maxAge.setFullYear(today.getFullYear() - 25); // Maximum age 25 years
            
            return inputDate <= minAge && inputDate >= maxAge;
        }

        function showError(fieldId, message) {
            const errorElement = document.getElementById(fieldId + 'Error');
            const inputElement = document.getElementById(fieldId);
            
            errorElement.textContent = message;
            inputElement.style.borderColor = '#e74c3c';
        }

        function clearError(fieldId) {
            const errorElement = document.getElementById(fieldId + 'Error');
            const inputElement = document.getElementById(fieldId);
            
            errorElement.textContent = '';
            inputElement.style.borderColor = '#e1e5e9';
        }

        // Admission Form Validation
        document.getElementById('admissionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const dob = document.getElementById('dob').value;
            const course = document.getElementById('course').value;
            const parentName = document.getElementById('parentName').value;
            const parentPhone = document.getElementById('parentPhone').value;
            const address = document.getElementById('address').value;

            // Clear previous errors
            ['fullName', 'email', 'phone', 'dob', 'course', 'parentName', 'parentPhone', 'address'].forEach(clearError);

            // Validate Full Name
            if (!validateName(fullName)) {
                showError('fullName', 'Please enter a valid full name (letters and spaces only, minimum 2 characters)');
                isValid = false;
            }

            // Validate Email
            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Phone
            if (!validatePhone(phone)) {
                showError('phone', 'Please enter a valid phone number (minimum 10 digits)');
                isValid = false;
            }

            // Validate Date of Birth
            if (!dob || !validateDate(dob)) {
                showError('dob', 'Please enter a valid date of birth (age must be between 5-25 years)');
                isValid = false;
            }

            // Validate Course Selection
            if (!course) {
                showError('course', 'Please select a preferred course');
                isValid = false;
            }

            // Validate Parent Name
            if (!validateName(parentName)) {
                showError('parentName', 'Please enter a valid parent/guardian name');
                isValid = false;
            }

            // Validate Parent Phone
            if (!validatePhone(parentPhone)) {
                showError('parentPhone', 'Please enter a valid parent/guardian phone number');
                isValid = false;
            }

            // Validate Address
            if (address.trim().length < 10) {
                showError('address', 'Please enter a complete address (minimum 10 characters)');
                isValid = false;
            }

            if (isValid) {
                // Create Google Form submission (simulated)
                const formData = {
                    fullName,
                    email,
                    phone,
                    dob,
                    course,
                    parentName,
                    parentPhone,
                    address,
                    message: document.getElementById('message').value,
                    timestamp: new Date().toISOString()
                };

                // In a real implementation, you would submit to Google Forms
                console.log('Admission Form Data:', formData);
                
                alert('Thank you for your application! We have received your submission and will contact you within 2-3 business days.');
                
                // Reset form
                this.reset();
            }
        });

        // Contact Form Validation (for FormSubmit)
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            let isValid = true;
            
            // Get form values
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('contactMessage').value;

            // Clear previous errors
            ['contactName', 'contactEmail', 'subject', 'contactMessage'].forEach(clearError);

            // Validate Name
            if (!validateName(name)) {
                showError('contactName', 'Please enter a valid name');
                isValid = false;
            }

            // Validate Email
            if (!validateEmail(email)) {
                showError('contactEmail', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Subject
            if (!subject) {
                showError('subject', 'Please select a subject');
                isValid = false;
            }

            // Validate Message
            if (message.trim().length < 10) {
                showError('contactMessage', 'Please enter a detailed message (minimum 10 characters)');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });

        // Smooth scrolling for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar background change on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            }
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Form input focus effects
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });

        // Add entrance animations to cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.team-card, .course-card, .mission, .vision');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        });


        document.getElementById("admissionForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("entry.1844791624", document.getElementById("fullName").value);
    formData.append("entry.1677256192", document.getElementById("email").value);
    formData.append("entry.454093046", document.getElementById("phone").value);
    formData.append("entry.2025742885", document.getElementById("dob").value);
    formData.append("entry.814852198", document.getElementById("course").value);
    formData.append("entry.1889241049", document.getElementById("previousSchool").value);
    formData.append("entry.980277811", document.getElementById("parentName").value);
    formData.append("entry.673875286", document.getElementById("parentPhone").value);
    formData.append("entry.1710862127", document.getElementById("address").value);
    formData.append("entry.1258421986", document.getElementById("message").value);

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSedlaePEM8TlL86AzNnp3cFQdDR1dkwqLFmqUOFXlSqvSbGdQ/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
    .then(() => {
      alert("✅ Application submitted successfully!");
      document.getElementById("admissionForm").reset();
    })
    .catch(() => {
      alert("❌ Failed to submit. Please try again.");
    });
  });
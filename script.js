document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Get the target section ID from the href (e.g., #about)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll into view with smooth behavior
                window.scrollTo({
                    top: targetSection.offsetTop - (document.querySelector('header').offsetHeight), // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
            
            // Close hamburger menu if open
            const navMenu = document.querySelector('.nav-menu'); 
            const hamburger = document.querySelector('.hamburger'); 
            if (navMenu && hamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Hamburger menu functionality for mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission

            formMessage.textContent = 'Mengirim pesan...';
            formMessage.className = 'form-message'; // Reset class

            const name = contactForm.elements.name.value;
            const email = contactForm.elements.email.value;
            const message = contactForm.elements.message.value;

            try {
                // Untuk proyek nyata, Anda akan mengirim ini ke backend server atau layanan seperti Formspree.
                // Contoh Formspree:
                // const response = await fetch('https://formspree.io/f/yourformid', { // Ganti yourformid
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/json'
                //     },
                //     body: JSON.stringify({ name, email, message })
                // });

                // if (response.ok) {
                //     formMessage.textContent = 'Pesan berhasil dikirim! Saya akan segera menghubungi Anda.';
                //     formMessage.classList.add('success');
                //     contactForm.reset();
                // } else {
                //     const data = await response.json();
                //     formMessage.textContent = data.errors ? data.errors.map(err => err.message).join(', ') : 'Gagal mengirim pesan. Silakan coba lagi.';
                //     formMessage.classList.add('error');
                // }

                // --- Simulasi Sukses ---
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulasi delay jaringan
                formMessage.textContent = 'Pesan berhasil dikirim! Saya akan segera menghubungi Anda.';
                formMessage.classList.add('success');
                contactForm.reset();
                // --- Akhir Simulasi Sukses ---

            } catch (error) {
                console.error('Form submission error:', error);
                formMessage.textContent = 'Terjadi kesalahan tak terduga. Silakan coba lagi nanti.';
                formMessage.classList.add('error');
            }
        });
    }

    // Typewriter effect for hero subtitle
    const typewriterTextElement = document.getElementById('typewriter-text');
    const phrases = [
        "Seorang Fullstack Developer yang Penuh Semangat.",
        "Mahasiswa Statistika & Sains Data di IPB.",
        "Siap Membangun Solusi Inovatif dengan Kode.",
        "Mencintai Data, Menguasai Web.",
        "AI-Assisted Coder, Problem Solver."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 70; // ms per character
    const deletingSpeed = 40; // ms per character
    const pauseBeforeDelete = 1500; // ms
    const pauseBeforeType = 500; // ms

    function typeWriter() {
        if (!typewriterTextElement) return;

        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentSpeed = pauseBeforeDelete;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentSpeed = pauseBeforeType;
        }

        // Pastikan elemen masih ada di DOM dan visibility-nya tidak none
        if (typewriterTextElement.parentNode && window.getComputedStyle(typewriterTextElement.parentNode.parentNode.parentNode).display !== 'none') {
            setTimeout(typeWriter, currentSpeed);
        } else {
            // Kalau section hero tidak terlihat, reset typewriter
            charIndex = 0;
            isDeleting = false;
            typewriterTextElement.textContent = ''; // Kosongkan teks
        }
    }

    // Start typewriter only if hero section is visible initially
    const heroSection = document.getElementById('hero');
    if (heroSection && window.getComputedStyle(heroSection).display !== 'none') {
        typeWriter();
    }


    // Scroll Reveal Effect
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        scrollRevealSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const sectionVisibleThreshold = 100;

            if (sectionTop < windowHeight - sectionVisibleThreshold && sectionBottom > sectionVisibleThreshold) {
                section.classList.add('active');
            } else {
                // Optional: remove 'active' class if you want elements to disappear when scrolled back up
                // section.classList.remove('active');
            }
        });
    };

    // Initial check on load
    revealOnScroll();

    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);


    // --- Active Navigation Highlighting (Scrollspy) ---
    const sections = document.querySelectorAll('section[id]'); // Ambil semua elemen section yang punya ID
    const navLinks = document.querySelectorAll('.nav-menu a'); // Ambil semua link navigasi

    const highlightNavLink = () => {
        let currentActiveSectionId = '';
        const scrollPosition = window.scrollY; // Posisi scroll saat ini
        const headerOffset = document.querySelector('header').offsetHeight; // Tinggi header

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset - 1; // Posisi atas section, disesuaikan dengan tinggi header + sedikit offset
            const sectionHeight = section.offsetHeight;

            // Cek apakah posisi scroll berada di dalam range section ini
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentActiveSectionId = section.id;
            }
        });

        // Hapus kelas 'active' dari semua link navigasi
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Tambahkan kelas 'active' ke link navigasi yang sesuai dengan section yang aktif
        if (currentActiveSectionId) {
            const activeLink = document.querySelector(`.nav-menu a[href="#${currentActiveSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else {
            // Jika tidak ada section yang aktif (misal di paling atas, di atas hero), aktifkan link hero
            document.querySelector('.nav-menu a[href="#hero"]').classList.add('active');
        }
    };

    // Panggil fungsi saat halaman dimuat dan setiap kali scroll
    highlightNavLink(); // Panggil pertama kali untuk inisialisasi
    window.addEventListener('scroll', highlightNavLink);
});
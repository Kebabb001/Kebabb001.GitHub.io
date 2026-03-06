// Smooth scrolling for navigation links
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
    });
});

// Add active state to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

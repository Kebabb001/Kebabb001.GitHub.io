// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's not a project link
        if (!this.classList.contains('project-link')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
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

// Project modal functionality
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');

// Project data
const projectData = {
    portfolio: {
        title: 'Personal Portfolio Website',
        description: 'A responsive portfolio website built with HTML, CSS, and JavaScript. This project showcases my skills in front-end development and includes smooth scrolling navigation, interactive elements, and a modern design that works perfectly on all devices.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        features: [
            'Responsive design that works on mobile, tablet, and desktop',
            'Smooth scrolling navigation between sections',
            'Interactive project showcase with modal details',
            'Clean and modern UI design',
            'Optimized for performance and accessibility'
        ],
        challenges: 'The main challenge was creating a smooth user experience while keeping the code clean and maintainable. I learned a lot about CSS animations and JavaScript event handling.',
        status: 'Completed - Currently live'
    },
    game: {
        title: '2D Platformer Game',
        description: 'A simple but engaging 2D platformer game developed in Unity using C#. The game features character movement, obstacles, collectibles, and basic game mechanics that demonstrate fundamental game development concepts.',
        technologies: ['C#', 'Unity', 'Game Development'],
        features: [
            'Character movement with physics-based controls',
            'Multiple levels with increasing difficulty',
            'Collectible items and scoring system',
            'Obstacle avoidance gameplay',
            'Simple but polished visual design'
        ],
        challenges: 'Working with Unity\'s physics system and understanding game loops was challenging at first. I learned about collision detection, state management, and game optimization.',
        status: 'In Progress - Currently developing'
    },
    3dgame: {
        title: '3D Platformer Game',
        description: 'An exciting 3D platformer game developed in Unity using C#. This project showcases advanced 3D game development skills with complex environments, physics-based gameplay, and immersive 3D graphics.',
        technologies: ['C#', 'Unity', '3D Graphics'],
        features: [
            'Full 3D environments with detailed level design',
            'Advanced character movement and physics',
            'Multiple camera angles and perspectives',
            'Interactive objects and power-ups',
            'Particle effects and visual polish'
        ],
        challenges: 'Working with 3D graphics and complex physics systems was challenging. I learned about 3D modeling, lighting, shaders, and optimizing performance for 3D games.',
        status: 'In Development - Learning advanced 3D concepts'
    }
};

// Handle project link clicks
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectKey = this.getAttribute('data-project');
        console.log('Clicked project:', projectKey);
        console.log('Available projects:', Object.keys(projectData));
        const project = projectData[projectKey];
        console.log('Project data:', project);
        
        if (project && modal && modalContent) {
            modalContent.innerHTML = `
                <h2 style="color: #2563eb; margin-bottom: 1rem; font-size: 1.8rem;">${project.title}</h2>
                <p style="margin-bottom: 1.5rem; color: #6b7280; line-height: 1.6;">${project.description}</p>

                <h3 style="color: #1f2937; margin-bottom: 0.5rem; font-size: 1.2rem;">Technologies Used:</h3>
                <div style="margin-bottom: 1.5rem;">
                    ${project.technologies.map(tech => `<span style="background: #f9fafb; color: #2563eb; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; margin-right: 0.5rem; display: inline-block;">${tech}</span>`).join('')}
                </div>

                <h3 style="color: #1f2937; margin-bottom: 0.5rem; font-size: 1.2rem;">Key Features:</h3>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
                    ${project.features.map(feature => `<li style="margin-bottom: 0.5rem; color: #6b7280;">${feature}</li>`).join('')}
                </ul>

                <h3 style="color: #1f2937; margin-bottom: 0.5rem; font-size: 1.2rem;">Challenges & Learning:</h3>
                <p style="margin-bottom: 1.5rem; color: #6b7280; line-height: 1.6;">${project.challenges}</p>

                <div style="background: #f9fafb; padding: 1rem; border-radius: 8px;">
                    <strong>Status:</strong> ${project.status}
                </div>
            `;

            modal.style.display = 'block';
            console.log('Modal displayed');
        } else {
            console.log('Error: Missing project data or modal elements');
        }
    });
});

// Close modal when clicking the X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

}); // Close DOMContentLoaded event listener

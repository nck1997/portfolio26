// ===========================
// Portfolio Dynamic Project Loader
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initRotatingText();
});

// ===========================
// Rotating Text Animation
// ===========================

function initRotatingText() {
    const rotatingElement = document.querySelector('.title-rotating');
    if (!rotatingElement) return;
    
    const titles = ['UX Content ', 'Content Systems ', 'AI Systems ', 'Your next '];
    let currentIndex = 0;
    
    function updateText() {
        // Fade out
        rotatingElement.style.opacity = '0';
        rotatingElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            // Change text
            rotatingElement.textContent = titles[currentIndex];
            currentIndex = (currentIndex + 1) % titles.length;
            
            // Fade in
            rotatingElement.style.opacity = '1';
            rotatingElement.style.transform = 'translateY(0)';
        }, 400);
    }
    
    // Initial text
    rotatingElement.textContent = titles[0];
    rotatingElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    
    // Rotate every 4.5 seconds (longer hold time)
    setInterval(updateText, 4500);
}

/**
 * Load and render projects from projects.json
 */
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        
        // Filter for featured projects (or all if none are featured)
        const projectsToShow = data.projects.filter(p => p.featured);
        
        renderProjects(projectsToShow);
    } catch (error) {
        console.error('Error loading projects:', error);
        renderFallbackMessage();
    }
}

/**
 * Render projects to the DOM
 */
function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    
    if (!grid) {
        console.error('Projects grid element not found');
        return;
    }
    
    grid.innerHTML = projects.map(project => createProjectCard(project)).join('');
    
    // Add click handlers to project cards
    attachProjectHandlers();
}

/**
 * Create HTML for a single project card
 */
function createProjectCard(project) {
    const tags = project.tags.map(tag => 
        `<span class="project-tag">${tag}</span>`
    ).join('');
    
    const passwordBadge = project.passwordProtected 
        ? '<span class="project-tag" style="background: #fee; border-color: #fcc; color: #c33;">🔒 Password Protected</span>' 
        : '';
    
    const projectImage = project.image 
        ? `<div class="project-card-image"><img src="${project.image}" alt="${project.title}" /></div>`
        : '';
    
    return `
        <div class="project-card" data-project-id="${project.id}">
            ${projectImage}
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p class="project-tagline">${project.tagline}</p>
                <div class="project-tags">
                    ${tags}
                    ${passwordBadge}
                </div>
                <p class="project-summary">${project.summary}</p>
                <a href="projects/${project.id}.html" class="project-link">View Project</a>
            </div>
        </div>
    `;
}

/**
 * Attach click handlers to project cards
 */
function attachProjectHandlers() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't navigate if clicking on the link directly
            if (e.target.classList.contains('project-link')) {
                return;
            }
            
            const projectId = card.dataset.projectId;
            const link = card.querySelector('.project-link');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
}

/**
 * Render fallback message if projects can't load
 */
function renderFallbackMessage() {
    const grid = document.getElementById('projects-grid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <p>Projects are currently being loaded. Please check back soon.</p>
            </div>
        `;
    }
}

// ===========================
// Smooth Scrolling (enhanced)
// ===========================

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

// ===========================
// Simple Animation on Scroll (optional enhancement)
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

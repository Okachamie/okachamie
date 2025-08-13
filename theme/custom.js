// Arcane Codex - Custom JavaScript

document.addEventListener('DOMContentLoaded', (event) => {
    // Add the gradient background div to the body
    const gradientBg = document.createElement('div');
    gradientBg.className = 'gradient-bg';
    document.body.prepend(gradientBg);

    // Simple parallax effect for the background gradient
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxRate = 0.4;
        gradientBg.style.transform = `translateY(${scrolled * parallaxRate}px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.id = 'starfield-container';
  document.body.prepend(container);

  const numStars = 200;
  const stars = [];

  // Create stars
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1; // Size between 1px and 3px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 200 + 100}s`; // Slow drift
    star.style.animationDelay = `-${Math.random() * 300}s`;
    
    // Store original position and other properties for animation
    const starObj = {
      element: star,
      origX: parseFloat(star.style.left),
      origY: parseFloat(star.style.top),
      vx: 0,
      vy: 0
    };
    stars.push(starObj);
    container.appendChild(star);
  }

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animation loop for cursor interaction
  function animate() {
    const repulsionStrength = 0.15; // How much stars move away
    const friction = 0.9; // Slows down the star movement

    stars.forEach(star => {
      const dx = (star.element.offsetLeft + star.element.offsetWidth / 2) - mouseX;
      const dy = (star.element.offsetTop + star.element.offsetHeight / 2) - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) { // Only affect stars within 150px radius
        const angle = Math.atan2(dy, dx);
        const force = (150 - distance) / 150; // Force is stronger when closer
        
        star.vx += Math.cos(angle) * force * repulsionStrength;
        star.vy += Math.sin(angle) * force * repulsionStrength;
      }

      // Apply friction to slow down
      star.vx *= friction;
      star.vy *= friction;

      // Apply the velocity to the star's transform
      star.element.style.transform = `translate(${star.vx}px, ${star.vy}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
});

document.addEventListener('DOMContentLoaded', () => {
    // Create a canvas element and append it to the body
    const canvas = document.createElement('canvas');
    canvas.id = 'supernova-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Particle class to represent a point in the supernova
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocity x
            this.vy = (Math.random() - 0.5) * 0.5; // Velocity y
            this.radius = Math.random() * 2 + 1;
            this.color = `hsla(${Math.random() * 360}, 100%, 70%, 0.8)`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Central glowing orb
    const centerOrb = {
        x: 0,
        y: 0,
        radius: 0,
        maxRadius: 0,
        colors: [
            'rgba(255, 100, 255, 0.1)',
            'rgba(170, 100, 255, 0.08)',
            'rgba(100, 150, 255, 0.05)',
            'rgba(100, 255, 255, 0.02)'
        ]
    };


    function init() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        centerOrb.x = width / 2;
        centerOrb.y = height / 2;
        centerOrb.maxRadius = Math.min(width, height) * 0.8;

        // Create particles
        particles = [];
        const particleCount = Math.floor((width * height) / 20000); // Adjust density based on screen size
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        // Clear canvas with a transparent trail effect
        ctx.fillStyle = 'rgba(44, 42, 62, 0.1)';
        ctx.fillRect(0, 0, width, height);

        // Draw the central glowing orb
        for (let i = 0; i < centerOrb.colors.length; i++) {
            const radius = centerOrb.maxRadius * ((i + 1) / centerOrb.colors.length) * (0.8 + Math.sin(Date.now() * 0.0002 + i) * 0.2);
            const gradient = ctx.createRadialGradient(centerOrb.x, centerOrb.y, 0, centerOrb.x, centerOrb.y, radius);
            gradient.addColorStop(0, centerOrb.colors[i].replace('0.1', '0.2')); // Brighter center
            gradient.addColorStop(1, centerOrb.colors[i]);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerOrb.x, centerOrb.y, radius, 0, Math.PI * 2);
            ctx.fill();
        }


        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw lines between close particles to create a constellation effect
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', init);

    // Initial setup and start animation
    init();
    animate();
});

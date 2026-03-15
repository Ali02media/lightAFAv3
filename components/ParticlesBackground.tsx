import React, { useRef, useEffect, useState } from 'react';

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Performance optimization: Set alpha to false to speed up composite blending
    const ctx = canvas.getContext('2d', { alpha: false }); 
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const updateDimensions = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    updateDimensions();

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const isMobile = width < 768;
    const isTablet = width < 1024;
    
    // Adjusted particle density for peak performance on mobile/tablet
    const PARTICLE_COUNT = isMobile ? 10 : isTablet ? 20 : 35; 
    const CONNECTION_DISTANCE = isMobile ? 90 : 130;
    const DIST_SQ_THRESHOLD = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 0.7 + 0.3,
      });
    }

    const draw = () => {
      if (!isInView) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Direct fill with black (since alpha: false)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(0, 243, 255, 0.4)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fill();

        // High-performance connection logic with early square-distance check
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          
          const distSq = dx * dx + dy * dy;
          if (distSq < DIST_SQ_THRESHOLD) {
            const alpha = 1 - (Math.sqrt(distSq) / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(0, 243, 255, ${alpha * 0.1})`; 
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Use IntersectionObserver to stop drawing when canvas is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    draw();

    window.addEventListener('resize', updateDimensions, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, [isInView]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-black"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;
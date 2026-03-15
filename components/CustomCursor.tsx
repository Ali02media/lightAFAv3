import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mousePos.current = { x: clientX, y: clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement;
      isHovering.current = !!(target.tagName.toLowerCase() === 'button' || target.closest('button') || target.tagName.toLowerCase() === 'a');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    
    let animationFrameId: number;
    const animateFollower = () => {
      if (followerRef.current) {
        followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.15;
        followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.15;
        
        const scale = isHovering.current ? 1.5 : 1;
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        followerRef.current.style.borderColor = isHovering.current ? '#0891B2' : 'rgba(15, 23, 42, 0.2)';
      }
      animationFrameId = requestAnimationFrame(animateFollower);
    };
    
    animateFollower();
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] will-change-transform" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-slate-900/20 rounded-full pointer-events-none z-[9998] transition-[border-color] duration-300 will-change-transform" />
    </>
  );
};

export default CustomCursor;
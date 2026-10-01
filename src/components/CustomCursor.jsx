import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const scaleRef = useRef(null);
  const glowRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const scaleEl = scaleRef.current;
    const glow = glowRef.current;
    const spotlight = spotlightRef.current;

    if (!cursor || !scaleEl || !glow) return;

    const SIZE = 64;

    gsap.set(cursor, { opacity: 0 });
    gsap.set(scaleEl, { scale: 1, transformOrigin: "50% 50%" });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power2.out" });

    const handleMouseMove = (e) => {
      xTo(e.clientX - SIZE / 2);
      yTo(e.clientY - SIZE / 2);

      if (spotlight) {
        spotlight.style.transform = `translate3d(${e.clientX - 350}px, ${e.clientY - 350}px, 0)`;
      }
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3, ease: "power2.out" });
      if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
      if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.3 });
    };

    // Gentle idle breathing pulse on the glow halo
    const breathe = gsap.to(glow, {
      scale: 1.35,
      opacity: 0.5,
      duration: 1.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Bigger, brighter glow when hovering anything clickable
    const handlePointerOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, .group');
      if (!target) return;
      gsap.to(scaleEl, { scale: 1.9, duration: 0.35, ease: "power2.out" });
      gsap.to(glow, { filter: "brightness(1.7)", duration: 0.35, ease: "power2.out" });
    };

    const handlePointerOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, .group');
      if (!target) return;
      gsap.to(scaleEl, { scale: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(glow, { filter: "brightness(1)", duration: 0.35, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handlePointerOver);
    document.addEventListener("mouseout", handlePointerOut);

    return () => {
      breathe.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handlePointerOver);
      document.removeEventListener("mouseout", handlePointerOut);
    };
  }, []);

  return (
    <>
      {/* Global Mouse Follower Spotlight Beam (desktop only — no real cursor to track on touch devices) */}
      <div
        ref={spotlightRef}
        className="hidden md:block fixed top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none z-[9998] opacity-0 blur-[100px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.06) 45%, transparent 75%)'
        }}
      ></div>

      {/* Global Custom Cursor — glowing orb, no ring */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none w-16 h-16 opacity-0"
      >
        <div ref={scaleRef} className="relative w-full h-full flex items-center justify-center">
          <div
            ref={glowRef}
            className="absolute w-14 h-14 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.95) 0%, rgba(6,182,212,0.45) 35%, rgba(6,182,212,0.12) 60%, transparent 75%)'
            }}
          ></div>
          <div className="relative w-2 h-2 rounded-full bg-cyan-100 shadow-[0_0_14px_4px_rgba(6,182,212,0.95)]"></div>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;

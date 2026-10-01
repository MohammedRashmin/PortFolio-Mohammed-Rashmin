import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "Mobile App Development",
    text: "Building modern Flutter applications with Dart, responsive UI, state management, local caching, and real-time communication for production-ready products.",
    tag: "FLUTTER & DART",
    gradient: "from-[#0c0a1f] via-[#121212] to-[#0a0a0a]"
  },
  {
    number: "02",
    title: "Backend Integration",
    text: "Connecting applications with REST APIs, .NET services, SQL Server databases, authentication flows, and third-party business systems.",
    tag: "API & INTEGRATION",
    gradient: "from-[#09081a] via-[#111111] to-[#090909]"
  },
  {
    number: "03",
    title: "AI-Powered Applications",
    text: "Integrating AI APIs, chatbot features, and intelligent automation into mobile applications to deliver smarter, more automated user experiences.",
    tag: "AI & AUTOMATION",
    gradient: "from-[#0d0a22] via-[#131313] to-[#0a0a0a]"
  },
  {
    number: "04",
    title: "Software Architecture",
    text: "Structuring applications using Clean Architecture, MVVM, and feature-first, modular designs that stay maintainable, scalable, and testable.",
    tag: "ARCHITECTURE & DESIGN",
    gradient: "from-[#0b091d] via-[#101010] to-[#080808]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const trunkFillRef = useRef(null);
  const nodeRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const track = trackRef.current;
    const trunkFill = trunkFillRef.current;
    if (!track || !trunkFill) return;

    const ctx = gsap.context(() => {
      // Trunk draws itself downward as the visitor scrolls through the timeline
      gsap.fromTo(
        trunkFill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 65%",
            end: "bottom 55%",
            scrub: true,
          }
        }
      );

      // Each node lights up once the trunk reaches it
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        ScrollTrigger.create({
          trigger: node,
          start: "top 68%",
          toggleClass: { targets: node, className: "node-active" },
        });
      });

      // Cards fade/rise into place as they enter view
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Magnetic mouse highlight per card
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        };
        card.addEventListener('mousemove', handleMouseMove);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addNodeRef = (el, i) => {
    nodeRefs.current[i] = el;
  };

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-20 md:py-28 px-6 md:px-12 select-none overflow-hidden"
    >
      <style>{`
        @keyframes electric-flow {
          0% { background-position: 0 -120%; }
          100% { background-position: 0 220%; }
        }
        .trunk-fill {
          background: linear-gradient(180deg, #06B6D4, #3B82F6);
          box-shadow: 0 0 14px 1px rgba(6,182,212,0.55);
        }
        .trunk-spark {
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.95) 45%, #06B6D4 55%, transparent);
          background-size: 100% 60%;
          animation: electric-flow 1.3s linear infinite;
          mix-blend-mode: screen;
        }
        .node-dot {
          transition: background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .node-active .node-dot {
          background-color: #06B6D4;
          border-color: #06B6D4;
          box-shadow: 0 0 16px 3px rgba(6,182,212,0.85);
        }
      `}</style>

      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-16 md:space-y-20">

        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-cyan-500/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
              <span className="text-cyan-400 font-bold">EPISODE 02</span>
              <span className="text-white/40">|</span>
              <span>CORE COMPETENCIES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              DIRECTOR'S CUT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 drop-shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                TECHNICAL CAPABILITIES.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Merging Flutter mobile engineering, backend integration, and AI-powered features into production-ready applications.
          </p>
        </div>

        {/* Centered Tree Timeline */}
        <div ref={trackRef} className="relative pb-8">

          {/* Trunk track (dim base line) — always dead-center, at every breakpoint */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[3px] md:w-1 h-full bg-white/10 rounded-full"></div>

          {/* Trunk fill (grows on scroll) with traveling electric spark */}
          <div
            ref={trunkFillRef}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[3px] md:w-1 h-full rounded-full origin-top overflow-hidden trunk-fill"
          >
            <div className="absolute inset-0 trunk-spark"></div>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-8">
            {expertiseData.map((item, index) => {
              const reversed = index % 2 === 1;
              return (
                <div
                  key={index}
                  className="relative flex items-center gap-2 sm:gap-4 md:gap-8"
                >
                  {/* Card slot — alternates sides at every breakpoint */}
                  <div
                    className={`w-[46%] ${reversed ? 'order-3' : 'order-1'}`}
                  >
                    <div
                      ref={addCardRef}
                      className={`group relative p-3 sm:p-5 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:border-cyan-500/50 transition-all overflow-hidden`}
                    >
                      {/* Dynamic Mouse Spotlight Highlight */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                        style={{
                          background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.18), transparent 70%)'
                        }}
                      ></div>

                      {/* Accent Stripe */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-28 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent z-10"></div>

                      {/* Card Header Top */}
                      <div className="flex flex-wrap items-center justify-between gap-1 w-full mb-2 md:mb-4 relative z-10">
                        <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 px-1.5 sm:px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25">
                          {item.tag}
                        </span>
                        <span className="text-base sm:text-2xl md:text-3xl font-mono font-black text-white/20">
                          {item.number}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="relative z-10 space-y-1 md:space-y-2">
                        <h3 className="text-sm sm:text-xl md:text-2xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="hidden sm:block text-xs md:text-sm text-white/70 font-light leading-relaxed">
                          {item.text}
                        </p>
                      </div>

                      {/* Corner Dot */}
                      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:shadow-[0_0_10px_#06B6D4] z-10 transition-all"></div>
                    </div>
                  </div>

                  {/* Node column (sits where the trunk passes through) */}
                  <div
                    ref={(el) => addNodeRef(el, index)}
                    className="relative z-10 order-2 flex-shrink-0 w-6 sm:w-10 md:w-16 flex items-center justify-center"
                  >
                    <div className="node-dot w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#0b0b0b] border-2 border-white/20"></div>
                  </div>

                  {/* Opposite-side spacer — always present so the trunk stays centered */}
                  <div
                    className={`w-[46%] ${reversed ? 'order-1' : 'order-3'}`}
                  ></div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Expertise;

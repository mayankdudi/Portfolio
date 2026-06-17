import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import { Menu, X, ArrowUpRight,ArrowUp  } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import portrait from "@/assets/mayank-portrait.png";
import projectSchool from "@/assets/project-school.jpg";
import projectComplaint from "@/assets/project-complaint.jpg";
import { supabase } from "../lib/supabase";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaHtml5,
  FaCss3Alt,
  FaFigma,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiJsonwebtokens,
  SiGithub,
  SiLinux,
  SiVercel,
  SiRender,
  SiOpenai,
  SiLangchain,
  SiFramer,
  SiGreensock,
} from "react-icons/si";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Mayank Kumar | Full Stack Engineer, MERN Stack Developer & AI Engineer",
      },

      {
        name: "description",
        content:
          "Mayank Kumar is a Full Stack Engineer and AI Developer specializing in React, Node.js, MongoDB, MERN Stack, TypeScript, OpenAI, automation workflows, scalable web applications, APIs, and modern digital experiences.",
      },

      {
        name: "keywords",
        content:
          "Mayank Kumar, Mayank Dudi, Full Stack Engineer, MERN Stack Developer, React Developer, Node.js Developer, MongoDB Developer, Express.js Developer, JavaScript Developer, TypeScript Developer, AI Developer, OpenAI Developer, LangChain Developer, Web Developer India, Portfolio Website",
      },

      {
        name: "author",
        content: "Mayank Kumar",
      },

      {
        name: "robots",
        content: "index, follow, max-image-preview:large",
      },

      {
        name: "googlebot",
        content: "index, follow",
      },

      {
        name: "theme-color",
        content: "#0f172a",
      },

      {
        property: "og:type",
        content: "website",
      },

      {
        property: "og:title",
        content:
          "Mayank Kumar | Full Stack Engineer, MERN Stack Developer & AI Engineer",
      },

      {
        property: "og:description",
        content:
          "Building scalable web applications, AI-powered solutions, automation systems, REST APIs, and modern digital products.",
      },

      {
        property: "og:url",
        content: "https://mayank-portfolio-silk.vercel.app/",
      },

      {
        property: "og:site_name",
        content: "Mayank Kumar Portfolio",
      },

      {
        property: "og:image",
        content: "https://mayank-portfolio-silk.vercel.app/og-image.png",
      },

      {
        property: "og:image:width",
        content: "1200",
      },

      {
        property: "og:image:height",
        content: "630",
      },

      {
        property: "og:locale",
        content: "en_US",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },

      {
        name: "twitter:title",
        content:
          "Mayank Kumar | Full Stack Engineer, MERN Stack Developer & AI Engineer",
      },

      {
        name: "twitter:description",
        content:
          "React, Node.js, MongoDB, MERN Stack, AI Applications, OpenAI Integrations, Automation Workflows, and Scalable Web Solutions.",
      },

      {
        name: "twitter:image",
        content: "https://mayank-portfolio-silk.vercel.app/og-image.png",
      },
    ],

    links: [
      {
        rel: "canonical",
        href: "https://mayank-portfolio-silk.vercel.app/",
      },

      {
        rel: "icon",
        href: "/favicon.ico",
      },

      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },

      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mayank Kumar",
          alternateName: "Mayank Dudi",
          url: "https://mayank-portfolio-silk.vercel.app/",
          image:
            "https://mayank-portfolio-silk.vercel.app/og-image.png",
          jobTitle: "Full Stack Engineer",
          description:
            "Full Stack Engineer specializing in MERN Stack, AI applications, automation workflows, APIs, and scalable software solutions.",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "University",
          },
          knowsAbout: [
            "React",
            "Node.js",
            "MongoDB",
            "Express.js",
            "JavaScript",
            "TypeScript",
            "OpenAI",
            "LangChain",
            "AI Development",
            "Web Development",
          ],
          sameAs: [
            "https://github.com/mayankdudi",
            "https://www.linkedin.com/in/mayank-dudi/",
          ],
        }),
      },

      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Mayank Kumar Portfolio",
          url: "https://mayank-portfolio-silk.vercel.app/",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://mayank-portfolio-silk.vercel.app/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),

  component: Index,
});
/* -------------------------------------------------------------------------- */
/*  Smooth scroll                                                              */
/* -------------------------------------------------------------------------- */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

/* -------------------------------------------------------------------------- */
/*  Reveal helpers                                                             */
/* -------------------------------------------------------------------------- */
function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CharStagger({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.9,
            delay: i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Magnetic button                                                            */
/* -------------------------------------------------------------------------- */
function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span style={{ x, y, display: "inline-flex" }} className={className}>
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="inline-block"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
      type="button"
    >
      {inner}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Spotlight cursor                                                           */
/* -------------------------------------------------------------------------- */
function Spotlight() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--sand) 55%, transparent) 0%, transparent 70%)",
      }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[520px] w-[520px] rounded-full blur-3xl md:block"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */
function Index() {
  useLenis();
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const [contactOpen, setContactOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(heroProgress, [0, 1], [0, 120]);
  const portraitScale = useTransform(heroProgress, [0, 1], [1, 1.08]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Spotlight />

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progressX, transformOrigin: "0% 50%" }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full bg-ink"
      />

      <Nav onContact={() => setContactOpen(true)} />

      {/* HERO */}
      <section id="top" ref={heroRef} className="relative pt-28 md:pt-32">
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          {/* "Hey, There" italic editorial */}
          <div className="relative z-10 flex justify-center">
            <h1 className="font-display text-[18vw] leading-[0.9] tracking-tight md:text-[14vw]">
              <CharStagger text="Hey, " className="italic font-normal" />
              <CharStagger text="there" className="italic font-normal" />
            </h1>
          </div>

          {/* Portrait, overlapping */}
          <motion.div
            style={{ y: portraitY, scale: portraitScale }}
            className="pointer-events-none absolute left-1/2 top-[18%] z-0 w-[58%] max-w-[640px] -translate-x-1/2 md:top-[14%] md:w-[42%]"
          >
            <motion.img
              src={portrait}
              alt="Portrait of Mayank Kumar"
              width={1024}
              height={1280}
              className="h-auto w-full"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Available badge */}
          <Reveal delay={0.6} className="relative z-10 mt-8 md:mt-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-cream-warm/80 px-4 py-2 text-xs uppercase tracking-[0.18em] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for new opportunities
            </div>
          </Reveal>

          {/* Bottom row: I AM MAYANK + FRONTEND WEB DEVELOPER */}
          <div className="relative z-10 mt-8 grid grid-cols-1 items-end gap-8 md:mt-24 md:grid-cols-12">
            <div className="md:col-span-8">
              <h2 className="mt-20 md:mt-0 text-[12vw] font-black uppercase leading-[0.85] tracking-[-0.02em] md:text-[9vw]">
                <Reveal y={60}>I AM</Reveal>
                <Reveal y={60} delay={0.1}>
                  MAYANK
                </Reveal>
              </h2>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <Reveal delay={0.3}>
                <p className="mt-6 md:mt-0 text-right text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
                  FULL STACK
                  <br />
                  ENGINEER &
                  <br />
                  AI SPECIALIST
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-border pt-8 md:grid-cols-12 md:pt-10">
            <Reveal className="md:col-span-4">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Based in India · Open worldwide
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5 md:col-start-7">
              <p className="font-serif-editorial text-xl italic leading-relaxed md:text-2xl">
                Full Stack Engineer & AI Specialist focused on building scalable
                MERN applications, AI-powered systems, automation workflows,
                secure APIs, and modern user experiences. Passionate about
                performance, security, and production-grade software
                architecture.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
      <About />
      <Services />
      <Projects />
      <Skills />
      <Workstation />

      <Contact onContact={() => setContactOpen(true)} />

      <Footer />

      <ScrollToTopButton />

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nav                                                                        */
/* -------------------------------------------------------------------------- */


interface NavProps {
  onContact: () => void;
}

export default function Nav({ onContact }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    ["Home", "#top"],
    ["Projects", "#projects"],
    ["Services", "#services"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1400px] px-6 py-5 md:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#top")}
            className="
              font-display text-2xl italic
              transition-all duration-300
              hover:scale-105
            "
          >
            Mayank
            <span className="text-accent-foreground">.</span>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-9 text-sm tracking-wide md:flex">
            {navItems.map(([label, href]) => (
              <button
                key={label}
                onClick={() => scrollToSection(href)}
                className="
                  relative inline-block py-1
                  transition-all duration-300
                  hover:-translate-y-0.5
                  after:absolute
                  after:bottom-0
                  after:left-0
                  after:h-px
                  after:w-full
                  after:origin-right
                  after:scale-x-0
                  after:bg-ink
                  after:transition-transform
                  after:duration-500
                  hover:after:origin-left
                  hover:after:scale-x-100
                "
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop Let's Talk Button */}
          <div className="hidden md:block">
            <motion.div
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
            >
              <MagneticButton
                onClick={onContact}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-full
                  bg-ink
                  px-7
                  py-3
                  text-sm
                  font-medium
                  text-cream
                  transition-all
                  duration-500
                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]
                "
              >
                {/* Shine Effect */}
                <span
                  className="
                    absolute
                    left-[-120%]
                    top-0
                    h-full
                    w-[50%]
                    rotate-12
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-all
                    duration-700
                    group-hover:left-[140%]
                  "
                />

                <span className="relative z-10 flex items-center gap-2">
                  Let's Talk

                  <ArrowUpRight
                    size={17}
                    className="
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              rounded-full
              p-2
              transition-all
              duration-300
              hover:bg-black/5
              md:hidden
            "
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="
                mt-4
                rounded-3xl
                border
                border-black/10
                bg-white/90
                p-6
                backdrop-blur-xl
                shadow-lg
                md:hidden
              "
            >
              <nav className="flex flex-col items-center gap-6 text-lg">
                {navItems.map(([label, href], index) => (
                  <motion.button
                    key={label}
                    onClick={() => scrollToSection(href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    whileHover={{ x: 8 }}
                    className="transition-opacity hover:opacity-70"
                  >
                    {label}
                  </motion.button>
                ))}

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MagneticButton
                    onClick={() => {
                      onContact();
                      setIsOpen(false);
                    }}
                    className="
                      group
                      mt-2
                      rounded-full
                      bg-ink
                      px-7
                      py-3
                      text-sm
                      text-cream
                    "
                  >
                    <span className="flex items-center gap-2">
                      Let's Talk
                      <ArrowUpRight
                        size={16}
                        className="
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:-translate-y-1
                        "
                      />
                    </span>
                  </MagneticButton>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
/* -------------------------------------------------------------------------- */
/*  About                                                                      */
/* -------------------------------------------------------------------------- */
function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-48"
    >
      {/* Section Label */}
      <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span className="h-px w-12 bg-foreground/30" />
        <span>(01) About</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
        {/* Left */}
        <div className="md:col-span-7">
          <h3 className="font-display text-[12vw] leading-[0.9] tracking-[-0.04em] md:text-[6vw]">
            <Reveal>Building</Reveal>

            <Reveal delay={0.1}>
              <span className="italic font-normal">scalable software</span>
            </Reveal>

            <Reveal delay={0.2}>and AI-powered</Reveal>

            <Reveal delay={0.3}>experiences.</Reveal>
          </h3>
        </div>

        {/* Right */}
        <div className="md:col-span-5 md:pt-8">
          <Reveal delay={0.2}>
            <p className="font-serif-editorial text-xl leading-relaxed md:text-3xl">
              I'm a Full Stack Engineer & AI Specialist focused on building
              intelligent products, scalable platforms, and modern digital
              experiences that create measurable impact.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-8">
            <p className="text-base leading-relaxed text-muted-foreground">
              My expertise spans MERN Stack development, AI integrations,
              Agentic Workflows, LLM-powered applications, backend engineering,
              and modern frontend architecture.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              From concept and strategy to deployment and scaling, I create
              secure, high-performance solutions that balance technology,
              usability, and business goals.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-28 border-t border-border pt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              n: 25,
              s: "+",
              label: "Projects Completed",
            },
            {
              n: 20,
              s: "+",
              label: "Technologies",
            },
            {
              n: 100,
              s: "%",
              label: "Commitment",
            },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div
                className="
                  group
                  rounded-3xl
                  border
                  border-border
                  bg-white/40
                  p-8
                  backdrop-blur-sm
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:bg-white/70
                  hover:shadow-xl
                "
              >
                <div className="font-display text-[18vw] leading-none md:text-[7vw]">
                  <Counter to={stat.n} suffix={stat.s} />
                </div>

                <div className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */
function Services() {
  const items = [
    {
      n: "01",
      t: "Full Stack Development",
      d: "End-to-end web applications built with MERN Stack, scalable architecture, secure APIs, and production-ready systems.",
    },
    {
      n: "02",
      t: "AI Integration & Automation",
      d: "LLM-powered applications, AI agents, workflow automation, chatbot systems, and intelligent business solutions.",
    },
    {
      n: "03",
      t: "Backend Engineering",
      d: "Robust REST APIs, authentication systems, role-based access control, database design, and server optimization.",
    },
    {
      n: "04",
      t: "Modern Web Applications",
      d: "High-performance React & Next.js applications with responsive design, animations, and exceptional UX.",
    },
    {
      n: "05",
      t: "SaaS & Admin Platforms",
      d: "Custom dashboards, school management systems, CRM solutions, subscription platforms, and enterprise tools.",
    },
    {
      n: "06",
      t: "Portfolio & Business Websites",
      d: "Premium portfolio websites, business landing pages, and conversion-focused digital experiences.",
    },
  ];

  return (
    <section
      id="services"
      className="border-y border-border bg-cream-soft overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
        {/* Section Label */}
        <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-px w-12 bg-foreground/30" />
          <span>(02) Services</span>
        </div>

        {/* Heading */}
        <h3 className="mb-24 font-display text-[14vw] leading-[0.85] tracking-[-0.04em] md:text-[7vw]">
          <Reveal>I can help</Reveal>

          <Reveal delay={0.1}>
            <span className="italic font-normal">you with —</span>
          </Reveal>
        </h3>

        {/* Services List */}
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item, i) => (
            <li key={item.n}>
              <Reveal delay={i * 0.05}>
                <div
                  className="
                    group
                    relative
                    grid
                    grid-cols-[auto_1fr]
                    md:grid-cols-[auto_1fr_auto]
                    items-center
                    gap-6
                    py-8
                    transition-all
                    duration-500
                    md:gap-10
                    md:py-12
                  "
                >
                  {/* Hover Background */}
                  <div
                    className="
                      absolute
                      inset-0
                      -z-10
                      opacity-0
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                      bg-white/40
                    "
                  />

                  {/* Number */}
                  <span
                    className="
                      font-display
                      text-4xl
                      italic
                      text-black/20
                      transition-all
                      duration-500
                      group-hover:text-black/40
                      md:text-6xl
                    "
                  >
                    {item.n}
                  </span>

                  {/* Content */}
                  <div className="min-w-0">
                    <h4
                      className="
                        text-2xl
                        font-semibold
                        tracking-tight
                        transition-all
                        duration-500
                        group-hover:translate-x-2
                        md:text-5xl
                      "
                    >
                      {item.t}
                    </h4>

                    <p
                      className="
                        mt-3
                        max-w-xl
                        text-sm
                        text-muted-foreground
                        transition-all
                        duration-500
                        group-hover:text-foreground/80
                        md:text-base
                      "
                    >
                      {item.d}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                      hidden
                      md:flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-black/20
                      bg-white/50
                      backdrop-blur-sm
                      transition-all
                      duration-500
                      group-hover:rotate-45
                      group-hover:bg-black
                      group-hover:text-white
                      group-hover:scale-110
                    "
                  >
                    →
                  </div>

                  {/* Animated Bottom Border */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-px
                      w-0
                      bg-black
                      transition-all
                      duration-700
                      group-hover:w-full
                    "
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/*  Projects                                                                   */
/* -------------------------------------------------------------------------- */
function ProjectCard({
  img,
  title,
  stack,
  index,
}: {
  img: string;
  title: string;
  stack: string[];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.1}>
      <article className="group">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
          <motion.img
            src={img}
            alt={title}
            loading="lazy"
            width={1280}
            height={960}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Overlay */}
          <div
            className="
              absolute inset-0
              bg-black/0
              transition-all duration-700
              group-hover:bg-black/20
            "
          />

          {/* Project Number */}
          <div
            className="
              absolute left-6 top-6
              font-display
              text-5xl md:text-8xl
              text-white/25
            "
          >
            0{index + 1}
          </div>

          {/* View Project Badge */}
          <div
            className="
              absolute bottom-6 right-6
              rounded-full
              bg-white/90
              px-4 py-2
              text-xs
              uppercase
              tracking-[0.15em]
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
            "
          >
            View Project
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 flex items-start justify-between gap-6">
          <div>
            <h4
              className="
                font-display
                text-3xl
                leading-tight
                transition-all
                duration-500
                group-hover:translate-x-2
                md:text-5xl
              "
            >
              {title}
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="
                    rounded-full
                    border
                    border-black/10
                    bg-white/60
                    px-3 py-1
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    backdrop-blur-sm
                  "
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div
            className="
              hidden md:flex
              h-14 w-14
              items-center justify-center
              rounded-full
              border border-black/20
              bg-white/50
              backdrop-blur-sm
              transition-all
              duration-500
              group-hover:rotate-45
              group-hover:bg-black
              group-hover:text-white
              group-hover:scale-110
            "
          >
            →
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48"
    >
      <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span className="h-px w-12 bg-foreground/30" />
        <span>(03) Selected Work</span>
      </div>

      <h3 className="mb-24 text-center font-black uppercase leading-[0.85] tracking-[-0.05em] text-[16vw] md:text-[8vw]">
        <Reveal>Recent Projects</Reveal>
      </h3>

      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-16">
        {/* Project 1 */}
        <ProjectCard
          img={projectSchool}
          title="AI School Management System"
          stack={["React", "Node.js", "MongoDB", "Express", "Tailwind", "AI"]}
          index={0}
        />

        {/* Project 2 */}
        <div className="md:mt-32">
          <ProjectCard
            img={projectComplaint}
            title="Smart Complaint Portal"
            stack={["React", "Node.js", "MongoDB", "Express", "AI"]}
            index={1}
          />
        </div>

        {/* Project 3 */}
        <ProjectCard
          img={projectSchool}
          title="Enterprise Admin Dashboard"
          stack={["React", "Redux Toolkit", "Node.js", "MongoDB", "Chart.js"]}
          index={2}
        />

        {/* Project 4 */}
        <div className="md:mt-32">
          <ProjectCard
            img={projectComplaint}
            title="Modern Developer Portfolio"
            stack={["React", "TypeScript", "Tailwind CSS", "Framer Motion"]}
            index={3}
          />
        </div>
      </div>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */
function Skills() {
  const rows = [
    {
      year: "2025 — Present",
      title: "Frontend Engineering",
      items: [
        { name: "React.js", icon: FaReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
      ],
    },
    {
      year: "2025 — Present",
      title: "Backend Development",
      items: [
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#000000" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Mongoose", icon: SiMongodb, color: "#880000" },
        { name: "REST APIs", icon: SiPostman, color: "#FF6C37" },
        { name: "JWT", icon: SiJsonwebtokens, color: "#D63AFF" },
        { name: "RBAC", icon: SiJsonwebtokens, color: "#D63AFF" },
        { name: "WebSockets", icon: FaNodeJs, color: "#339933" },
      ],
    },
    {
      year: "2025 — Present",
      title: "AI & Automation",
      items: [
        { name: "OpenAI", icon: SiOpenai, color: "#10A37F" },
        { name: "LangChain", icon: SiLangchain, color: "#1C3C3C" },
        { name: "LangGraph", icon: SiLangchain, color: "#1C3C3C" },
        { name: "RAG", icon: SiOpenai, color: "#10A37F" },
        { name: "AI Agents", icon: SiOpenai, color: "#10A37F" },
        { name: "Prompt Engineering", icon: SiOpenai, color: "#10A37F" },
        { name: "Vector Databases", icon: SiOpenai, color: "#10A37F" },
      ],
    },
    {
      year: "2025 — Present",
      title: "Tools & DevOps",
      items: [
        { name: "Git", icon: FaGitAlt, color: "#F05032" },
        { name: "GitHub", icon: SiGithub, color: "#181717" },
        { name: "Docker", icon: FaDocker, color: "#2496ED" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Linux", icon: SiLinux, color: "#FCC624" },
        { name: "Vercel", icon: SiVercel, color: "#000000" },
        { name: "Render", icon: SiRender, color: "#46E3B7" },
        { name: "CI/CD", icon: FaDocker, color: "#2496ED" },
      ],
    },
    {
      year: "2025 — Present",
      title: "UI & Animation",
      items: [
        { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
        { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
        { name: "Lenis", icon: SiFramer, color: "#0055FF" },
        { name: "Figma", icon: FaFigma, color: "#F24E1E" },
        { name: "Responsive Design", icon: FaFigma, color: "#A259FF" },
        { name: "UI/UX", icon: FaFigma, color: "#0ACF83" },
      ],
    },
  ];

  return (
    <section id="skills" className="border-y border-border bg-cream-soft">
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
        {/* Section Label */}
        <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-px w-12 bg-foreground/30" />
          <span>(04) Capabilities</span>
        </div>

        {/* Heading */}
        <h3 className="mb-20 text-center font-black uppercase leading-[0.9] tracking-[-0.02em] text-[14vw] md:text-[7vw]">
          <Reveal>Experience & Skills</Reveal>
        </h3>

        {/* Skills Rows */}
        <div className="divide-y divide-border border-y border-border">
          {rows.map((row, i) => (
            <Reveal key={row.title} delay={i * 0.08}>
              <div className="grid grid-cols-1 items-start gap-6 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                {/* Year */}
                <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
                  {row.year}
                </div>

                {/* Category */}
                <div className="font-display text-3xl md:col-span-4 md:text-4xl">
                  {row.title}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-3 md:col-span-5">
                  {row.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <span
                        key={item.name}
                        className="
          group
          flex items-center gap-2
          rounded-full
          border border-black/10
          bg-white/70
          px-4 py-2
          text-sm md:text-base
          backdrop-blur-sm
          transition-all duration-300
          hover:-translate-y-1
          hover:bg-white
          hover:shadow-md
        "
                      >
                        <Icon
                          style={{ color: item.color }}
                          className="
            text-lg
            transition-transform
            duration-300
            group-hover:scale-125
          "
                        />
                        <span>{item.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/*  Workstation                                                                */
/* -------------------------------------------------------------------------- */
function Workstation() {
  const timeline = [
    {
      year: "2025 — Present",
      role: "Full Stack & AI Solutions Engineer",
      company: "Freelance & Proprietary Projects",
      description:
        "Building scalable MERN applications, AI-powered systems, automation workflows, secure APIs, and enterprise-grade software solutions.",
    },
    {
      year: "2025",
      role: "Full Stack Engineering Intern",
      company: "Techno IT Training Institute",
      description:
        "Worked on React applications, backend APIs, MongoDB architecture, debugging, and production-ready software development.",
    },
    {
      year: "2024 — Present",
      role: "Bachelor of Computer Applications",
      company: "Vivekananda Global University",
      description:
        "Focused on Full Stack Development, AI Engineering, Data Structures, System Design, and modern software architecture.",
    },
  ];

  return (
    <section
      id="experience"
      className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48"
    >
      {/* Label */}
      <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span className="h-px w-12 bg-foreground/30" />
        <span>(05) Experience</span>
      </div>

      {/* Heading */}
      <h3 className="mb-24 font-black uppercase leading-[0.85] tracking-[-0.05em] text-[16vw] md:text-[8vw]">
        <Reveal>Professional Journey</Reveal>
      </h3>

      {/* Timeline */}
      <div className="border-y border-border">
        {timeline.map((item, i) => (
          <Reveal key={item.role} delay={i * 0.1}>
            <div
              className="
                group
                relative
                grid
                grid-cols-1
                gap-8
                border-b
                border-border
                py-10
                transition-all
                duration-500
                last:border-b-0
                md:grid-cols-12
                md:gap-10
                md:py-14
              "
            >
              {/* Hover Background */}
              <div
                className="
                  absolute
                  inset-0
                  -z-10
                  bg-white/40
                  opacity-0
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              {/* Number */}
              <div className="md:col-span-1">
                <span className="font-display text-5xl text-black/10 md:text-7xl">
                  0{i + 1}
                </span>
              </div>

              {/* Year */}
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {item.year}
                </p>
              </div>

              {/* Role */}
              <div className="md:col-span-4">
                <h4
                  className="
                    font-display
                    text-3xl
                    leading-tight
                    transition-all
                    duration-500
                    group-hover:translate-x-2
                    md:text-5xl
                  "
                >
                  {item.role}
                </h4>

                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {item.company}
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-5">
                <p
                  className="
                    text-base
                    leading-relaxed
                    text-muted-foreground
                    transition-all
                    duration-500
                    group-hover:text-foreground/80
                  "
                >
                  {item.description}
                </p>
              </div>

              {/* Animated Line */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  w-0
                  bg-black
                  transition-all
                  duration-700
                  group-hover:w-full
                "
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/*  Contact                                                                    */
/* -------------------------------------------------------------------------- */
function Contact({ onContact }: { onContact: () => void }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-ink text-cream"
    >
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full border border-cream/20" />
        <div className="absolute left-1/2 top-16 h-[300px] w-[300px] -translate-x-1/2 rounded-full border border-cream/10" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        {/* Section Label */}
        <div className="mb-12 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-cream/60">
          <span className="h-px w-12 bg-cream/40" />
          <span>(06) Contact</span>
        </div>

        {/* Heading */}
        <h3 className="font-display text-[14vw] leading-[0.85] tracking-[-0.05em] md:text-[8vw]">
          <Reveal>Let's build</Reveal>

          <Reveal delay={0.1}>
            <span className="italic font-normal">something great.</span>
          </Reveal>
        </h3>

        {/* Description */}
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
            I'm available for freelance projects, full-stack development,
            AI-powered solutions, SaaS products, automation workflows, and
            long-term collaborations. Let's transform ideas into scalable
            digital experiences.
          </p>
        </Reveal>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          <MagneticButton
            onClick={onContact}
            className="
          rounded-full
          bg-cream
          px-8
          py-5
          text-sm
          uppercase
          tracking-[0.18em]
          text-ink
          transition-all
          duration-500
          hover:scale-105
        "
          >
            Start a Project →
          </MagneticButton>

          <span className="font-serif-editorial text-lg italic text-cream/60">
            Open for Freelance • Remote • Full-Time
          </span>
        </div>

        {/* Contact Grid */}
        <div className="mt-16 border-t border-cream/15 pt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                label: "Email",
                value: "mayankkumardudi@gmail.com",
                href: "mailto:mayankkumardudi@gmail.com",
              },
              {
                label: "GitHub",
                value: "github.com/mayankdudi",
                href: "https://github.com/mayankdudi",
              },
              {
                label: "LinkedIn",
                value: "linkedin.com/in/mayank-dudi",
                href: "https://www.linkedin.com/in/mayank-dudi/",
              },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <div
                  className="
                group
                rounded-2xl
                border
                border-cream/10
                bg-white/[0.03]
                p-6
                backdrop-blur-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-cream/30
                hover:bg-white/[0.06]
              "
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-cream/50">
                    {c.label}
                  </span>

                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                  mt-3
                  block
                  break-all
                  font-display
                  text-xl
                  italic
                  transition-all
                  duration-500
                  group-hover:translate-x-1
                  md:text-2xl
                "
                  >
                    {c.value}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer Quote */}
        <Reveal delay={0.4}>
          <div className="mt-16 border-t border-cream/10 pt-8 text-center">
            <p className="font-serif-editorial text-xl italic text-cream/50 md:text-2xl">
              “Great products are built at the intersection of design,
              engineering, and vision.”
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10">
        <a href="#top" className="font-display text-2xl italic text-cream">
          Mayank.
        </a>

        <div className="flex flex-wrap gap-6 text-sm">
          <a href="#projects" className="hover:text-cream">
            Projects
          </a>
          <a href="#about" className="hover:text-cream">
            About
          </a>
          <a href="#skills" className="hover:text-cream">
            Skills
          </a>
          <a href="#contact" className="hover:text-cream">
            Contact
          </a>
          <a
            href="https://github.com/mayankdudi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/YOUR_LINKEDIN"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cream"
          >
            LinkedIn
          </a>
        </div>

        <div className="text-xs uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Mayank Kumar
        </div>
      </div>
    </footer>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream shadow-lg transition-all hover:-translate-y-1"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact Modal                                                              */
/* -------------------------------------------------------------------------- */
function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { error } = await supabase.from("contacts").insert([
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      ]);

      if (error) throw error;

      setSent(true);

      setTimeout(() => {
        setSent(false);
        setForm({
          name: "",
          email: "",
          message: "",
        });
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed inset-0 z-[60]
            flex items-center justify-center
            p-3 sm:p-4 md:p-6
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="
              relative
              z-10
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              rounded-[24px]
              md:rounded-[32px]
              border
              border-white/10
              bg-background/95
              backdrop-blur-xl
              shadow-[0_20px_80px_rgba(0,0,0,0.2)]
            "
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Header */}
            <div
              className="
                flex items-start justify-between
                border-b border-border/50
                px-5 py-5
                sm:px-6 sm:py-6
                md:px-8 md:py-8
              "
            >
              <div>
                <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="h-px w-8 bg-foreground/30" />
                  <span>Get in touch</span>
                </div>

                <h4 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight">
                  Let's <span className="italic font-normal">create.</span>
                </h4>

                <p className="mt-3 text-sm md:text-base text-muted-foreground">
                  Tell me about your project and I'll get back to you.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="
                  flex
                  h-10 w-10
                  md:h-12 md:w-12
                  items-center
                  justify-center
                  rounded-full
                  border border-border
                  transition-all duration-300
                  hover:rotate-90
                  hover:bg-ink
                  hover:text-cream
                "
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="
                space-y-5
                px-5 py-5
                sm:px-6 sm:py-6
                md:px-8 md:py-8
              "
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="
                    w-full
                    rounded-xl md:rounded-2xl
                    border border-border
                    bg-background/60
                    px-4 py-3
                    md:px-5 md:py-4
                    text-base md:text-lg
                    outline-none
                    transition-all duration-300
                    focus:border-foreground/30
                    focus:bg-background
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="you@email.com"
                  className="
                    w-full
                    rounded-xl md:rounded-2xl
                    border border-border
                    bg-background/60
                    px-4 py-3
                    md:px-5 md:py-4
                    text-base md:text-lg
                    outline-none
                    transition-all duration-300
                    focus:border-foreground/30
                    focus:bg-background
                  "
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Message
                </label>

                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell me about your project..."
                  className="
                    w-full
                    resize-none
                    rounded-xl md:rounded-2xl
                    border border-border
                    bg-background/60
                    px-4 py-3
                    md:px-5 md:py-4
                    text-base md:text-lg
                    outline-none
                    transition-all duration-300
                    focus:border-foreground/30
                    focus:bg-background
                  "
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Success */}
              {sent && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center text-green-700">
                  Message sent successfully ✓
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-ink
                  px-6
                  py-4
                  md:px-8
                  md:py-5
                  text-xs
                  md:text-sm
                  uppercase
                  tracking-[0.18em]
                  text-cream
                  transition-all
                  duration-500
                  hover:scale-[1.02]
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]
                  disabled:opacity-50
                "
              >
                <span>
                  {loading
                    ? "Sending..."
                    : sent
                    ? "Message Sent ✓"
                    : "Send Message"}
                </span>

                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
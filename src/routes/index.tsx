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
import { Menu, X,ArrowUp  } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import portrait from "@/assets/mayank-portrait.png";
import projectSchool from "@/assets/project-school.jpg";
import projectComplaint from "@/assets/project-complaint.jpg";
import ws1 from "@/assets/workstation-1.jpg";
import ws2 from "@/assets/workstation-2.jpg";
import ws3 from "@/assets/workstation-3.jpg";
import {supabase} from "../lib/supabase"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Mayank Kumar | Full Stack Engineer & AI Specialist",
      },
      {
        name: "description",
        content:
          "Mayank Kumar is a Full Stack Engineer & AI Specialist building scalable MERN applications, AI-powered systems, automation workflows, secure APIs, and modern digital experiences.",
      },
      {
        name: "keywords",
        content:
          "Mayank Kumar, Full Stack Engineer, AI Specialist, React Developer, Node.js Developer, MERN Stack, MongoDB, OpenAI, LangChain, Automation",
      },
      {
        property: "og:title",
        content: "Mayank Kumar | Full Stack Engineer & AI Specialist",
      },
      {
        property: "og:description",
        content:
          "Building scalable web applications, AI-powered systems, automation workflows, and modern user experiences.",
      },
    ],
       links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
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
      <section ref={heroRef} className="relative pt-28 md:pt-32">
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

<ContactModal
  open={contactOpen}
  onClose={() => setContactOpen(false)}
/>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Nav                                                                        */
/* -------------------------------------------------------------------------- */
function Nav({ onContact }: { onContact: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    ["Home", "#top"],
    ["Projects", "#projects"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1400px] px-6 py-5 md:px-10">
        <div className="flex items-center justify-between">
          <a href="#top" className="font-display text-2xl italic">
            Mayank<span className="text-accent-foreground">.</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-9 text-sm tracking-wide md:flex">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="relative inline-block py-1 transition-opacity after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <MagneticButton
              onClick={onContact}
              className="rounded-full bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-foreground/90"
            >
              Contact
            </MagneticButton>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 rounded-3xl border border-black/10 bg-white/90 p-6 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col items-center gap-6 text-lg">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="transition-opacity hover:opacity-70"
                >
                  {label}
                </a>
              ))}

              <MagneticButton
                onClick={() => {
                  onContact();
                  setIsOpen(false);
                }}
                className="mt-2 rounded-full bg-ink px-6 py-3 text-sm text-cream"
              >
                Contact
              </MagneticButton>
            </nav>
          </div>
        )}
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
        <div className="md:col-span-7">
          <h3 className="font-display text-[10vw] leading-[0.95] tracking-[-0.02em] md:text-[5.5vw]">
            <Reveal>Building scalable</Reveal>
            <Reveal delay={0.1}>
              <span className="italic font-normal">software & AI</span>
            </Reveal>
            <Reveal delay={0.2}>solutions.</Reveal>
          </h3>
        </div>

        <div className="md:col-span-5 md:pt-8">
          <Reveal delay={0.2}>
            <p className="font-serif-editorial text-2xl leading-relaxed md:text-3xl">
              I'm a Full Stack Engineer & AI Specialist focused on building
              scalable web applications, intelligent automation systems, and
              modern digital experiences that solve real-world problems.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              I specialize in MERN Stack development, AI integrations, Agentic
              Workflows, LLM-powered applications, secure backend architectures,
              and high-performance user interfaces. From concept to deployment,
              I build production-ready solutions that combine scalability,
              security, and exceptional user experience.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-24 grid grid-cols-1 gap-12 border-t border-border pt-12 md:grid-cols-3">
        {[
          { n: 25, s: "+", label: "Projects Completed" },
          { n: 20, s: "+", label: "Technologies" },
          { n: 100, s: "%", label: "Commitment" },
        ].map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <div className="flex flex-col gap-3">
              <div className="font-display text-[18vw] leading-none md:text-[7vw]">
                <Counter to={stat.n} suffix={stat.s} />
              </div>

              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
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
    <section className="border-y border-border bg-cream-soft">
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
        <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-px w-12 bg-foreground/30" />
          <span>(02) Services</span>
        </div>

        <h3 className="mb-20 font-display text-[12vw] leading-[0.9] tracking-[-0.02em] md:text-[6vw]">
          <Reveal>I can help</Reveal>
          <Reveal delay={0.1}>
            <span className="italic font-normal">you with —</span>
          </Reveal>
        </h3>

        <ul className="divide-y divide-border border-y border-border">
          {items.map((item, i) => (
            <li key={item.n}>
              <Reveal delay={i * 0.05}>
                <div className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 transition-colors md:gap-10 md:py-12">
                  <span className="font-display text-3xl italic text-muted-foreground md:text-5xl">
                    {item.n}
                  </span>

                  <div className="min-w-0">
                    <h4 className="text-2xl font-semibold tracking-tight md:text-5xl">
                      {item.t}
                    </h4>

                    <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
                      {item.d}
                    </p>
                  </div>

                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground/30 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-cream md:flex">
                    →
                  </span>
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
      <article className="group flex flex-col gap-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <motion.img
            src={img}
            alt={title}
            loading="lazy"
            width={1280}
            height={960}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="flex items-start justify-between gap-6">
          <div>
            <h4 className="font-display text-3xl leading-tight md:text-4xl">
              {title}
            </h4>

            <div className="mt-3 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-cream-warm px-3 py-1 text-xs tracking-wide text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <MagneticButton
            href="#"
            className="shrink-0 rounded-full border border-ink px-5 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-cream"
          >
            View →
          </MagneticButton>
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

      <h3 className="mb-20 text-center font-black uppercase leading-[0.9] tracking-[-0.02em] text-[14vw] md:text-[8vw]">
        <Reveal>Recent Projects</Reveal>
      </h3>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
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
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Redux Toolkit",
      ],
    },
    {
      year: "2025 — Present",
      title: "Backend Development",
      items: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "REST APIs",
        "JWT",
        "RBAC",
        "WebSockets",
      ],
    },
    {
      year: "2025 — Present",
      title: "AI & Automation",
      items: [
        "OpenAI",
        "LangChain",
        "LangGraph",
        "RAG",
        "AI Agents",
        "Prompt Engineering",
        "Vector Databases",
      ],
    },
    {
      year: "2025 — Present",
      title: "Tools & DevOps",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Postman",
        "Linux",
        "Vercel",
        "Render",
        "CI/CD",
      ],
    },
    {
      year: "2025 — Present",
      title: "UI & Animation",
      items: [
        "Framer Motion",
        "GSAP",
        "Lenis",
        "Figma",
        "Responsive Design",
        "UI/UX",
      ],
    },
  ];

  return (
    <section id="skills" className="border-y border-border bg-cream-soft">
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
        <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-px w-12 bg-foreground/30" />
          <span>(04) Capabilities</span>
        </div>

        <h3 className="mb-20 text-center font-black uppercase leading-[0.9] tracking-[-0.02em] text-[14vw] md:text-[7vw]">
          <Reveal>Experience & Skills</Reveal>
        </h3>

        <div className="divide-y divide-border border-y border-border">
          {rows.map((row, i) => (
            <Reveal key={row.title} delay={i * 0.08}>
              <div className="grid grid-cols-1 items-start gap-6 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground md:col-span-3">
                  {row.year}
                </div>

                <div className="font-display text-3xl md:col-span-4 md:text-4xl">
                  {row.title}
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-5">
                  {row.items.map((it) => (
                    <span key={it} className="text-base md:text-lg">
                      · {it}
                    </span>
                  ))}
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
      year: "2026 — Present",
      role: "Full Stack & AI Solutions Engineer",
      company: "Freelance & Proprietary Projects",
      description:
        "Building scalable MERN applications, AI-powered systems, automation workflows, secure APIs, and enterprise-grade software solutions.",
    },
    {
      year: "2026",
      role: "Full Stack Engineering Intern",
      company: "Techno IT Training Institute",
      description:
        "Worked on React applications, backend APIs, MongoDB architecture, debugging, and production-ready software development.",
    },
    {
      year: "2025 — Present",
      role: "BCA Student",
      company: "Vivekananda Global University",
      description:
        "Focused on Full Stack Development, AI Engineering, Data Structures, System Design, and modern software architecture.",
    },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-48">
      <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <span className="h-px w-12 bg-foreground/30" />
        <span>(05) Experience</span>
      </div>

      <h3 className="mb-20 font-black uppercase leading-[0.9] tracking-[-0.02em] text-[14vw] md:text-[8vw]">
        <Reveal>Professional Journey</Reveal>
      </h3>

      <div className="divide-y divide-border border-y border-border">
        {timeline.map((item, i) => (
          <Reveal key={item.role} delay={i * 0.1}>
            <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-3">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {item.year}
                </p>
              </div>

              <div className="md:col-span-4">
                <h4 className="font-display text-3xl md:text-4xl">
                  {item.role}
                </h4>

                <p className="mt-2 text-sm uppercase tracking-[0.15em] text-muted-foreground">
                  {item.company}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
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
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-56">
        <div className="mb-16 flex items-baseline gap-4 text-xs uppercase tracking-[0.25em] text-cream/60">
          <span className="h-px w-12 bg-cream/40" />
          <span>(06) Contact</span>
        </div>

        <h3 className="font-display text-[14vw] leading-[0.9] tracking-[-0.02em] md:text-[10vw]">
          <Reveal>Let's build</Reveal>
          <Reveal delay={0.1}>
            <span className="italic font-normal">something great.</span>
          </Reveal>
        </h3>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/70">
          I'm available for freelance projects, full-stack development,
          AI-powered solutions, automation workflows, and long-term
          collaborations. Let's turn your ideas into scalable digital products.
        </p>

        <div className="mt-16 flex flex-wrap items-center gap-6">
          <MagneticButton
            onClick={onContact}
            className="rounded-full bg-cream px-10 py-6 text-lg uppercase tracking-[0.18em] text-ink transition-transform"
          >
            Start a Project →
          </MagneticButton>

          <span className="font-serif-editorial text-xl italic text-cream/70">
            Open for Freelance & Full-Time Opportunities
          </span>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-10 border-t border-cream/15 pt-12 md:grid-cols-4">
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
              value: "Connect With Me",
              href: "https://www.linkedin.com/in/mayank-dudi/",
            },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-cream/50">
                  {c.label}
                </span>

                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display break-all text-2xl italic transition-opacity hover:opacity-70 md:text-3xl"
                >
                  {c.value}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
          >
            <div className="flex items-start justify-between border-b border-border px-8 pb-6 pt-8">
              <div>
                <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span className="h-px w-8 bg-foreground/30" />
                  <span>Get in touch</span>
                </div>

                <h4 className="font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">
                  Let's <span className="italic font-normal">talk.</span>
                </h4>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 px-8 py-8">
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-b border-border bg-transparent py-2 text-lg outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-b border-border bg-transparent py-2 text-lg outline-none"
                  placeholder="you@email.com"
                />
              </div>

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
                  className="w-full resize-none border-b border-border bg-transparent py-2 text-lg outline-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-sm uppercase tracking-[0.2em] text-cream disabled:opacity-50"
              >
                {loading ? "Sending..." : sent ? "Sent ✓" : "Send Message"}

                <span>→</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

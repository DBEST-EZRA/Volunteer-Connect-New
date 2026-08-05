import React, { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Handshake,
  Award,
  TrendingUp,
  Target,
  Eye,
  CheckCircle2,
  Quote,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  KeyRound,
} from "lucide-react";

/* ---------- Design tokens (see plan) ----------
  ivory        #FBF9F4  page background
  porcelain    #FFFFFF  card surfaces
  ink          #1C1917  primary text / dark sections
  ink-soft     #57534E  secondary text
  brick        #8A1F2B  primary red
  brick-deep   #5C1219  red gradient end / hover
  gold         #B8935A  primary gold accent
  gold-light   #E7D7B4  gold tint fills
  gold-line    #D9C299  hairline borders
------------------------------------------------- */

/* Reveal-on-scroll wrapper */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.unobserve(node);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* Count-up stat */
function Counter({ target, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(node);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/* Corner-bracket frame — architectural detail-marker motif reused on cards */
function Brackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#B8935A]/60 sm:h-5 sm:w-5" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[#B8935A]/60 sm:h-5 sm:w-5" />
    </>
  );
}

/* Hero skyline — blueprint line-art that draws itself in, windows light up in sequence */
function SkylineBlueprint() {
  const buildings = [
    { x: 10, w: 34, h: 120, y: 180 },
    { x: 50, w: 44, h: 175, y: 125 },
    { x: 100, w: 30, h: 95, y: 205 },
    { x: 136, w: 52, h: 220, y: 80 },
    { x: 194, w: 36, h: 140, y: 160 },
    { x: 236, w: 46, h: 190, y: 110 },
    { x: 288, w: 32, h: 100, y: 200 },
    { x: 326, w: 40, h: 155, y: 145 },
  ];

  const windows = [];
  buildings.forEach((b, bi) => {
    const cols = Math.max(2, Math.floor(b.w / 12));
    const rows = Math.max(3, Math.floor(b.h / 20));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // sparse, deliberate — not every cell, reads like a real occupied building
        if ((r + c + bi) % 3 !== 0) continue;
        windows.push({
          x: b.x + 6 + c * 12,
          y: b.y + 10 + r * 18,
          delay: (bi * 5 + r + c) * 90,
        });
      }
    }
  });

  return (
    <svg
      viewBox="0 0 400 310"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="300"
        x2="400"
        y2="300"
        stroke="#D9C299"
        strokeWidth="1"
      />
      {buildings.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx="1"
          stroke="#8A1F2B"
          strokeWidth="1.4"
          className="skyline-draw"
          style={{
            strokeDasharray: 2 * (b.w + b.h),
            strokeDashoffset: 2 * (b.w + b.h),
            animationDelay: `${i * 140}ms`,
          }}
        />
      ))}
      {windows.map((w, i) => (
        <rect
          key={i}
          x={w.x}
          y={w.y}
          width="5"
          height="7"
          fill="#B8935A"
          className="window-glow"
          style={{ animationDelay: `${1100 + w.delay}ms` }}
        />
      ))}
    </svg>
  );
}

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    copy: "We report the true numbers, on time, every month — good news or not.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    copy: "We manage every unit as though it carries our own name on the deed.",
  },
  {
    icon: Award,
    title: "Excellence",
    copy: "Inspections, screening and maintenance held to one uncompromising standard.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    copy: "Every recommendation is weighed against one question: does this grow your asset?",
  },
];

const CHECKLIST = [
  "Transparent monthly financial reporting",
  "Rigorous tenant screening & vetting",
  "24/7 maintenance response line",
  "Licensed & insured management team",
  "Proactive quarterly property inspections",
  "Legal & lease-compliance support",
  "A dedicated relationship manager per client",
  "Digital portal for owners & tenants",
];

const TIMELINE = [
  {
    year: "2012",
    text: "Founded in Kisii with a single residential block and a promise: manage it like an owner would.",
  },
  {
    year: "2015",
    text: "Crossed 100 managed units; built our in-house maintenance and vetting teams.",
  },
  {
    year: "2019",
    text: "Opened commercial-property management, adding retail and office portfolios.",
  },
  {
    year: "Today",
    text: "A full-service team overseeing residential, commercial and mixed-use properties across the country.",
  },
];

const LEADERSHIP = [
  { name: "Joshua Abuga", role: "C.E.O", initials: "JA" },
  {
    name: "Brian Nyarangi",
    role: "Head of Property Operations",
    initials: "BN",
  },
  { name: "Faith Atieno", role: "Client Relations Lead", initials: "FA" },
  { name: "David Kariuki", role: "Finance & Compliance Lead", initials: "DK" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] font-[Inter]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400;500;600;700&display=swap');

        .font-display { font-family: 'Fraunces', serif; }

        .skyline-draw {
          animation: draw 1.1s ease-out forwards;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        .window-glow {
          opacity: 0;
          animation: glow 0.6s ease-out forwards;
        }
        @keyframes glow {
          to { opacity: 1; }
        }
        .blueprint-grid {
          background-image:
            linear-gradient(#D9C299 1px, transparent 1px),
            linear-gradient(90deg, #D9C299 1px, transparent 1px);
          background-size: 36px 36px;
        }
        @media (prefers-reduced-motion: reduce) {
          .skyline-draw, .window-glow { animation: none !important; stroke-dashoffset: 0 !important; opacity: 1 !important; }
        }
      `}</style>

      <main id="top">
        {/* ---------------- HERO ---------------- */}
        <section className="relative overflow-hidden">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
                  <span className="h-px w-8 bg-[#8A1F2B]" />
                  About Volunteer Connect Consultancy
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-[#1C1917] sm:text-5xl lg:text-[3.4rem]">
                  Property management built on{" "}
                  <span className="text-[#8A1F2B]">trust</span>, precision &amp;{" "}
                  <span className="text-[#B8935A]">presence</span>.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-[#57534E] sm:text-lg">
                  For over a decade we've managed residential, commercial and
                  mixed-use properties as if we owned them ourselves — so the
                  people who do can step back, and still sleep well.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-sm bg-[#8A1F2B] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#5C1219]"
                  >
                    Work with us
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href="#story"
                    className="inline-flex items-center gap-2 rounded-sm border border-[#D9C299] px-6 py-3 text-sm font-medium text-[#1C1917] transition-colors hover:border-[#8A1F2B] hover:text-[#8A1F2B]"
                  >
                    Our story
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="relative mx-auto aspect-[4/3.1] w-full max-w-md">
                <div className="absolute -inset-6 rounded-full bg-[#8A1F2B]/10 blur-2xl" />
                <div className="absolute -inset-4 rounded-sm border border-[#D9C299]" />
                <div className="relative h-full w-full rounded-sm bg-white p-4">
                  <SkylineBlueprint />
                </div>
                <span className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#8A1F2B] text-white shadow-lg">
                  <KeyRound size={18} />
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- STATS LEDGER ---------------- */}
        <section className="bg-gradient-to-r from-[#5C1219] to-[#8A1F2B]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 py-12 sm:px-8 md:grid-cols-4 md:py-14">
            {[
              { n: 13, suf: "+", label: "Years in service" },
              { n: 1250, suf: "+", label: "Properties managed" },
              { n: 97, suf: "%", label: "Average occupancy" },
              { n: 800, suf: "+", label: "Clients served" },
            ].map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                className="text-center md:border-l md:border-white/15 md:first:border-l-0"
              >
                <div className="font-display text-3xl font-semibold text-[#F1E1BA] sm:text-4xl">
                  <Counter target={s.n} suffix={s.suf} />
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/75">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- OUR STORY ---------------- */}
        <section
          id="story"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
                  Our story
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-[#1C1917] sm:text-4xl">
                  Thirteen years of managing property like it's personal.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-[#57534E]">
                  Volunteer Connect Consultancy began with a single residential
                  block and a simple conviction: owners deserve a manager who
                  treats their asset with the same care as their own home. That
                  conviction hasn't changed — only the number of doors it now
                  covers.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-3">
              <div className="relative border-l border-[#D9C299] pl-8">
                {TIMELINE.map((t, i) => (
                  <Reveal
                    key={t.year}
                    delay={i * 100}
                    className="relative pb-10 last:pb-0"
                  >
                    <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#B8935A] bg-[#FBF9F4]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8A1F2B]" />
                    </span>
                    <span className="font-display text-lg font-semibold text-[#8A1F2B]">
                      {t.year}
                    </span>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#44403C]">
                      {t.text}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- MISSION & VISION ---------------- */}
        <section id="mission" className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-sm border border-[#EDE6D6] bg-[#FBF9F4] p-8 sm:p-10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#8A1F2B] text-white">
                    <Target size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-[#1C1917]">
                    Our Mission
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#57534E]">
                    To manage every property under our care with the diligence,
                    transparency and pride of an owner — so our clients can
                    build wealth without losing sleep over it.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="h-full rounded-sm border border-[#EDE6D6] bg-[#FBF9F4] p-8 sm:p-10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#B8935A] text-white">
                    <Eye size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-[#1C1917]">
                    Our Vision
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#57534E]">
                    To be the region's most trusted name in real estate
                    management — known as much for our integrity as for our
                    results.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- CORE VALUES ---------------- */}
        <section
          id="values"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
        >
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
              What guides us
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#1C1917] sm:text-4xl">
              Core values
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="group relative h-full border border-[#EDE6D6] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B8935A] hover:shadow-[0_16px_40px_-20px_rgba(28,25,23,0.25)]">
                  <Brackets />
                  <v.icon
                    size={26}
                    strokeWidth={1.6}
                    className="text-[#8A1F2B]"
                  />
                  <h3 className="mt-5 font-display text-lg font-semibold text-[#1C1917]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                    {v.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- WHY CHOOSE US ---------------- */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
                  Why owners choose us
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold text-[#1C1917] sm:text-4xl">
                  The details we don't compromise on.
                </h2>
                <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {CHECKLIST.map((item, i) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#B8935A]"
                        strokeWidth={1.8}
                      />
                      <span className="text-[14px] leading-snug text-[#44403C]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120}>
                <div className="relative flex h-full flex-col justify-between rounded-sm bg-gradient-to-br from-[#8A1F2B] to-[#5C1219] p-8 text-white sm:p-10">
                  <Quote
                    size={32}
                    className="text-[#F1E1BA]"
                    strokeWidth={1.5}
                  />
                  <p className="mt-6 font-display text-xl font-medium leading-relaxed sm:text-2xl">
                    "They report like an accountant and respond like family. Our
                    portfolio has never run this smoothly."
                  </p>
                  <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B8935A] text-sm font-semibold">
                      JN
                    </span>
                    <div>
                      <div className="text-sm font-medium">James Ndung'u</div>
                      <div className="text-xs text-white/60">
                        Property owner, 6 units
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- LEADERSHIP ---------------- */}
        <section
          id="leadership"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
        >
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
              Who runs it
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#1C1917] sm:text-4xl">
              Leadership
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((p, i) => (
              <Reveal key={p.name} delay={i * 90}>
                <div className="group text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#D9C299] bg-[#FBF9F4] font-display text-xl font-semibold text-[#8A1F2B] transition-colors duration-300 group-hover:border-[#B8935A]">
                    {p.initials}
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold text-[#1C1917]">
                    {p.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-[#8A1F2B]">
                    {p.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section
          id="contact"
          className="relative overflow-hidden bg-gradient-to-br from-[#8A1F2B] to-[#5C1219]"
        >
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <Reveal>
                <h2 className="max-w-lg font-display text-3xl font-semibold text-white sm:text-4xl">
                  Let's manage your property the right way.
                </h2>
                <p className="mt-3 max-w-md text-white/80">
                  Tell us about your portfolio — we'll tell you exactly how we'd
                  run it.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex flex-col gap-3 text-sm text-white/90">
                    <span className="flex items-center gap-2">
                      <Phone size={16} className="text-[#D8BE8A]" /> +254 720
                      727421
                    </span>
                    <span className="flex items-center gap-2">
                      <Mail size={16} className="text-[#D8BE8A]" />{" "}
                      hello@volunteerconnect.co.ke
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#D8BE8A]" /> Kisii,
                      Kenya
                    </span>
                  </div>
                  <a
                    href="mailto:hello@volunteerconnect.co.ke"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#8A1F2B] transition-transform hover:-translate-y-0.5"
                  >
                    Talk to us
                    <ArrowRight size={16} />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

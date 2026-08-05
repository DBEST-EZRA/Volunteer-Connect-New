import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Building2,
  Users,
  Wallet,
  Wrench,
  ClipboardCheck,
  Scale,
  LineChart,
  Search,
  FileText,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";

/* ---------- Design tokens (shared with the About page) ----------
  ivory        #FBF9F4  page background
  porcelain    #FFFFFF  card surfaces
  ink          #1C1917  primary text
  ink-soft     #57534E  secondary text
  brick        #8A1F2B  primary red
  brick-deep   #5C1219  red gradient end / hover
  gold         #B8935A  accent
  gold-light   #E7D7B4  gold tint fills
  gold-line    #D9C299  hairline borders
------------------------------------------------------------------- */

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

/* Corner-bracket frame — same architectural detail-marker motif as the About page */
function Brackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#B8935A]/60 sm:h-5 sm:w-5" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[#B8935A]/60 sm:h-5 sm:w-5" />
    </>
  );
}

/* A progress line that draws itself in as the process rail scrolls into view */
function ProcessLine() {
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
      { threshold: 0.2 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-[#EDE6D6] md:block"
    >
      <div
        className="h-px bg-[#8A1F2B] transition-all duration-[1400ms] ease-out"
        style={{ width: shown ? "100%" : "0%" }}
      />
    </div>
  );
}

const SERVICES = [
  {
    icon: Home,
    title: "Residential Management",
    copy: "End-to-end oversight of apartments, houses and gated communities.",
    items: [
      "Rent collection & arrears follow-up",
      "Tenant handovers & move-out checks",
      "Estate/HOA liaison",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Management",
    copy: "Retail, office and mixed-use portfolios run for uptime and yield.",
    items: [
      "Lease renewals & rent reviews",
      "Service-charge budgeting",
      "Facilities & vendor coordination",
    ],
  },
  {
    icon: Users,
    title: "Tenant Placement & Screening",
    copy: "We fill vacancies fast, with tenants who actually pay on time.",
    items: [
      "Background & credit checks",
      "Reference verification",
      "Lease drafting & signing",
    ],
  },
  {
    icon: Wallet,
    title: "Rent Collection & Reporting",
    copy: "Clean, on-time financial reporting you can forward straight to your accountant.",
    items: [
      "Monthly owner statements",
      "Digital rent collection",
      "Arrears management",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    copy: "A vetted contractor network and a 24/7 line for anything urgent.",
    items: [
      "Preventive maintenance schedules",
      "Emergency call-outs",
      "Vendor quality control",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Property Inspections",
    copy: "Scheduled walk-throughs that catch small problems before they're expensive ones.",
    items: [
      "Move-in / move-out reports",
      "Quarterly condition checks",
      "Photo-documented findings",
    ],
  },
  {
    icon: Scale,
    title: "Legal & Lease Compliance",
    copy: "Leases, notices and disputes handled within the letter of the law.",
    items: [
      "Lease compliance audits",
      "Eviction & notice processing",
      "Regulatory filing support",
    ],
  },
  {
    icon: LineChart,
    title: "Advisory & Market Insights",
    copy: "Data-backed guidance on rent-setting, upgrades and portfolio strategy.",
    items: [
      "Rental market benchmarking",
      "Capital-improvement planning",
      "Acquisition due diligence",
    ],
  },
];

const PROCESS = [
  {
    icon: Search,
    step: "01",
    title: "Assess",
    copy: "We walk the property, review your goals and benchmark against the local market.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Onboard",
    copy: "Contracts signed, systems set up, and your portfolio moved onto our platform.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Manage",
    copy: "Day-to-day operations — tenants, maintenance, rent — all handled by our team.",
  },
  {
    icon: LineChart,
    step: "04",
    title: "Report",
    copy: "Monthly statements and a standing review of how your asset is performing.",
  },
];

const PACKAGES = [
  {
    name: "Essential",
    tagline: "For a single, straightforward property",
    features: [
      "Rent collection",
      "Monthly financial statement",
      "Tenant communication",
    ],
  },
  {
    name: "Complete",
    tagline: "Our most-chosen plan for growing portfolios",
    features: [
      "Everything in Essential",
      "Maintenance coordination",
      "Quarterly inspections",
      "Tenant placement & screening",
    ],
    featured: true,
  },
  {
    name: "Premium",
    tagline: "Full-service management for larger portfolios",
    features: [
      "Everything in Complete",
      "Legal & compliance support",
      "Advisory & market reporting",
      "Dedicated relationship manager",
    ],
  },
];

const FAQS = [
  {
    q: "What areas do you manage properties in?",
    a: "We currently manage residential and commercial properties across Nairobi and its surrounding suburbs, with select mandates further afield.",
  },
  {
    q: "How is your management fee structured?",
    a: "Fees are a percentage of collected rent, agreed upfront with no hidden charges. We'll give you an exact figure after a short property assessment.",
  },
  {
    q: "How do you screen tenants?",
    a: "Every applicant goes through identity verification, employment and income checks, credit history review, and reference calls before a lease is offered.",
  },
  {
    q: "What happens if there's an emergency repair?",
    a: "Our maintenance line is staffed around the clock. Urgent issues are dispatched to a vetted contractor immediately, with the cost approved against your set threshold.",
  },
  {
    q: "Can I switch from another management company?",
    a: "Yes — we handle the full handover, including lease audits, deposit reconciliation and tenant re-communication, so nothing falls through the cracks.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-[#EDE6D6]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-medium text-[#1C1917] sm:text-lg">
          {item.q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#8A1F2B] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid overflow-hidden transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p className="pb-5 pr-8 text-sm leading-relaxed text-[#57534E]">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index, open, onToggle }) {
  const Icon = service.icon;
  return (
    <Reveal delay={(index % 4) * 90}>
      <div className="group relative flex h-full flex-col border border-[#EDE6D6] bg-white p-6 transition-all duration-300 hover:border-[#B8935A] hover:shadow-[0_16px_40px_-22px_rgba(28,25,23,0.28)] sm:p-7">
        <Brackets />
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#8A1F2B]/10 text-[#8A1F2B]">
          <Icon size={22} strokeWidth={1.7} />
        </span>
        <h3 className="mt-5 font-display text-lg font-semibold text-[#1C1917]">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
          {service.copy}
        </p>

        <button
          onClick={onToggle}
          className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#8A1F2B] transition-colors hover:text-[#5C1219]"
        >
          {open ? "Hide details" : "What's included"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className="grid overflow-hidden transition-all duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="min-h-0">
            <ul className="mt-4 space-y-2 border-t border-[#EDE6D6] pt-4">
              {service.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-2 text-[13px] leading-snug text-[#44403C]"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#B8935A]"
                  />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicePage() {
  const [openCard, setOpenCard] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1C1917] font-[Inter]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .blueprint-grid {
          background-image:
            linear-gradient(#D9C299 1px, transparent 1px),
            linear-gradient(90deg, #D9C299 1px, transparent 1px);
          background-size: 36px 36px;
        }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
              <span className="h-px w-8 bg-[#8A1F2B]" />
              Our Services
              <span className="h-px w-8 bg-[#8A1F2B]" />
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-[#1C1917] sm:text-5xl">
              Everything a property needs,{" "}
              <span className="text-[#8A1F2B]">handled</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#57534E] sm:text-lg">
              From tenant placement to legal compliance, we run the parts of
              property ownership you'd rather not — with reporting clear enough
              that you always know exactly how things stand.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#packages"
                className="group inline-flex items-center gap-2 rounded-sm bg-[#8A1F2B] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#5C1219]"
              >
                View packages
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#faq"
                className="inline-flex items-center gap-2 rounded-sm border border-[#D9C299] px-6 py-3 text-sm font-medium text-[#1C1917] transition-colors hover:border-[#8A1F2B] hover:text-[#8A1F2B]"
              >
                Common questions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SERVICES GRID ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              index={i}
              open={openCard === i}
              onToggle={() => setOpenCard(openCard === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
              How it works
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#1C1917] sm:text-4xl">
              From first walkthrough to monthly report.
            </h2>
          </Reveal>

          <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <ProcessLine />
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 120} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#8A1F2B] bg-[#FBF9F4] text-[#8A1F2B]">
                  <p.icon size={20} strokeWidth={1.8} />
                </div>
                <span className="mt-4 block font-display text-sm font-semibold text-[#B8935A]">
                  {p.step}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-[#1C1917]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                  {p.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PACKAGES ---------------- */}
      <section
        id="packages"
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"
      >
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
            Choose your level of support
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-[#1C1917] sm:text-4xl">
            Packages
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 110}>
              <div
                className={`relative flex h-full flex-col p-8 transition-transform duration-300 hover:-translate-y-1 ${
                  pkg.featured
                    ? "bg-gradient-to-br from-[#8A1F2B] to-[#5C1219] text-white shadow-xl"
                    : "border border-[#EDE6D6] bg-white text-[#1C1917]"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[#B8935A] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Most chosen
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold">
                  {pkg.name}
                </h3>
                <p
                  className={`mt-2 text-sm ${pkg.featured ? "text-white/80" : "text-[#57534E]"}`}
                >
                  {pkg.tagline}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2
                        size={16}
                        className={`mt-0.5 shrink-0 ${pkg.featured ? "text-[#F1E1BA]" : "text-[#8A1F2B]"}`}
                      />
                      <span
                        className={
                          pkg.featured ? "text-white/90" : "text-[#44403C]"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-colors ${
                    pkg.featured
                      ? "bg-white text-[#8A1F2B] hover:bg-[#F1E1BA]"
                      : "bg-[#1C1917] text-white hover:bg-[#8A1F2B]"
                  }`}
                >
                  Get a quote
                  <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
              Questions
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#1C1917] sm:text-4xl">
              Frequently asked
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <div>
              {FAQS.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
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
                Not sure which package fits your property?
              </h2>
              <p className="mt-3 max-w-md text-white/80">
                Tell us a bit about your portfolio and we'll recommend the right
                level of support.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-3 text-sm text-white/90">
                  <span className="flex items-center gap-2">
                    <Phone size={16} className="text-[#D8BE8A]" /> +254 720 727
                    421
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail size={16} className="text-[#D8BE8A]" />{" "}
                    hello@volunteerconnect.co.ke
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
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  User,
  MessageSquare,
  Building2,
  Loader2,
} from "lucide-react";

/* ---------- Design tokens (shared with About / Services / Blog) ----------
  ivory        #FBF9F4  page background
  porcelain    #FFFFFF  card surfaces
  ink          #1C1917  primary text
  ink-soft     #57534E  secondary text
  brick        #8A1F2B  primary red
  brick-deep   #5C1219  red gradient end / hover
  gold         #B8935A  accent
  gold-light   #E7D7B4  gold tint fills
  gold-line    #D9C299  hairline borders
----------------------------------------------------------------------------- */

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

function Brackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#B8935A]/60 sm:h-5 sm:w-5" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-[#B8935A]/60 sm:h-5 sm:w-5" />
    </>
  );
}

const INFO_CARDS = [
  {
    icon: Phone,
    label: "Call us",
    value: "+254 720727421",
    sub: "Mon–Sat, 8am–6pm",
    href: "tel:+254720727421",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "hello@volunteerconnect.co.ke",
    sub: "We reply within 24 hours",
    href: "mailto:hello@volunteerconnect.co.ke",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Kisii, Kenya",
    sub: "Umoja Complex Bld, 2nd Floor, Rm 10C",
    href: "#office",
  },
  {
    icon: Clock,
    label: "Office hours",
    value: "8:00 AM – 6:00 PM",
    sub: "Monday to Saturday",
    href: null,
  },
];

const SUBJECTS = [
  "General enquiry",
  "I'd like to hire a property manager",
  "I'm looking for a rental",
  "Maintenance request",
  "Other",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  subject: SUBJECTS[0],
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    // Simulated submission — wire this up to your actual form handler / API.
    setTimeout(() => {
      setStatus("sent");
      setForm(INITIAL_FORM);
    }, 1100);
  };

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
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
              <span className="h-px w-8 bg-[#8A1F2B]" />
              Get in touch
              <span className="h-px w-8 bg-[#8A1F2B]" />
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-[#1C1917] sm:text-5xl">
              Let's talk about your property.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[#57534E] sm:text-lg">
              Whether you own a single unit or a full portfolio, we're happy to
              walk you through how we'd manage it. No obligation, no pressure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- INFO CARDS ---------------- */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INFO_CARDS.map((c, i) => {
            const Wrapper = c.href ? "a" : "div";
            return (
              <Reveal key={c.label} delay={i * 90}>
                <Wrapper
                  href={c.href || undefined}
                  className="group relative flex h-full flex-col border border-[#EDE6D6] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B8935A] hover:shadow-[0_16px_40px_-22px_rgba(28,25,23,0.28)]"
                >
                  <Brackets />
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#8A1F2B]/10 text-[#8A1F2B]">
                    <c.icon size={19} strokeWidth={1.8} />
                  </span>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#8A857D]">
                    {c.label}
                  </span>
                  <span className="mt-1 text-[15px] font-medium leading-snug text-[#1C1917]">
                    {c.value}
                  </span>
                  <span className="mt-1 text-xs text-[#57534E]">{c.sub}</span>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- FORM + OFFICE ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="relative border border-[#EDE6D6] bg-white p-6 sm:p-10">
              <Brackets />

              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8A1F2B]/10 text-[#8A1F2B]">
                    <CheckCircle2 size={28} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[#1C1917]">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#57534E]">
                    Thanks for reaching out — someone from our team will get
                    back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-semibold text-[#8A1F2B] hover:text-[#5C1219]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="font-display text-2xl font-semibold text-[#1C1917] sm:text-3xl">
                    Send us a message
                  </h2>
                  <p className="mt-2 text-sm text-[#57534E]">
                    Fill in the details below and we'll be in touch shortly.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8A857D]">
                        Full name
                      </label>
                      <div className="flex items-center gap-2 border border-[#D9C299] bg-[#FBF9F4] px-3.5 py-3 transition-colors focus-within:border-[#8A1F2B]">
                        <User size={16} className="shrink-0 text-[#8A857D]" />
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Jane Wanjiku"
                          className="w-full bg-transparent text-sm outline-none placeholder:text-[#A39A8F]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8A857D]">
                        Email address
                      </label>
                      <div className="flex items-center gap-2 border border-[#D9C299] bg-[#FBF9F4] px-3.5 py-3 transition-colors focus-within:border-[#8A1F2B]">
                        <Mail size={16} className="shrink-0 text-[#8A857D]" />
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="jane@email.com"
                          className="w-full bg-transparent text-sm outline-none placeholder:text-[#A39A8F]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8A857D]">
                        Phone number
                      </label>
                      <div className="flex items-center gap-2 border border-[#D9C299] bg-[#FBF9F4] px-3.5 py-3 transition-colors focus-within:border-[#8A1F2B]">
                        <Phone size={16} className="shrink-0 text-[#8A857D]" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="+254 7XX XXX XXX"
                          className="w-full bg-transparent text-sm outline-none placeholder:text-[#A39A8F]"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8A857D]">
                        Subject
                      </label>
                      <div className="flex items-center gap-2 border border-[#D9C299] bg-[#FBF9F4] px-3.5 py-3 transition-colors focus-within:border-[#8A1F2B]">
                        <Building2
                          size={16}
                          className="shrink-0 text-[#8A857D]"
                        />
                        <select
                          value={form.subject}
                          onChange={update("subject")}
                          className="w-full appearance-none bg-transparent text-sm outline-none"
                        >
                          {SUBJECTS.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8A857D]">
                        Message
                      </label>
                      <div className="flex gap-2 border border-[#D9C299] bg-[#FBF9F4] px-3.5 py-3 transition-colors focus-within:border-[#8A1F2B]">
                        <MessageSquare
                          size={16}
                          className="mt-0.5 shrink-0 text-[#8A857D]"
                        />
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={update("message")}
                          placeholder="Tell us a little about your property or enquiry..."
                          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-[#A39A8F]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#8A1F2B] px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#5C1219] disabled:opacity-70 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Office / map panel */}
          <Reveal delay={120} className="lg:col-span-2">
            <div
              id="office"
              className="flex h-full flex-col border border-[#EDE6D6] bg-white"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#8A1F2B] to-[#5C1219] sm:h-56">
                <div
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                />
                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#8A1F2B] shadow-lg">
                  <MapPin size={22} strokeWidth={2} />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                  Our office
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                  Kisii CBD
                  <br />
                  Umoja Complex Bld, 2nd Floor, Rm 10C
                  <br />
                  Kisii, Kenya
                </p>

                <div className="mt-6 space-y-3 border-t border-[#EDE6D6] pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#57534E]">Monday – Friday</span>
                    <span className="font-medium text-[#1C1917]">
                      8:00 AM – 6:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#57534E]">Saturday</span>
                    <span className="font-medium text-[#1C1917]">
                      9:00 AM – 2:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#57534E]">Sunday</span>
                    <span className="font-medium text-[#1C1917]">Closed</span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A1F2B] hover:text-[#5C1219]"
                >
                  Get directions
                  <MapPin size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;

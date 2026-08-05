import { useEffect, useState } from "react";
import { ArrowRight, PlayCircle, Award, Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Years of Experience", value: "13+", Icon: Award },
  { label: "Countries Served", value: "4", Icon: MapPin },
  { label: "Properties Managed", value: "1250+", Icon: Building2 },
];

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger enter animation after first paint
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const fade = (delay = 0) =>
    `transition-all duration-700 ease-out ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`;

  return (
    <section className="relative overflow-hidden bg-red-900">
      {/* ambient glow accents */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 sm:px-10 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <div
              style={{ transitionDelay: "0ms" }}
              className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 ${fade()}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Trusted Facilities Management Since 2013
            </div>

            <h1
              style={{ transitionDelay: "100ms" }}
              className={`mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl ${fade()}`}
            >
              Better Strategy With{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">
                Quality Business
              </span>
            </h1>

            <p
              style={{ transitionDelay: "200ms" }}
              className={`mt-6 max-w-lg text-lg leading-relaxed text-white/60 ${fade()}`}
            >
              Volunteer Connect Consultant Ltd is an integrated Facilities
              Management company helping individuals, private and public
              entities better manage their properties and workplaces across East
              Africa.
            </p>

            <div
              style={{ transitionDelay: "300ms" }}
              className={`mt-9 flex flex-wrap items-center gap-4 ${fade()}`}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 text-white font-semibold shadow-lg transition hover:bg-red-700"
              >
                Our Services
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white-600 px-8 py-3 font-semibold text-white transition hover:bg-red-600 hover:text-white"
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div
              style={{ transitionDelay: "400ms" }}
              className={`mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 ${fade()}`}
            >
              {stats.map(({ label, value, Icon }) => (
                <div key={label}>
                  <Icon className="h-5 w-5 text-amber-400" />
                  <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-white/50">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            style={{ transitionDelay: "150ms" }}
            className={`relative ${fade()}`}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
                alt="Volunteer Connect facilities management in action"
                className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[560px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-6 -left-4 flex items-center gap-4 rounded-xl border border-white/10 bg-black/80 px-6 py-5 shadow-2xl backdrop-blur sm:-left-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-amber-500">
                <Award className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  East Africa's Trusted
                </p>
                <p className="text-sm font-semibold text-white">FM Partner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  MapPin,
  Users,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

/* Counts a number up from 0 to `end` once its wrapper scrolls into view */
const useCountUp = (end, duration = 1800) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let raf;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return [value, ref];
};

const Stat = ({ end, suffix = "", label, Icon }) => {
  const [value, ref] = useCountUp(end);
  return (
    <div ref={ref} className="flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-3xl font-bold tabular-nums text-gray-900 sm:text-4xl">
          {value}
          <span className="text-red-600">{suffix}</span>
        </p>
        <p className="mt-1 text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda"];

const About = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image side */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
                alt="Facilities managed by Volunteer Connect Consultant"
                className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[620px]"
              />
              {/* gold accent frame */}
              <div className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl border-2 border-amber-400/60" />
            </div>

            {/* Floating experience badge */}
            <div className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-6 py-5 shadow-xl shadow-black/10 sm:-bottom-8 sm:left-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black">
                <Award className="h-6 w-6 text-amber-400" />
              </span>
              <div>
                <p className="text-2xl font-bold leading-none text-gray-900">
                  13+
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Years of Experience
                </p>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600">
              <ArrowRight className="h-4 w-4" />
              Who We Are
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
              Years of Experience,{" "}
              <span className="relative inline-block">
                Better Strategy
                <span className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-amber-400" />
              </span>{" "}
              With Quality Business
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Volunteer Connect Consultant Ltd is an integrated Facilities
              Management company supporting individual, private and public
              entities to better manage their properties and workplaces since
              2013.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Our commitment to best practice Facilities Management has seen us
              grow into a significant player in the East African market, now
              serving Kenya, Uganda, Tanzania and Rwanda.
            </p>

            {/* Countries served */}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {countries.map((country) => (
                <li
                  key={country}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-red-600" />
                  {country}
                </li>
              ))}
            </ul>

            {/* Animated stats */}
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-3">
              <Stat
                end={13}
                suffix="+"
                label="Years of Experience"
                Icon={Award}
              />
              <Stat end={4} suffix="" label="Countries Served" Icon={MapPin} />
              <Stat
                end={1250}
                suffix="+"
                label="Properties Managed"
                Icon={Building2}
              />
            </div>

            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-600 active:scale-[0.98]"
            >
              <Users className="h-4 w-4" />
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useEffect, useRef, useState } from "react";
import {
  UserCheck,
  Globe2,
  SlidersHorizontal,
  BadgeCheck,
  Clock,
  Wallet,
  ArrowRight,
} from "lucide-react";

const reasons = [
  {
    title: "Experienced Team",
    description:
      "13+ years of hands-on facilities management expertise across every service line.",
    Icon: UserCheck,
  },
  {
    title: "Regional Coverage",
    description: "Active on the ground in Kenya, Uganda, Tanzania and Rwanda.",
    Icon: Globe2,
  },
  {
    title: "Tailored Solutions",
    description:
      "Service plans built around your property, not a one-size-fits-all package.",
    Icon: SlidersHorizontal,
  },
  {
    title: "Quality Assured",
    description:
      "Consistent standards backed by trained staff and regular quality checks.",
    Icon: BadgeCheck,
  },
  {
    title: "Rapid Response",
    description:
      "Reactive support that shows up when you need it, not days later.",
    Icon: Clock,
  },
  {
    title: "Transparent Pricing",
    description: "Clear, upfront quotes with no hidden costs along the way.",
    Icon: Wallet,
  },
];

/* Fades an element up into view the first time it enters the viewport */
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const ReasonItem = ({ title, description, Icon, index }) => {
  const [ref, visible] = useReveal();

  return (
    <li
      ref={ref}
      style={{ transitionDelay: visible ? `${(index % 6) * 80}ms` : "0ms" }}
      className={`group flex gap-4 rounded-xl p-4 transition-all duration-700 ease-out hover:bg-white hover:shadow-md hover:shadow-black/5 ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-black group-hover:text-amber-400">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
    </li>
  );
};

const WhyUs = () => {
  const [imgRef, imgVisible] = useReveal();

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image side */}
          <div
            ref={imgRef}
            className={`relative order-2 transition-all duration-700 ease-out lg:order-1 ${
              imgVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://placehold.co/640x720/1a1a1a/ffffff?text=Why+Choose+Us"
                alt="Volunteer Connect facilities management team at work"
                className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
              />
              <div className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl border-2 border-amber-400/60" />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-6 right-6 flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-6 py-5 shadow-xl shadow-black/10 sm:-bottom-8 sm:right-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600">
                <BadgeCheck className="h-6 w-6 text-white" />
              </span>
              <div>
                <p className="text-2xl font-bold leading-none text-gray-900">
                  98%
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  Client Retention
                </p>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600">
              Why Choose Us
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
              The Partner Your Property{" "}
              <span className="relative inline-block">
                Deserves
                <span className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-amber-400" />
              </span>
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              We combine local know-how with reliable, professional standards so
              you can focus on your business while we take care of your space.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <ReasonItem key={reason.title} index={index} {...reason} />
              ))}
            </ul>

            <a
              href="#"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-600 active:scale-[0.98]"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

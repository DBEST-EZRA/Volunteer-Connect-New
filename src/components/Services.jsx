import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Bug,
  Trash2,
  Trees,
  Users,
  Wrench,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Hygiene Services",
    description:
      "Hygiene services that are effective, efficient and unobtrusive.",
    Icon: Sparkles,
  },
  {
    title: "Pest Control",
    description: "Provides specialist pest control services.",
    Icon: Bug,
  },
  {
    title: "Waste Management",
    description:
      "It makes good business sense to clear all junk from your premises.",
    Icon: Trash2,
  },
  {
    title: "Commercial Landscaping",
    description:
      "Process development to maintain, set up, implement and ensure quality grounds.",
    Icon: Trees,
  },
  {
    title: "Labour Outsourcing",
    description:
      "Our expertise helps you take control, leave out the complexity, and save.",
    Icon: Users,
  },
  {
    title: "General Building Repair & Maintenance",
    description: "Reactive and planned property maintenance specialists.",
    Icon: Wrench,
  },
  {
    title: "Security Services",
    description:
      "Trained personnel and systems to keep your property and people safe.",
    Icon: ShieldCheck,
  },
];

/* Fades a card up into view the first time it's scrolled into the viewport */
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

const ServiceCard = ({ title, description, Icon, index }) => {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${(index % 3) * 100}ms` : "0ms" }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {/* gold corner accent, appears on hover */}
      <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-400/0 transition-colors duration-500 group-hover:bg-amber-400/10" />

      <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-black group-hover:text-amber-400">
        <Icon className="h-6 w-6" />
      </span>

      <h3 className="relative mt-6 text-lg font-bold uppercase tracking-tight text-gray-900">
        {title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      <a
        href="https://volunteerconnectconsultancy.netlify.app/#"
        className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 transition-colors hover:text-black"
      >
        Read More
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>

      {/* bottom rule that grows in on hover */}
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-red-600 to-amber-400 transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
};

const Services = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600">
            What We Do
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
            Our Services
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            We offer a wide range of services to meet your facilities management
            needs.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

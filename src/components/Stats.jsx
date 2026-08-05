import { useEffect, useRef, useState } from "react";
import { Smile, Trophy, Repeat, Users2 } from "lucide-react";

/* Animate value when component enters viewport */
const useAnimatedValue = (target, duration = 1600) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

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
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(eased * target);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return [value, ref];
};

const DonutStat = ({ label, percent, Icon }) => {
  const [value, ref] = useAnimatedValue(percent);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 sm:h-32 sm:w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="10"
          />

          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="url(#donutGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />

          <defs>
            <linearGradient
              id="donutGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="h-5 w-5 text-yellow-400" />

          <span className="mt-1 text-xl font-bold text-white tabular-nums">
            {Math.round(value)}%
          </span>
        </div>
      </div>

      <p className="mt-2 max-w-[9rem] text-sm font-medium text-white/80">
        {label}
      </p>
    </div>
  );
};

const donutStats = [
  {
    label: "Client Satisfaction",
    percent: 98,
    Icon: Smile,
  },
  {
    label: "Project Success Rate",
    percent: 95,
    Icon: Trophy,
  },
  {
    label: "Repeat Clients",
    percent: 90,
    Icon: Repeat,
  },
  {
    label: "Team Expertise",
    percent: 100,
    Icon: Users2,
  },
];

const Stats = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-700 py-12 sm:py-14 lg:py-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_0)] [background-size:28px_28px]" />

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
            By The Numbers
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Results That Speak For Themselves
          </h2>

          <p className="mt-2 text-base leading-7 text-white/75 sm:text-lg">
            Over a decade of delivering exceptional facilities management
            solutions across East Africa.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {donutStats.map((stat) => (
            <DonutStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

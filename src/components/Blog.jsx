import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Building2,
  Scale,
  TrendingUp,
  Users,
  Newspaper,
  Calendar,
  Clock,
  ArrowRight,
  Mail,
  Search,
} from "lucide-react";

/* ---------- Design tokens (shared with About / Services) ----------
  ivory        #FBF9F4  page background
  porcelain    #FFFFFF  card surfaces
  ink          #1C1917  primary text
  ink-soft     #57534E  secondary text
  brick        #8A1F2B  primary red
  brick-deep   #5C1219  red gradient end / hover
  gold         #B8935A  accent
  gold-light   #E7D7B4  gold tint fills
  gold-line    #D9C299  hairline borders
--------------------------------------------------------------------- */

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
      { threshold: 0.12 },
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

const CATEGORIES = [
  { name: "All", icon: Newspaper },
  { name: "Property Management", icon: Home },
  { name: "Market Insights", icon: TrendingUp },
  { name: "Tenant Tips", icon: Users },
  { name: "Legal & Compliance", icon: Scale },
];

/* Category → visual treatment for the placeholder art block on each card */
const CATEGORY_STYLE = {
  "Property Management": { icon: Home, from: "#8A1F2B", to: "#5C1219" },
  "Market Insights": { icon: TrendingUp, from: "#B8935A", to: "#8A6B3C" },
  "Tenant Tips": { icon: Users, from: "#57534E", to: "#1C1917" },
  "Legal & Compliance": { icon: Scale, from: "#1C1917", to: "#3A3532" },
  "Company News": { icon: Building2, from: "#8A1F2B", to: "#B8935A" },
};

const POSTS = [
  {
    title: "Five signs it's time to hand your property to a manager",
    excerpt:
      "Self-managing works — until it doesn't. Here's how to tell your portfolio has outgrown a DIY approach.",
    category: "Property Management",
    date: "Jul 18, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    title: "Nairobi rental yields, mid-2026: what the numbers say",
    excerpt:
      "A neighbourhood-by-neighbourhood look at where rents are moving and why.",
    category: "Market Insights",
    date: "Jul 10, 2026",
    readTime: "8 min read",
  },
  {
    title: "What to actually check during a tenant reference call",
    excerpt:
      "Most screening fails not at the credit check, but at the reference call. Here's our script.",
    category: "Tenant Tips",
    date: "Jun 29, 2026",
    readTime: "5 min read",
  },
  {
    title: "Lease renewal notices: getting the timing right",
    excerpt:
      "Miss the notice window and you could be locked into last year's rent. A quick compliance refresher.",
    category: "Legal & Compliance",
    date: "Jun 20, 2026",
    readTime: "4 min read",
  },
  {
    title: "The real cost of a vacant unit (and how to shrink it)",
    excerpt:
      "Vacancy isn't just lost rent — it's marketing spend, wear, and momentum. Here's how we model it.",
    category: "Property Management",
    date: "Jun 12, 2026",
    readTime: "7 min read",
  },
  {
    title: "Commercial vs residential: two very different management jobs",
    excerpt:
      "Why the same manager needs a different playbook for a retail unit than for a two-bedroom flat.",
    category: "Market Insights",
    date: "Jun 3, 2026",
    readTime: "6 min read",
  },
  {
    title: "Reading a tenant's payment behaviour before it becomes a pattern",
    excerpt:
      "Late by three days once is nothing. Late by three days, three times running, is a conversation.",
    category: "Tenant Tips",
    date: "May 27, 2026",
    readTime: "5 min read",
  },
  {
    title: "Volunteer Connect opens commercial-property management",
    excerpt:
      "We're extending our services to retail and office portfolios across Nairobi.",
    category: "Company News",
    date: "May 15, 2026",
    readTime: "3 min read",
  },
];

function PlaceholderArt({ category, large = false }) {
  const style =
    CATEGORY_STYLE[category] || CATEGORY_STYLE["Property Management"];
  const Icon = style.icon;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${large ? "h-56 sm:h-full" : "h-40"}`}
      style={{
        background: `linear-gradient(135deg, ${style.from}, ${style.to})`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <Icon
        size={large ? 48 : 34}
        strokeWidth={1.4}
        className="relative text-white/90"
      />
    </div>
  );
}

function PostCard({ post, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col border border-[#EDE6D6] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#B8935A] hover:shadow-[0_18px_44px_-24px_rgba(28,25,23,0.3)]">
        <Brackets />
        <PlaceholderArt category={post.category} />
        <div className="flex flex-1 flex-col p-6">
          <span className="w-fit rounded-full bg-[#8A1F2B]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#8A1F2B]">
            {post.category}
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-[#1C1917] transition-colors group-hover:text-[#8A1F2B]">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#57534E]">
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center gap-4 border-t border-[#EDE6D6] pt-4 text-xs text-[#8A857D]">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime}
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const PAGE_SIZE = 6;

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  const showFeatured = activeCategory === "All";
  const visiblePosts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

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
        <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A1F2B]">
              <span className="h-px w-8 bg-[#8A1F2B]" />
              The Journal
              <span className="h-px w-8 bg-[#8A1F2B]" />
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-[#1C1917] sm:text-5xl">
              Notes on property, from the people managing it.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#57534E] sm:text-lg">
              Market shifts, tenant realities, and the operational details that
              quietly decide whether a property performs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CATEGORY FILTER ---------------- */}
      <section className="sticky top-0 z-20 border-y border-[#EDE6D6] bg-[#FBF9F4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-4 sm:px-8">
          {CATEGORIES.map((c) => {
            const active = activeCategory === c.name;
            return (
              <button
                key={c.name}
                onClick={() => {
                  setActiveCategory(c.name);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
                  active
                    ? "border-[#8A1F2B] bg-[#8A1F2B] text-white"
                    : "border-[#D9C299] bg-white text-[#44403C] hover:border-[#8A1F2B] hover:text-[#8A1F2B]"
                }`}
              >
                <c.icon size={14} />
                {c.name}
              </button>
            );
          })}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        {/* ---------------- FEATURED ---------------- */}
        {showFeatured && featured && (
          <Reveal className="mb-14">
            <a
              href="#"
              className="group grid grid-cols-1 overflow-hidden border border-[#EDE6D6] bg-white transition-all duration-300 hover:border-[#B8935A] hover:shadow-[0_20px_50px_-26px_rgba(28,25,23,0.32)] sm:grid-cols-2"
            >
              <PlaceholderArt category={featured.category} large />
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#B8935A]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#8A6B3C]">
                  Featured
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-[#1C1917] transition-colors group-hover:text-[#8A1F2B] sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#57534E] sm:text-base">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-[#8A857D]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {featured.readTime}
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#8A1F2B]">
                  Read the piece
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </a>
          </Reveal>
        )}

        {/* ---------------- GRID ---------------- */}
        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post, i) => (
              <PostCard key={post.title} post={post} delay={(i % 3) * 90} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <Search size={28} className="text-[#D9C299]" />
            <p className="mt-4 text-sm text-[#57534E]">
              No posts in this category yet — check back soon.
            </p>
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 rounded-sm border border-[#D9C299] px-6 py-3 text-sm font-medium text-[#1C1917] transition-colors hover:border-[#8A1F2B] hover:text-[#8A1F2B]"
            >
              Load more articles
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </main>

      {/* ---------------- NEWSLETTER ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8A1F2B] to-[#5C1219]">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Mail
            size={28}
            className="mx-auto text-[#F1E1BA]"
            strokeWidth={1.6}
          />
          <h2 className="mt-5 font-display text-2xl font-semibold text-white sm:text-3xl">
            Get our notes in your inbox.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/80 sm:text-base">
            One email a month — market moves, management tips, nothing else.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full flex-1 rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-[#8A1F2B] transition-transform hover:-translate-y-0.5"
            >
              Subscribe
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blog;

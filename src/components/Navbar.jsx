import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const FONT_LINK_ID = "vc-navbar-fonts";

const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About Us", href: "about" },
  { label: "Projects", href: "properties" },
  { label: "Services", href: "services" },
  { label: "Blog", href: "blog" },
  { label: "Contact", href: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    if (!document.getElementById(FONT_LINK_ID)) {
      const link = document.createElement("link");
      link.id = FONT_LINK_ID;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav
        className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{
          backgroundColor: "#F4F0E6",
          borderBottom: "1px solid #B8925A",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                <img
                  src="/vcc.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 600,
                    fontSize: "19px",
                    color: "#cb0303",
                    letterSpacing: "0.01em",
                  }}
                >
                  Volunteer Connect
                </span>
                <span
                  className="mt-1"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    color: "#B8925A",
                    fontWeight: 600,
                  }}
                >
                  CONSULTANTS LTD
                </span>
              </div>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className="relative inline-block pb-1"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      color: activeLink === link.label ? "#1B3A2F" : "#5B5A54",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] transition-all duration-300"
                      style={{
                        backgroundColor: "#B8925A",
                        width: activeLink === link.label ? "100%" : "0%",
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-2.5 transition-colors duration-300"
                style={{
                  backgroundColor: "#cb0303",
                  color: "#F4F0E6",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#B8925A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#cb0303")
                }
              >
                Book a Consultation
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              style={{ color: "#1B3A2F" }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
          style={{
            backgroundColor: "#F4F0E6",
            borderTop: menuOpen ? "1px solid #DDD4C0" : "none",
          }}
        >
          <ul className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.label);
                    setMenuOpen(false);
                  }}
                  className="block py-3"
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: activeLink === link.label ? "#1B3A2F" : "#5B5A54",
                    borderBottom: "1px solid #EAE3D2",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center px-6 py-2.5 w-full justify-center"
                style={{
                  backgroundColor: "#1B3A2F",
                  color: "#F4F0E6",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Book a Consultation
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

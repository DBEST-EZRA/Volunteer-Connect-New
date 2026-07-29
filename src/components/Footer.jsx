import { MapPin, Phone, Mail, ArrowRight, Home } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  const aboutLinks = [
    {
      label: "Company Profile",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "Leadership",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "Sustainability",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "Investor Relations",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
  ];

  const supportLinks = [
    {
      label: "Help Center",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "FAQs",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "Contact Us",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "Store Locator",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
  ];

  const propertyLinks = [
    {
      label: "Buy a Home",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "Rent a Property",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "Sell With Us",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
    {
      label: "Property Valuation",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
    },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
      Icon: FaFacebookF,
    },
    {
      label: "Twitter",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
      Icon: FaXTwitter,
    },
    {
      label: "Instagram",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
      Icon: FaInstagram,
    },
    {
      label: "LinkedIn",
      href: "https://volunteerconnectconsultancy.netlify.app/#",
      Icon: FaLinkedinIn,
    },
  ];

  return (
    <footer className="relative bg-black text-white">
      {/* top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700 via-red-600 to-red-800" />

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12">
        {/* Newsletter / CTA strip */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Find your next address with{" "}
              <span className="text-red-600">VolunteerConnect</span>
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Get new listings, market insights, and exclusive offers straight
              to your inbox.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center overflow-hidden rounded-full border border-white/15 bg-white/5 pl-5 focus-within:border-red-600 md:w-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full bg-transparent py-3 text-sm text-white placeholder-white/40 outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500 active:bg-red-700"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Main link grid */}
        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand + contact */}
          <div className="col-span-2 md:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
                <Home className="h-5 w-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold tracking-tight">
                VolunteerConnect
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Trusted real estate guidance for buyers, sellers, and investors —
              helping you find a place to call home.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <span>Kisii, Kisii County, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-red-600" />
                <a href="tel:+254720727421" className="hover:text-white">
                  +254 720 727 421
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-red-600" />
                <a
                  href="mailto:info@volunteerconnect.co.ke"
                  className="hover:text-white"
                >
                  info@volunteerconnect.co.ke
                </a>
              </li>
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Properties
            </h3>
            <ul className="mt-4 space-y-3">
              {propertyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/60 transition-colors hover:text-red-500"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              About Us
            </h3>
            <ul className="mt-4 space-y-3">
              {aboutLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/60 transition-colors hover:text-red-500"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/60 transition-colors hover:text-red-500"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-6 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-center text-xs text-white/50 sm:text-left">
            &copy; {year} VolunteerConnect. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex gap-5 text-xs text-white/50">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

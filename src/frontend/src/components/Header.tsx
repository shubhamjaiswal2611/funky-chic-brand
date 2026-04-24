import { Link } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useThemeStore } from "../store/themeStore";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Brand Story", to: "/brand-story" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "Newsletter", to: "/newsletter" },
];

export default function Header() {
  const { mode, toggle } = useThemeStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isFunky = mode === "funky";

  return (
    <header
      className="sticky top-0 z-50 transition-theme"
      style={{
        backgroundColor: "oklch(var(--header-bg))",
        color: "oklch(var(--header-fg))",
        borderBottom: "3px solid oklch(var(--saffron))",
      }}
    >
      {/* Energy mode bar */}
      <div
        className="flex items-center justify-center gap-3 py-1.5 text-xs font-body font-semibold tracking-widest uppercase"
        style={{
          backgroundColor: "oklch(var(--saffron))",
          color: "oklch(0.15 0.05 280)",
        }}
      >
        <span>Energy Mode</span>
        <button
          type="button"
          data-ocid="theme.toggle"
          onClick={toggle}
          aria-label={`Switch to ${isFunky ? "Chic" : "Funky"} mode`}
          className="relative flex items-center gap-2 rounded-full px-3 py-0.5 transition-smooth"
          style={{ backgroundColor: "oklch(0.15 0.05 280 / 0.15)" }}
        >
          <span
            className="font-display font-bold uppercase text-xs tracking-widest"
            style={{ opacity: isFunky ? 1 : 0.5 }}
          >
            Funky
          </span>
          {/* Toggle pill */}
          <span
            className="relative inline-flex w-10 h-5 rounded-full transition-smooth mx-1"
            style={{ backgroundColor: "oklch(0.15 0.05 280 / 0.3)" }}
          >
            <span
              className="absolute top-0.5 h-4 w-4 rounded-full transition-smooth"
              style={{
                backgroundColor: "oklch(0.15 0.05 280)",
                left: isFunky ? "2px" : "calc(100% - 18px)",
              }}
            />
          </span>
          <span
            className="font-display font-bold uppercase text-xs tracking-widest"
            style={{ opacity: isFunky ? 0.5 : 1 }}
          >
            Chic
          </span>
        </button>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="nav.logo_link"
          className="flex items-center gap-2 transition-smooth hover:opacity-80"
        >
          <Zap
            size={20}
            style={{ color: "oklch(var(--saffron))" }}
            strokeWidth={2.5}
          />
          <span
            className="font-display text-2xl font-black tracking-tight uppercase"
            style={{
              color: isFunky ? "oklch(var(--saffron))" : "oklch(var(--indigo))",
            }}
          >
            ZOLA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
              className="px-4 py-2 rounded-md font-body font-semibold text-sm uppercase tracking-wider transition-smooth hover:opacity-90"
              style={{
                color: isFunky
                  ? "oklch(var(--header-fg))"
                  : "oklch(var(--header-fg))",
              }}
              activeProps={{
                style: {
                  backgroundColor: "oklch(var(--saffron) / 0.2)",
                  color: "oklch(var(--saffron))",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          data-ocid="nav.mobile_menu_toggle"
          className="md:hidden p-2 rounded-md transition-smooth"
          style={{ color: "oklch(var(--header-fg))" }}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav
          className="md:hidden px-4 pb-4 flex flex-col gap-1 border-t"
          style={{ borderColor: "oklch(var(--saffron) / 0.3)" }}
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.mobile_${link.label.toLowerCase().replace(" ", "_")}_link`}
              className="px-4 py-3 rounded-md font-body font-semibold text-sm uppercase tracking-wider transition-smooth"
              style={{ color: "oklch(var(--header-fg))" }}
              onClick={() => setMobileOpen(false)}
              activeProps={{
                style: {
                  backgroundColor: "oklch(var(--saffron) / 0.2)",
                  color: "oklch(var(--saffron))",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

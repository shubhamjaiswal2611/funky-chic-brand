import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { SiFacebook } from "react-icons/si";
import { useThemeStore } from "../store/themeStore";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "Brand Story", to: "/brand-story" },
  { label: "Newsletter", to: "/newsletter" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "X / Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: SiFacebook, label: "Facebook", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer
      className="pattern-block-print transition-theme"
      style={{
        backgroundColor: "oklch(var(--footer-bg))",
        color: "oklch(var(--footer-fg))",
      }}
    >
      {/* Cultural accent bar */}
      <div
        style={{
          height: "4px",
          background: isFunky
            ? "oklch(var(--primary))"
            : "oklch(var(--secondary))",
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p
              className="font-display text-3xl font-black uppercase tracking-tight mb-2"
              style={{
                color: isFunky
                  ? "oklch(var(--primary))"
                  : "oklch(var(--secondary))",
              }}
            >
              ZOLA
            </p>
            <p
              className="font-body text-sm leading-relaxed opacity-80 max-w-xs"
              style={{ color: "oklch(var(--footer-fg))" }}
            >
              Embrace the Beat. Fuse the World.
              <br />
              Global folk motifs × streetwear energy.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              className="font-display font-bold uppercase tracking-widest text-xs mb-4 opacity-60"
              style={{ color: "oklch(var(--footer-fg))" }}
            >
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    data-ocid={`footer.${link.label.toLowerCase().replace(" ", "_")}_link`}
                    className="font-body text-sm transition-smooth hover:opacity-100 opacity-75"
                    style={{ color: "oklch(var(--footer-fg))" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p
              className="font-display font-bold uppercase tracking-widest text-xs mb-4 opacity-60"
              style={{ color: "oklch(var(--footer-fg))" }}
            >
              Follow the Tribe
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  data-ocid={`footer.${label.toLowerCase().replace(/[^a-z]/g, "_")}_link`}
                  aria-label={label}
                  className="p-2 rounded-md transition-smooth hover:opacity-100 opacity-70"
                  style={{
                    backgroundColor: "oklch(var(--footer-fg) / 0.1)",
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: "oklch(var(--footer-fg))" }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-60"
          style={{
            borderTop: "1px solid oklch(var(--footer-fg) / 0.15)",
            color: "oklch(var(--footer-fg))",
          }}
        >
          <span>© {year} ZOLA Global. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-100 transition-smooth"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

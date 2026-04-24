import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  LogIn,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useThemeStore } from "../store/themeStore";
import { useWishlistStore } from "../store/wishlistStore";

const navLinks = [
  { label: "Shop", to: "/products" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "Brand Story", to: "/brand-story" },
  { label: "Newsletter", to: "/newsletter" },
];

export default function Header() {
  const { mode, toggle } = useThemeStore();
  const { isAuthenticated, isAdmin, login, logout } = useAuth();
  const cartCount = useCartStore((s) => s.getCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isFunky = mode === "funky";
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50 transition-theme"
      style={{
        backgroundColor: "oklch(var(--header-bg))",
        color: "oklch(var(--header-fg))",
        borderBottom: isFunky
          ? "3px solid oklch(var(--hotpink))"
          : "2px solid oklch(var(--saffron))",
      }}
    >
      {/* Energy mode bar */}
      <div
        className="flex items-center justify-center gap-3 py-1.5 text-xs font-body font-semibold tracking-widest uppercase"
        style={{
          backgroundColor: isFunky
            ? "oklch(var(--hotpink))"
            : "oklch(var(--saffron))",
          color: isFunky ? "oklch(0.95 0 0)" : "oklch(0.15 0.05 280)",
        }}
      >
        <span className="hidden sm:inline">Energy Mode</span>
        <button
          type="button"
          data-ocid="theme.toggle"
          onClick={toggle}
          aria-label={`Switch to ${isFunky ? "Chic" : "Funky"} mode`}
          className="relative flex items-center gap-2 rounded-full px-3 py-0.5 transition-smooth"
          style={{ backgroundColor: "oklch(0.15 0.05 280 / 0.15)" }}
        >
          <span
            className="font-display font-black uppercase text-xs tracking-widest"
            style={{ opacity: isFunky ? 1 : 0.5 }}
          >
            BE FUNKY
          </span>
          <span
            className="relative inline-flex w-10 h-5 rounded-full transition-smooth mx-1"
            style={{
              backgroundColor: "oklch(0.15 0.05 280 / 0.3)",
              border: "1px solid oklch(0.15 0.05 280 / 0.4)",
            }}
          >
            <span
              className="absolute top-0.5 h-4 w-4 rounded-full transition-smooth"
              style={{
                backgroundColor: "oklch(0.98 0 0)",
                left: isFunky ? "2px" : "calc(100% - 18px)",
              }}
            />
          </span>
          <span
            className="font-display font-black uppercase text-xs tracking-widest"
            style={{ opacity: isFunky ? 0.5 : 1 }}
          >
            CHIC
          </span>
        </button>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex items-center justify-between px-4 py-3 gap-4">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="nav.logo_link"
          className="flex items-center gap-2 transition-smooth hover:opacity-80 flex-shrink-0"
        >
          <Zap
            size={20}
            strokeWidth={2.5}
            style={{
              color: isFunky ? "oklch(var(--lime))" : "oklch(var(--saffron))",
            }}
          />
          <span
            className="font-display text-2xl font-black tracking-tight uppercase"
            style={{
              color: isFunky ? "oklch(var(--lime))" : "oklch(var(--indigo))",
              textShadow: isFunky
                ? "0 0 16px oklch(var(--lime) / 0.5)"
                : "none",
            }}
          >
            ZOLA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1 flex-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
              className="px-3 py-2 rounded-md font-body font-semibold text-sm uppercase tracking-wider transition-smooth hover:opacity-90"
              style={{ color: "oklch(var(--header-fg))" }}
              activeProps={{
                style: {
                  backgroundColor: isFunky
                    ? "oklch(var(--hotpink) / 0.15)"
                    : "oklch(var(--saffron) / 0.15)",
                  color: isFunky
                    ? "oklch(var(--hotpink))"
                    : "oklch(var(--saffron))",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              data-ocid="nav.admin_link"
              className="px-3 py-2 rounded-md font-body font-semibold text-sm uppercase tracking-wider transition-smooth"
              style={{ color: "oklch(var(--destructive))" }}
              activeProps={{
                style: { opacity: 0.7 },
              }}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {/* Wishlist */}
          {isAuthenticated && (
            <Link
              to="/wishlist"
              data-ocid="nav.wishlist_link"
              aria-label="Wishlist"
              className="relative p-2 rounded-md transition-smooth hover:opacity-80"
              style={{ color: "oklch(var(--header-fg))" }}
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] border-0 font-bold flex items-center justify-center"
                  style={{
                    backgroundColor: "oklch(var(--destructive))",
                    color: "oklch(var(--destructive-foreground))",
                  }}
                >
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            data-ocid="nav.cart_link"
            aria-label="Shopping cart"
            className="relative p-2 rounded-md transition-smooth hover:opacity-80"
            style={{ color: "oklch(var(--header-fg))" }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] border-0 font-bold flex items-center justify-center"
                style={{
                  backgroundColor: isFunky
                    ? "oklch(var(--lime))"
                    : "oklch(var(--saffron))",
                  color: "oklch(0.1 0.02 280)",
                }}
              >
                {cartCount}
              </Badge>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-ocid="nav.user_menu_toggle"
                  className="relative rounded-full transition-smooth"
                  style={{ color: "oklch(var(--header-fg))" }}
                  aria-label="User menu"
                >
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {isAdmin && (
                  <>
                    <DropdownMenuItem
                      data-ocid="nav.admin_menu_item"
                      onClick={() => navigate({ to: "/admin" })}
                      className="gap-2 cursor-pointer"
                    >
                      <Settings size={14} />
                      Admin Panel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  data-ocid="nav.wishlist_menu_item"
                  onClick={() => navigate({ to: "/wishlist" })}
                  className="gap-2 cursor-pointer"
                >
                  <Heart size={14} />
                  My Wishlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  data-ocid="nav.logout_button"
                  onClick={logout}
                  className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut size={14} />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              data-ocid="nav.login_button"
              onClick={login}
              className="gap-1.5 font-body font-semibold text-xs uppercase tracking-widest transition-smooth"
              style={{ color: "oklch(var(--header-fg))" }}
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            data-ocid="nav.mobile_menu_toggle"
            className="md:hidden p-2 rounded-md transition-smooth"
            style={{ color: "oklch(var(--header-fg))" }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav
          className="md:hidden px-4 pb-4 flex flex-col gap-1 border-t"
          style={{
            borderColor: isFunky
              ? "oklch(var(--hotpink) / 0.3)"
              : "oklch(var(--saffron) / 0.3)",
          }}
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
                  backgroundColor: isFunky
                    ? "oklch(var(--hotpink) / 0.15)"
                    : "oklch(var(--saffron) / 0.15)",
                  color: isFunky
                    ? "oklch(var(--hotpink))"
                    : "oklch(var(--saffron))",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              data-ocid="nav.mobile_admin_link"
              className="px-4 py-3 rounded-md font-body font-semibold text-sm uppercase tracking-wider transition-smooth"
              style={{ color: "oklch(var(--destructive))" }}
              onClick={() => setMobileOpen(false)}
            >
              Admin Panel
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

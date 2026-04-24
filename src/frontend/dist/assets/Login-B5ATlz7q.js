import { e as useAuth, z as useNavigate, a as useThemeStore, r as reactExports, j as jsxRuntimeExports, m as motion, Z as Zap, F as Label, I as Input, B as Button, L as Link } from "./index-vtaZNhFN.js";
import { E as EyeOff, a as Eye } from "./eye-Chaz5kvz.js";
function MandalaDecor({ isFunky }) {
  const color = isFunky ? "oklch(0.88 0.3 130 / 0.18)" : "oklch(0.76 0.18 72 / 0.12)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      "aria-label": "Decorative mandala motif",
      width: "220",
      height: "220",
      viewBox: "0 0 220 220",
      className: "absolute -top-16 -right-16 pointer-events-none select-none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Mandala decoration" }),
        [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `rotate(${angle} 110 110)`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "110", cy: "55", rx: "8", ry: "22", fill: color }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "110", cy: "42", rx: "4", ry: "10", fill: color })
        ] }, angle)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "110",
            cy: "110",
            r: "28",
            fill: "none",
            stroke: color,
            strokeWidth: "2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "110",
            cy: "110",
            r: "16",
            fill: "none",
            stroke: color,
            strokeWidth: "1.5"
          }
        )
      ]
    }
  );
}
function Login() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const navigate = useNavigate();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [attempted, setAttempted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6;
  const canSubmit = emailValid && passwordValid;
  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);
    if (!canSubmit) return;
    login();
  };
  const accentColor = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const secondaryColor = isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center pattern-mandala relative overflow-hidden",
      style: { backgroundColor: "oklch(var(--background))" },
      "data-ocid": "login.page",
      children: [
        isFunky && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-[-10%] left-[-5%] w-72 h-72 rounded-full blur-[120px] pointer-events-none",
              style: { backgroundColor: "oklch(0.6 0.32 330 / 0.15)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-[-10%] right-[-5%] w-72 h-72 rounded-full blur-[120px] pointer-events-none",
              style: { backgroundColor: "oklch(0.88 0.3 130 / 0.12)" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 36 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            className: "card-brand shadow-elevated-brand p-8 sm:p-10 max-w-md w-full mx-4 relative overflow-hidden",
            "data-ocid": "login.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MandalaDecor, { isFunky }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 22, style: { color: secondaryColor } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-display text-2xl font-black uppercase tracking-tight",
                    style: {
                      color: isFunky ? "oklch(var(--lime))" : "oklch(var(--indigo))"
                    },
                    children: "ZOLA"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "heading-brand text-3xl md:text-4xl mb-1",
                  style: { color: "oklch(var(--foreground))" },
                  children: isFunky ? "COME IN, REBEL." : "WELCOME BACK"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-body text-sm leading-relaxed mb-7",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: [
                    "Sign in to access your wishlist, track orders, and unlock the full ZOLA experience.",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(var(--muted-foreground))" }, children: "Guests can still browse the full collection." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-px mb-7",
                  style: {
                    background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "login-email",
                      className: "font-body font-semibold text-xs uppercase tracking-widest",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Email Address"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "login-email",
                      "data-ocid": "login.input",
                      type: "email",
                      autoComplete: "email",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      placeholder: "you@email.com",
                      className: "font-body bg-transparent border-border focus-visible:ring-1 transition-smooth",
                      style: attempted && !emailValid ? { borderColor: "oklch(var(--destructive))" } : {}
                    }
                  ),
                  attempted && !emailValid && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-body",
                      "data-ocid": "login.field_error",
                      style: { color: "oklch(var(--destructive))" },
                      children: "Please enter a valid email address."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "login-password",
                      className: "font-body font-semibold text-xs uppercase tracking-widest",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "login-password",
                        "data-ocid": "login.password_input",
                        type: showPassword ? "text" : "password",
                        autoComplete: "current-password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder: "••••••••",
                        className: "font-body bg-transparent border-border focus-visible:ring-1 transition-smooth pr-10",
                        style: attempted && !passwordValid ? { borderColor: "oklch(var(--destructive))" } : {}
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": showPassword ? "Hide password" : "Show password",
                        onClick: () => setShowPassword((v) => !v),
                        className: "absolute right-3 top-1/2 -translate-y-1/2 transition-smooth",
                        style: { color: "oklch(var(--muted-foreground))" },
                        children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                      }
                    )
                  ] }),
                  attempted && !passwordValid && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-body",
                      "data-ocid": "login.password_field_error",
                      style: { color: "oklch(var(--destructive))" },
                      children: "Password must be at least 6 characters."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    "data-ocid": "login.submit_button",
                    disabled: isInitializing || isLoggingIn,
                    className: "w-full font-body font-bold uppercase tracking-widest text-sm py-6 mt-2 transition-smooth",
                    style: {
                      backgroundColor: accentColor,
                      color: isFunky ? "oklch(0.98 0 0)" : "oklch(var(--primary-foreground))",
                      boxShadow: isFunky ? "0 0 24px oklch(0.6 0.32 330 / 0.5)" : "none"
                    },
                    children: isInitializing ? "Loading…" : isLoggingIn ? "Signing in…" : isFunky ? "LET ME IN →" : "Sign In"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-sm",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: [
                      "Don't have an account?",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/register",
                          "data-ocid": "login.register_link",
                          className: "font-semibold transition-smooth hover:underline",
                          style: { color: accentColor },
                          children: "Create one free"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-xs",
                    style: { color: "oklch(var(--muted-foreground) / 0.6)" },
                    children: [
                      "Or",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/",
                          "data-ocid": "login.browse_as_guest_link",
                          className: "underline transition-smooth",
                          style: { color: "oklch(var(--muted-foreground))" },
                          children: "continue browsing as guest"
                        }
                      )
                    ]
                  }
                )
              ] }),
              (isInitializing || isLoggingIn) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 flex items-center justify-center rounded-lg",
                  "data-ocid": "login.loading_state",
                  style: { backgroundColor: "oklch(var(--card) / 0.85)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-8 h-8 rounded-full border-2 border-t-transparent animate-spin",
                      style: { borderColor: accentColor }
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  Login as default
};

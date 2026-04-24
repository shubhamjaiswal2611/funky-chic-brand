import { e as useAuth, z as useNavigate, a as useThemeStore, r as reactExports, j as jsxRuntimeExports, m as motion, L as Link, K as Sparkles, F as Label, I as Input, B as Button } from "./index-vtaZNhFN.js";
import { A as ArrowLeft } from "./arrow-left-D0f2sd0y.js";
import { E as EyeOff, a as Eye } from "./eye-Chaz5kvz.js";
function PaisleyDecor({ isFunky }) {
  const c1 = isFunky ? "oklch(0.88 0.3 130 / 0.2)" : "oklch(0.76 0.18 72 / 0.15)";
  const c2 = isFunky ? "oklch(0.6 0.32 330 / 0.15)" : "oklch(0.48 0.2 273 / 0.1)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "200",
      height: "200",
      viewBox: "0 0 200 200",
      className: "absolute -bottom-10 -left-10 pointer-events-none select-none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Paisley decoration" }),
        [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `rotate(${angle} 100 100)`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "50", rx: "6", ry: "18", fill: c1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "38", rx: "3", ry: "8", fill: c2 })
        ] }, angle)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "100",
            cy: "100",
            r: "22",
            fill: "none",
            stroke: c1,
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "100", r: "12", fill: c2 })
      ]
    }
  );
}
function Register() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const navigate = useNavigate();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [attempted, setAttempted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 8;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);
    if (!emailValid || !passwordValid || !passwordsMatch) return;
    login();
  };
  const accentColor = isFunky ? "oklch(var(--lime))" : "oklch(var(--primary))";
  const accentBg = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center pattern-block-print relative overflow-hidden",
      style: { backgroundColor: "oklch(var(--background))" },
      "data-ocid": "register.page",
      children: [
        isFunky && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-[-8%] right-[-5%] w-80 h-80 rounded-full blur-[140px] pointer-events-none",
              style: { backgroundColor: "oklch(0.65 0.28 210 / 0.12)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-[-8%] left-[-5%] w-72 h-72 rounded-full blur-[120px] pointer-events-none",
              style: { backgroundColor: "oklch(0.88 0.3 130 / 0.1)" }
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
            "data-ocid": "register.panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PaisleyDecor, { isFunky }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/login",
                  "data-ocid": "register.back_to_login_link",
                  className: "inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest mb-6 transition-smooth hover:opacity-70",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 13 }),
                    "Back to Login"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkles,
                  {
                    size: 22,
                    style: {
                      color: isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "heading-brand text-3xl md:text-4xl",
                    style: { color: "oklch(var(--foreground))" },
                    children: isFunky ? "JOIN THE CREW." : "CREATE ACCOUNT"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm leading-relaxed mb-7",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: isFunky ? "Drop your details and become part of the movement. Free. Bold. Yours." : "Create your account to save favourites, track orders, and enjoy a curated experience."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-px mb-7",
                  style: {
                    background: `linear-gradient(to right, transparent, ${accentBg}, transparent)`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "reg-email",
                      className: "font-body font-semibold text-xs uppercase tracking-widest",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Email Address"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "reg-email",
                      "data-ocid": "register.email_input",
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
                      "data-ocid": "register.email_field_error",
                      style: { color: "oklch(var(--destructive))" },
                      children: "Please enter a valid email address."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "reg-password",
                      className: "font-body font-semibold text-xs uppercase tracking-widest",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "reg-password",
                        "data-ocid": "register.password_input",
                        type: showPassword ? "text" : "password",
                        autoComplete: "new-password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder: "Min. 8 characters",
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
                      "data-ocid": "register.password_field_error",
                      style: { color: "oklch(var(--destructive))" },
                      children: "Password must be at least 8 characters."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "reg-confirm",
                      className: "font-body font-semibold text-xs uppercase tracking-widest",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: "Confirm Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "reg-confirm",
                        "data-ocid": "register.confirm_password_input",
                        type: showConfirm ? "text" : "password",
                        autoComplete: "new-password",
                        value: confirmPassword,
                        onChange: (e) => setConfirmPassword(e.target.value),
                        placeholder: "Repeat your password",
                        className: "font-body bg-transparent border-border focus-visible:ring-1 transition-smooth pr-10",
                        style: attempted && !passwordsMatch ? { borderColor: "oklch(var(--destructive))" } : {}
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": showConfirm ? "Hide confirm password" : "Show confirm password",
                        onClick: () => setShowConfirm((v) => !v),
                        className: "absolute right-3 top-1/2 -translate-y-1/2 transition-smooth",
                        style: { color: "oklch(var(--muted-foreground))" },
                        children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                      }
                    )
                  ] }),
                  attempted && !passwordsMatch && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-body",
                      "data-ocid": "register.confirm_field_error",
                      style: { color: "oklch(var(--destructive))" },
                      children: confirmPassword.length === 0 ? "Please confirm your password." : "Passwords do not match."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    "data-ocid": "register.submit_button",
                    disabled: isInitializing || isLoggingIn,
                    className: "w-full font-body font-bold uppercase tracking-widest text-sm py-6 mt-2 transition-smooth",
                    style: {
                      backgroundColor: accentBg,
                      color: isFunky ? "oklch(0.98 0 0)" : "oklch(var(--primary-foreground))",
                      boxShadow: isFunky ? "0 0 28px oklch(0.6 0.32 330 / 0.45)" : "none"
                    },
                    children: isInitializing || isLoggingIn ? "Creating account…" : isFunky ? "CREATE & JOIN →" : "Create Account"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-body text-sm text-center mt-6",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: [
                    "Already have an account?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/login",
                        "data-ocid": "register.login_link",
                        className: "font-semibold transition-smooth hover:underline",
                        style: { color: accentColor },
                        children: "Sign in"
                      }
                    )
                  ]
                }
              ),
              (isInitializing || isLoggingIn) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 flex items-center justify-center rounded-lg",
                  "data-ocid": "register.loading_state",
                  style: { backgroundColor: "oklch(var(--card) / 0.85)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-8 h-8 rounded-full border-2 border-t-transparent animate-spin",
                      style: { borderColor: accentBg }
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
  Register as default
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, createActor } from "../backend";
import { useThemeStore } from "../store/themeStore";

const CANISTER_ID: string =
  (import.meta as unknown as { env: Record<string, string> }).env
    .VITE_CANISTER_ID_BACKEND ?? "";

const perks = [
  {
    icon: "✦",
    title: "Exclusive Drop Alerts",
    desc: "First access to limited collections before anyone else. Be the one who got it early.",
  },
  {
    icon: "◈",
    title: "Culture Stories",
    desc: "Behind-the-scenes with the artisans, streets, and traditions that inspire each piece.",
  },
  {
    icon: "◆",
    title: "Member Discounts",
    desc: "Exclusive codes and early-bird pricing reserved for tribe members only.",
  },
  {
    icon: "✸",
    title: "Collab Previews",
    desc: "Sneak peeks of upcoming artist collaborations across Mumbai, Tokyo, Accra, and beyond.",
  },
];

// Mandala SVG accent
function MandalaAccent({
  className,
  style,
}: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <title>Mandala decorative accent</title>
      {/* Outer petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <ellipse
            cx="100"
            cy="30"
            rx="8"
            ry="20"
            fill="currentColor"
            opacity="0.15"
          />
        </g>
      ))}
      {/* Mid ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <ellipse
            cx="100"
            cy="55"
            rx="6"
            ry="14"
            fill="currentColor"
            opacity="0.2"
          />
        </g>
      ))}
      {/* Inner petals */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <ellipse
            cx="100"
            cy="72"
            rx="5"
            ry="10"
            fill="currentColor"
            opacity="0.25"
          />
        </g>
      ))}
      {/* Center rings */}
      <circle
        cx="100"
        cy="100"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.2" />
      <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Block-print border SVG
function BlockPrintBorder() {
  return (
    <svg
      viewBox="0 0 400 20"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-5"
      preserveAspectRatio="repeat"
      aria-hidden="true"
    >
      <title>Block print border decoration</title>
      {[
        0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
        300, 320, 340, 360, 380,
      ].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <rect
            x="2"
            y="2"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <rect
            x="6"
            y="6"
            width="8"
            height="8"
            fill="currentColor"
            opacity="0.3"
          />
        </g>
      ))}
    </svg>
  );
}

type SubscribeStatus = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      if (CANISTER_ID) {
        const backend = createActor(
          CANISTER_ID,
          async (blob) => {
            const bytes = await blob.getBytes();
            return new Uint8Array(bytes.buffer as ArrayBuffer);
          },
          async (bytes) =>
            ExternalBlob.fromBytes(bytes as Uint8Array<ArrayBuffer>),
        );
        // Call subscribeNewsletter if it exists on the actor
        const actor = (
          backend as unknown as {
            actor: Record<
              string,
              (e: string) => Promise<{ ok?: null; err?: string }>
            >;
          }
        ).actor;
        if (typeof actor?.subscribeNewsletter === "function") {
          const result = await actor.subscribeNewsletter(email.trim());
          if ("err" in result) {
            setStatus("error");
            setErrorMsg(
              result.err ?? "Something went wrong. Please try again.",
            );
            return;
          }
        }
      }

      setStatus("success");
      toast.success(
        isFunky ? "You're in the tribe! 🔥" : "Welcome to the movement.",
        {
          description: `${name ? `Welcome, ${name}!` : "Welcome!"} Expect the unexpected in your inbox.`,
        },
      );
      setEmail("");
      setName("");
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't subscribe right now. Please try again shortly.");
      toast.error("Subscription failed.");
    }
  };

  const isLoading = status === "loading";

  return (
    <div data-ocid="newsletter.page">
      {/* ── Hero ── */}
      <section
        data-ocid="newsletter.hero_section"
        className="relative overflow-hidden border-cultural"
        style={{
          backgroundColor: "oklch(var(--offwhite))",
          minHeight: "380px",
        }}
      >
        {/* Mandala backgrounds */}
        <MandalaAccent className="absolute -right-16 -top-16 w-64 h-64 text-primary opacity-20 pointer-events-none" />
        <MandalaAccent className="absolute -left-16 bottom-0 w-48 h-48 text-secondary opacity-15 pointer-events-none" />
        <MandalaAccent className="absolute right-1/3 top-4 w-24 h-24 text-destructive opacity-10 pointer-events-none" />

        <div className="relative container mx-auto px-4 py-24 text-center max-w-3xl">
          {/* Block print border top */}
          <div
            className="mx-auto mb-6 max-w-xs"
            style={{
              color: isFunky ? "oklch(var(--saffron))" : "oklch(var(--indigo))",
            }}
          >
            <BlockPrintBorder />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {isFunky ? (
              <>
                <h1 className="heading-brand text-5xl md:text-7xl mb-4 text-foreground">
                  Join the Movement
                </h1>
                <p
                  className="heading-brand text-2xl md:text-3xl mb-6"
                  style={{ color: "oklch(var(--crimson))" }}
                >
                  The Zola Tribe Awaits You
                </p>
              </>
            ) : (
              <>
                <p
                  className="font-display text-xs uppercase tracking-[0.35em] mb-4"
                  style={{ color: "oklch(var(--indigo))" }}
                >
                  The Zola Collective
                </p>
                <h1 className="heading-brand text-4xl md:text-6xl mb-4 text-foreground">
                  Stay Inspired.
                  <br />
                  Join the Fusion.
                </h1>
              </>
            )}
            <p className="font-body text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
              {isFunky
                ? "First access to drops, culture deep-dives, artist collabs, and member-only deals — delivered straight to your inbox."
                : "Curated drops, cultural narratives, and member privileges — from our world to yours."}
            </p>
          </motion.div>

          {/* Block print border bottom */}
          <div
            className="mx-auto mt-6 max-w-xs"
            style={{
              color: isFunky ? "oklch(var(--saffron))" : "oklch(var(--indigo))",
            }}
          >
            <BlockPrintBorder />
          </div>
        </div>
      </section>

      {/* ── Why Subscribe + Form ── */}
      <section
        data-ocid="newsletter.main_section"
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start max-w-5xl mx-auto">
            {/* Perks column */}
            <div>
              <motion.h2
                className="heading-brand text-3xl mb-2 text-foreground"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {isFunky ? "What You'll Unlock" : "Your Member Benefits"}
              </motion.h2>
              <motion.p
                className="font-body text-sm text-muted-foreground mb-8"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {isFunky
                  ? "No fluff. Pure culture, delivered with fire."
                  : "Carefully curated content for those who appreciate the craft."}
              </motion.p>

              <div className="space-y-4">
                {perks.map((perk, i) => (
                  <motion.div
                    key={perk.title}
                    data-ocid={`newsletter.perk.item.${i + 1}`}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start p-4 rounded-xl card-brand"
                    style={{
                      borderLeft: `var(--border-accent-width) solid ${isFunky ? "oklch(var(--saffron))" : "oklch(var(--indigo))"}`,
                    }}
                  >
                    <span
                      className="text-xl flex-shrink-0 font-display font-black mt-0.5"
                      style={{
                        color: isFunky
                          ? "oklch(var(--crimson))"
                          : "oklch(var(--indigo))",
                      }}
                    >
                      {perk.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-foreground text-sm uppercase tracking-wide">
                        {perk.title}
                      </p>
                      <p className="font-body text-sm text-muted-foreground mt-0.5 leading-relaxed">
                        {perk.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative mandala */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-8 flex justify-start"
                style={{
                  color: isFunky
                    ? "oklch(var(--saffron))"
                    : "oklch(var(--indigo) / 0.5)",
                }}
              >
                <MandalaAccent className="w-28 h-28" />
              </motion.div>
            </div>

            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="rounded-2xl p-8 pattern-block-print relative overflow-hidden"
              style={{
                backgroundColor: isFunky
                  ? "oklch(var(--indigo))"
                  : "oklch(var(--card))",
                boxShadow: isFunky
                  ? "8px 8px 0 oklch(var(--saffron))"
                  : "0 24px 48px oklch(var(--indigo) / 0.12)",
                border: isFunky ? "none" : "2px solid oklch(var(--border))",
              }}
            >
              {/* Corner mandala accent */}
              <MandalaAccent
                className="absolute -top-8 -right-8 w-32 h-32 pointer-events-none"
                style={
                  {
                    color: isFunky
                      ? "oklch(var(--saffron) / 0.15)"
                      : "oklch(var(--primary) / 0.08)",
                  } as React.CSSProperties
                }
              />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    data-ocid="newsletter.success_state"
                    className="text-center py-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 12,
                        delay: 0.1,
                      }}
                      className="text-5xl mb-4"
                    >
                      🎉
                    </motion.div>
                    <h3
                      className="heading-brand text-2xl mb-2"
                      style={{
                        color: isFunky
                          ? "oklch(var(--saffron))"
                          : "oklch(var(--primary))",
                      }}
                    >
                      You're in the Tribe!
                    </h3>
                    <p
                      className="font-body text-sm opacity-80"
                      style={{
                        color: isFunky
                          ? "oklch(var(--offwhite))"
                          : "oklch(var(--foreground))",
                      }}
                    >
                      Check your inbox for a welcome note.
                      <br />
                      Expect the unexpected.
                    </p>
                    <button
                      type="button"
                      data-ocid="newsletter.subscribe_again_button"
                      className="mt-6 font-display text-xs uppercase tracking-widest underline underline-offset-4 opacity-60 hover:opacity-100 transition-smooth"
                      style={{
                        color: isFunky
                          ? "oklch(var(--offwhite))"
                          : "oklch(var(--foreground))",
                      }}
                      onClick={() => {
                        setStatus("idle");
                        setEmail("");
                        setName("");
                      }}
                    >
                      Subscribe another email
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2
                      className="heading-brand text-2xl mb-1"
                      style={{
                        color: isFunky
                          ? "oklch(var(--saffron))"
                          : "oklch(var(--foreground))",
                      }}
                    >
                      {isFunky ? "Join the Movement" : "Become a Member"}
                    </h2>
                    <p
                      className="font-body text-sm mb-6"
                      style={{
                        color: isFunky
                          ? "oklch(var(--offwhite) / 0.65)"
                          : "oklch(var(--muted-foreground))",
                      }}
                    >
                      {isFunky
                        ? "No spam. Drop notifications only. 🔥"
                        : "Curated updates, nothing more. Unsubscribe anytime."}
                    </p>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      noValidate
                    >
                      {/* Name field */}
                      <div>
                        <Label
                          htmlFor="nl-name"
                          className="font-display text-xs uppercase tracking-widest mb-1.5 block"
                          style={{
                            color: isFunky
                              ? "oklch(var(--offwhite) / 0.7)"
                              : "oklch(var(--foreground) / 0.7)",
                          }}
                        >
                          Your Name
                        </Label>
                        <Input
                          id="nl-name"
                          data-ocid="newsletter.name_input"
                          type="text"
                          placeholder={
                            isFunky ? "Ayo, Kenji, Priya..." : "Your name"
                          }
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="font-body border-0 transition-smooth focus-visible:ring-2"
                          style={{
                            backgroundColor: isFunky
                              ? "oklch(var(--offwhite) / 0.12)"
                              : "oklch(var(--input))",
                            color: isFunky
                              ? "oklch(var(--offwhite))"
                              : "oklch(var(--foreground))",
                            caretColor: "oklch(var(--saffron))",
                          }}
                        />
                      </div>

                      {/* Email field */}
                      <div>
                        <Label
                          htmlFor="nl-email"
                          className="font-display text-xs uppercase tracking-widest mb-1.5 block"
                          style={{
                            color: isFunky
                              ? "oklch(var(--offwhite) / 0.7)"
                              : "oklch(var(--foreground) / 0.7)",
                          }}
                        >
                          Email Address <span aria-label="required">*</span>
                        </Label>
                        <Input
                          id="nl-email"
                          ref={emailRef}
                          data-ocid="newsletter.email_input"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") {
                              setStatus("idle");
                              setErrorMsg("");
                            }
                          }}
                          required
                          aria-invalid={status === "error" ? "true" : "false"}
                          aria-describedby={errorMsg ? "nl-error" : undefined}
                          className="font-body border-0 transition-smooth focus-visible:ring-2"
                          style={{
                            backgroundColor: isFunky
                              ? "oklch(var(--offwhite) / 0.12)"
                              : "oklch(var(--input))",
                            color: isFunky
                              ? "oklch(var(--offwhite))"
                              : "oklch(var(--foreground))",
                            caretColor: "oklch(var(--saffron))",
                            boxShadow:
                              status === "error"
                                ? "0 0 0 2px oklch(var(--crimson))"
                                : undefined,
                          }}
                        />

                        {/* Inline error */}
                        <AnimatePresence>
                          {status === "error" && errorMsg && (
                            <motion.p
                              id="nl-error"
                              role="alert"
                              data-ocid="newsletter.field_error"
                              className="font-body text-xs mt-1.5 flex items-center gap-1"
                              style={{
                                color: isFunky
                                  ? "oklch(var(--saffron))"
                                  : "oklch(var(--crimson))",
                              }}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                            >
                              <span aria-hidden="true">⚠</span> {errorMsg}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        data-ocid="newsletter.subscribe_button"
                        disabled={isLoading || !email.trim()}
                        className="w-full font-display font-black uppercase tracking-widest text-sm transition-smooth mt-1 h-11"
                        style={{
                          backgroundColor: isFunky
                            ? "oklch(var(--saffron))"
                            : "oklch(var(--primary))",
                          color: isFunky
                            ? "oklch(0.15 0.05 280)"
                            : "oklch(var(--primary-foreground))",
                          boxShadow:
                            isFunky && !isLoading && email.trim()
                              ? "3px 3px 0 oklch(var(--offwhite) / 0.4)"
                              : "none",
                          opacity: !email.trim() ? 0.55 : 1,
                        }}
                      >
                        {isLoading ? (
                          <span
                            data-ocid="newsletter.loading_state"
                            className="flex items-center gap-2"
                          >
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1,
                                ease: "linear",
                              }}
                              className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            />
                            {isFunky
                              ? "Joining the tribe..."
                              : "Subscribing..."}
                          </span>
                        ) : isFunky ? (
                          "Subscribe Now →"
                        ) : (
                          "Join the Collective"
                        )}
                      </Button>
                    </form>

                    <p
                      className="font-body text-xs mt-4 text-center opacity-50"
                      style={{
                        color: isFunky
                          ? "oklch(var(--offwhite))"
                          : "oklch(var(--muted-foreground))",
                      }}
                    >
                      By subscribing you agree to receive brand updates.
                      Unsubscribe anytime.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section
        data-ocid="newsletter.social_proof_section"
        className="py-20 pattern-block-print border-cultural relative overflow-hidden"
        style={{
          backgroundColor: isFunky
            ? "oklch(var(--saffron))"
            : "oklch(var(--card))",
        }}
      >
        <MandalaAccent
          className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-40 opacity-20 pointer-events-none"
          style={
            {
              color: isFunky ? "oklch(0.15 0.05 280)" : "oklch(var(--primary))",
            } as React.CSSProperties
          }
        />
        <MandalaAccent
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-32 h-32 opacity-15 pointer-events-none"
          style={
            {
              color: isFunky ? "oklch(0.15 0.05 280)" : "oklch(var(--primary))",
            } as React.CSSProperties
          }
        />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="heading-brand text-6xl md:text-8xl mb-2"
              style={{
                color: isFunky
                  ? "oklch(0.15 0.05 280)"
                  : "oklch(var(--primary))",
              }}
            >
              12,000+
            </p>
            <p
              className="font-body text-lg font-semibold"
              style={{
                color: isFunky
                  ? "oklch(0.15 0.05 280 / 0.75)"
                  : "oklch(var(--muted-foreground))",
              }}
            >
              {isFunky
                ? "tribe members worldwide and counting 🌍"
                : "members across the global collective"}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

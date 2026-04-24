import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, q as Presence, P as Primitive, l as useControllableState, n as useComposedRefs, p as composeEventHandlers, E as useSize, w as createContextScope, y as cn, a as useThemeStore, u as useBackend, z as useNavigate, f as useCartStore, L as Link, B as Button, F as Label, I as Input, i as ue } from "./index-vtaZNhFN.js";
import { C as Check, u as useMutation } from "./check-vOUOIPdC.js";
import { S as Separator } from "./separator-Djd4Xkbs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = reactExports.useState(null);
  const [bubbleInput, setBubbleInput] = reactExports.useState(null);
  const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context,
      children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
    }
  );
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = reactExports.forwardRef(
  ({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setControl);
    const initialCheckedStateRef = reactExports.useRef(checked);
    reactExports.useEffect(() => {
      const form = control == null ? void 0 : control.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }
);
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }
);
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context.checked) || context.checked === true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            "data-state": getState(context.checked),
            "data-disabled": context.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }
);
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = reactExports.forwardRef(
  ({ __scopeCheckbox, ...props }, forwardedRef) => {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const bubbles = !hasConsumerStoppedPropagationRef.current;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
      }
    }, [bubbleInput, prevChecked, checked, hasConsumerStoppedPropagationRef]);
    const defaultCheckedRef = reactExports.useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
  return typeof value === "function";
}
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Checkbox$1,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
const FIELD_LABELS = {
  name: "Full Name",
  line1: "Address Line 1",
  line2: "Address Line 2 (optional)",
  city: "City",
  state: "State / Province",
  postalCode: "Postal Code",
  country: "Country"
};
const FIELD_PLACEHOLDERS = {
  name: "Priya Sharma",
  line1: "123 Culture Street",
  line2: "Apt 4B",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "US"
};
function CheckoutPageInner() {
  const { actor } = useBackend();
  const navigate = useNavigate();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const { items, getTotal, clearCart } = useCartStore();
  const [form, setForm] = reactExports.useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US"
  });
  const [sameAsBilling, setSameAsBilling] = reactExports.useState(true);
  const [paymentError, setPaymentError] = reactExports.useState(null);
  const subtotalCents = getTotal();
  const taxCents = Math.round(subtotalCents * 0.1);
  const totalCents = subtotalCents + taxCents;
  const priceColor = isFunky ? "oklch(var(--secondary))" : "oklch(var(--primary))";
  const ctaBg = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const ctaFg = isFunky ? "oklch(0.98 0 0)" : "oklch(var(--primary-foreground))";
  const accentColor = isFunky ? "oklch(var(--lime))" : "oklch(0.48 0.2 273)";
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected to backend");
      const origin = window.location.origin;
      const successUrl = `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/checkout`;
      const shoppingItems = items.map((item) => ({
        productName: item.name,
        productDescription: [item.variantSize, item.variantColor].filter(Boolean).join(", ") || item.name,
        currency: "usd",
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(item.price)
      }));
      const sessionUrl = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl
      );
      return sessionUrl;
    },
    onSuccess: (sessionUrl) => {
      sessionStorage.setItem("checkout_shipping", JSON.stringify(form));
      sessionStorage.setItem("checkout_items", JSON.stringify(items));
      sessionStorage.setItem("checkout_total_cents", String(totalCents));
      window.location.href = sessionUrl;
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setPaymentError(msg);
      ue.error("Payment setup failed. Please try again.");
    }
  });
  const directOrderMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected to backend");
      const orderItems = items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: BigInt(item.quantity),
        priceInCents: BigInt(item.price),
        variantSize: item.variantSize,
        variantColor: item.variantColor
      }));
      const orderId = await actor.placeOrder(
        orderItems,
        BigInt(totalCents),
        form,
        null
      );
      return orderId;
    },
    onSuccess: (orderId) => {
      clearCart();
      sessionStorage.removeItem("checkout_shipping");
      sessionStorage.removeItem("checkout_items");
      sessionStorage.removeItem("checkout_total_cents");
      navigate({ to: "/order-confirmation", search: { orderId } });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Order failed. Please try again.";
      setPaymentError(msg);
      ue.error("Failed to place order. Please try again.");
    }
  });
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const isFormValid = form.name.trim() && form.line1.trim() && form.city.trim() && form.state.trim() && form.postalCode.trim() && form.country.trim();
  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentError(null);
    if (!isFormValid) return;
    checkoutMutation.mutate();
  };
  const isPending = checkoutMutation.isPending || directOrderMutation.isPending;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "checkout.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "font-display text-2xl font-bold uppercase mb-4",
          style: { color: "oklch(var(--muted-foreground))" },
          children: "Your cart is empty"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "font-body text-sm mb-6",
          style: { color: "oklch(var(--muted-foreground))" },
          children: "Add some bold pieces before checking out."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "checkout.browse_button",
          className: "font-body font-bold uppercase tracking-widest",
          style: { backgroundColor: ctaBg, color: ctaFg },
          children: "Browse Products"
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "grid md:grid-cols-5 gap-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "font-display font-bold uppercase tracking-widest text-xs mb-1",
            style: { color: "oklch(var(--muted-foreground))" },
            children: "Shipping Details"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-0.5 rounded-full",
            style: { backgroundColor: accentColor, width: "48px" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "name",
            className: "font-body text-xs uppercase tracking-widest",
            style: { color: "oklch(var(--foreground))" },
            children: FIELD_LABELS.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "name",
            "data-ocid": "checkout.name_input",
            required: true,
            value: form.name,
            onChange: handleChange("name"),
            placeholder: FIELD_PLACEHOLDERS.name
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "line1",
            className: "font-body text-xs uppercase tracking-widest",
            style: { color: "oklch(var(--foreground))" },
            children: FIELD_LABELS.line1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "line1",
            "data-ocid": "checkout.line1_input",
            required: true,
            value: form.line1,
            onChange: handleChange("line1"),
            placeholder: FIELD_PLACEHOLDERS.line1
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "line2",
            className: "font-body text-xs uppercase tracking-widest",
            style: { color: "oklch(var(--foreground))" },
            children: FIELD_LABELS.line2
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "line2",
            "data-ocid": "checkout.line2_input",
            value: form.line2 ?? "",
            onChange: handleChange("line2"),
            placeholder: FIELD_PLACEHOLDERS.line2
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "city",
              className: "font-body text-xs uppercase tracking-widest",
              style: { color: "oklch(var(--foreground))" },
              children: FIELD_LABELS.city
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "city",
              "data-ocid": "checkout.city_input",
              required: true,
              value: form.city,
              onChange: handleChange("city"),
              placeholder: FIELD_PLACEHOLDERS.city
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "state",
              className: "font-body text-xs uppercase tracking-widest",
              style: { color: "oklch(var(--foreground))" },
              children: FIELD_LABELS.state
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "state",
              "data-ocid": "checkout.state_input",
              required: true,
              value: form.state,
              onChange: handleChange("state"),
              placeholder: FIELD_PLACEHOLDERS.state
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "postalCode",
              className: "font-body text-xs uppercase tracking-widest",
              style: { color: "oklch(var(--foreground))" },
              children: FIELD_LABELS.postalCode
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "postalCode",
              "data-ocid": "checkout.postal_code_input",
              required: true,
              value: form.postalCode,
              onChange: handleChange("postalCode"),
              placeholder: FIELD_PLACEHOLDERS.postalCode
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "country",
              className: "font-body text-xs uppercase tracking-widest",
              style: { color: "oklch(var(--foreground))" },
              children: FIELD_LABELS.country
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "country",
              "data-ocid": "checkout.country_input",
              required: true,
              value: form.country,
              onChange: handleChange("country"),
              placeholder: FIELD_PLACEHOLDERS.country
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-3 rounded-md",
          style: { backgroundColor: "oklch(var(--muted))" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: "sameAsBilling",
                "data-ocid": "checkout.billing_same_checkbox",
                checked: sameAsBilling,
                onCheckedChange: (v) => setSameAsBilling(v === true)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "sameAsBilling",
                className: "font-body text-sm cursor-pointer",
                style: { color: "oklch(var(--foreground))" },
                children: "Billing address same as shipping"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "font-display font-bold uppercase tracking-widest text-xs mb-1",
            style: { color: "oklch(var(--muted-foreground))" },
            children: "Payment"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-0.5 rounded-full mb-4",
            style: { backgroundColor: accentColor, width: "48px" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg p-4 text-center",
            style: {
              backgroundColor: "oklch(var(--muted))",
              border: "1px solid oklch(var(--border))"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm mb-1",
                  style: { color: "oklch(var(--foreground))" },
                  children: "🔒 Secure Payment via Stripe"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-xs",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: "You'll be redirected to Stripe's secure checkout to enter your card details. We never store payment information."
                }
              )
            ]
          }
        )
      ] }),
      paymentError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start gap-3 p-4 rounded-lg",
          "data-ocid": "checkout.error_state",
          style: {
            backgroundColor: "oklch(var(--destructive) / 0.1)",
            border: "1px solid oklch(var(--destructive) / 0.3)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleAlert,
              {
                size: 16,
                style: {
                  color: "oklch(var(--destructive))",
                  flexShrink: 0,
                  marginTop: "2px"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm font-semibold",
                  style: { color: "oklch(var(--destructive))" },
                  children: "Payment Error"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-xs mt-0.5",
                  style: { color: "oklch(var(--destructive))" },
                  children: paymentError
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-brand p-6 sticky top-24",
        "data-ocid": "checkout.summary_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display font-bold uppercase tracking-widest text-xs mb-4",
              style: { color: "oklch(var(--muted-foreground))" },
              children: "Order Summary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-3 items-start",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded overflow-hidden flex-shrink-0",
                    style: { backgroundColor: "oklch(var(--muted))" },
                    children: item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.imageUrl,
                        alt: item.name,
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full pattern-block-print" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body text-xs font-semibold truncate",
                      style: { color: "oklch(var(--foreground))" },
                      children: item.name
                    }
                  ),
                  (item.variantSize || item.variantColor) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body text-xs",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: [item.variantSize, item.variantColor].filter(Boolean).join(" · ")
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-body text-xs",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: [
                        "Qty: ",
                        item.quantity
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "font-body text-xs font-semibold flex-shrink-0",
                    style: { color: "oklch(var(--foreground))" },
                    children: [
                      "$",
                      (item.price * item.quantity / 100).toFixed(2)
                    ]
                  }
                )
              ]
            },
            `${item.productId}__${item.variantSize ?? ""}__${item.variantColor ?? ""}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between font-body text-sm",
                style: { color: "oklch(var(--foreground))" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "$",
                    (subtotalCents / 100).toFixed(2)
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between font-body text-sm",
                style: { color: "oklch(var(--muted-foreground))" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Est. Tax (10%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "$",
                    (taxCents / 100).toFixed(2)
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between font-display font-bold text-xl pt-1",
                style: { color: "oklch(var(--foreground))" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: priceColor }, children: [
                    "$",
                    (totalCents / 100).toFixed(2)
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              "data-ocid": "checkout.place_order_button",
              disabled: isPending || !isFormValid,
              className: "w-full font-body font-bold uppercase tracking-widest text-sm h-12",
              style: {
                backgroundColor: isPending || !isFormValid ? "oklch(var(--muted))" : ctaBg,
                color: isPending || !isFormValid ? "oklch(var(--muted-foreground))" : ctaFg
              },
              children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
                "Processing…"
              ] }) : "Pay with Stripe →"
            }
          ),
          !isFormValid && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-center text-xs mt-2 font-body",
              style: { color: "oklch(var(--muted-foreground))" },
              children: "Please complete all required fields above"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-center text-xs mt-3 font-body",
              style: { color: "oklch(var(--muted-foreground))" },
              children: "🔒 256-bit SSL encrypted · Cancel anytime"
            }
          )
        ]
      }
    ) })
  ] });
}
function Checkout() {
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const accentColor = isFunky ? "oklch(var(--lime))" : "oklch(0.48 0.2 273)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { backgroundColor: "oklch(var(--background))" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-10 text-center",
            style: { backgroundColor: "oklch(var(--card))" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "heading-brand text-4xl md:text-5xl",
                  style: { color: accentColor },
                  children: "CHECKOUT"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-body text-sm mt-2",
                  style: { color: "oklch(var(--muted-foreground))" },
                  children: "Secure · Fast · Worldwide Shipping"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-5xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutPageInner, {}) })
      ]
    }
  );
}
export {
  Checkout as default
};

import { c as createLucideIcon, r as reactExports, l as useControllableState, j as jsxRuntimeExports, k as useId, q as Presence, P as Primitive, p as composeEventHandlers, s as Portal$1, n as useComposedRefs, M as hideOthers, O as createContext2, w as createContextScope, Q as ReactRemoveScroll, T as useFocusGuards, U as FocusScope, D as DismissableLayer, V as createSlot, x as createSlottable, y as cn, W as buttonVariants, X as useDirection, Y as Root$1, _ as Item, $ as createRovingFocusGroupScope, e as useAuth, N as Navigate, I as Input, B as Button, i as ue, a0 as OrderStatus, F as Label, h as Badge, u as useBackend, a1 as useQueryClient, a as useThemeStore, b as useQuery, a2 as Settings, S as ShoppingBag } from "./index-vtaZNhFN.js";
import { C as Check, u as useMutation } from "./check-vOUOIPdC.js";
import { R as RefreshCw } from "./refresh-cw-DuGgTKyw.js";
import { S as Skeleton } from "./skeleton-CpEEvU_U.js";
import { X } from "./x-DRuYu-8y.js";
import { P as Plus } from "./plus-AIFiaiMi.js";
import { T as Trash2 } from "./trash-2-Bm2nxum4.js";
import { P as Package } from "./package-CtzEFHWd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME$2 = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME$2, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME$2;
var PORTAL_NAME$1 = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME$1, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME$1, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME$1;
var OVERLAY_NAME$1 = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME$1, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME$1, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME$1;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME$1, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME$2 = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$2, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME$2;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$2, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning$1, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME$1 = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME$1, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME$1;
var DESCRIPTION_NAME$1 = "DialogDescription";
var DialogDescription = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME$1, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME$1;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME$2,
  titleName: TITLE_NAME$1,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning$1 = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Trigger$1 = DialogTrigger;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content$1 = DialogContent$1;
var Title = DialogTitle$1;
var Description = DialogDescription;
var Close = DialogClose;
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME$1 = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger$1, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME$1;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME$1 = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME$1);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME$1,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content$1,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME$1;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME$1}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME$1}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME$1}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2$1 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root$1,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, isInitializing } = useAuth();
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-[60vh]",
        "data-ocid": "admin.loading_state",
        style: { color: "oklch(var(--muted-foreground))" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3",
              style: { borderColor: "oklch(var(--primary))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm", children: "Verifying access…" })
        ] })
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-[60vh]",
        "data-ocid": "admin.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display text-6xl font-black mb-4",
              style: { color: "oklch(var(--destructive))" },
              children: "403"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display text-2xl font-bold uppercase tracking-tight mb-2",
              style: { color: "oklch(var(--foreground))" },
              children: "Admin Only"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-sm",
              style: { color: "oklch(var(--muted-foreground))" },
              children: "You don't have permission to access this area."
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function StockRow({
  product,
  index,
  isFunky,
  onUpdateStock
}) {
  const [editing, setEditing] = reactExports.useState(false);
  const [value, setValue] = reactExports.useState(String(Number(product.stockQuantity)));
  const [saving, setSaving] = reactExports.useState(false);
  const isLow = Number(product.stockQuantity) <= 5;
  const handleSave = async () => {
    const qty = Number.parseInt(value, 10);
    if (Number.isNaN(qty) || qty < 0) {
      ue.error("Invalid quantity");
      return;
    }
    setSaving(true);
    try {
      await onUpdateStock(product.id, BigInt(qty));
      setEditing(false);
      ue.success("Stock updated");
    } catch {
      ue.error("Failed to update stock");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-4 px-4 py-3 transition-smooth",
      "data-ocid": `admin.inventory.item.${index + 1}`,
      style: {
        borderBottom: index % 2 === 0 ? isFunky ? "1px solid oklch(var(--lime) / 0.08)" : "1px solid oklch(var(--border))" : "none",
        backgroundColor: index % 2 === 0 ? "oklch(var(--card))" : isFunky ? "oklch(var(--lime) / 0.03)" : "oklch(var(--muted) / 0.3)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display font-bold uppercase text-sm truncate",
              style: {
                color: isFunky ? "oklch(var(--lime))" : "oklch(var(--foreground))"
              },
              children: product.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-xs",
              style: { color: "oklch(var(--muted-foreground))" },
              children: product.category
            }
          )
        ] }),
        isLow && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold",
            style: {
              backgroundColor: "oklch(var(--destructive) / 0.12)",
              color: "oklch(var(--destructive))",
              border: "1px solid oklch(var(--destructive) / 0.3)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
              "LOW"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              value,
              onChange: (e) => setValue(e.target.value),
              className: "w-20 h-7 text-center font-mono text-sm",
              "data-ocid": `admin.inventory_stock_input.${index + 1}`,
              autoFocus: true,
              onKeyDown: (e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setEditing(false);
                  setValue(String(Number(product.stockQuantity)));
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "icon",
              className: "h-7 w-7",
              disabled: saving,
              onClick: handleSave,
              "aria-label": "Save stock",
              "data-ocid": `admin.inventory_save.${index + 1}`,
              style: {
                backgroundColor: isFunky ? "oklch(var(--lime))" : "oklch(var(--primary))",
                color: isFunky ? "oklch(0.05 0 0)" : "oklch(var(--primary-foreground))",
                border: "none"
              },
              children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-mono font-bold text-sm w-16 text-right",
              style: {
                color: isLow ? "oklch(var(--destructive))" : isFunky ? "oklch(var(--hotpink))" : "oklch(var(--foreground))"
              },
              children: [
                Number(product.stockQuantity),
                " units"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 transition-smooth",
              onClick: () => {
                setValue(String(Number(product.stockQuantity)));
                setEditing(true);
              },
              "aria-label": "Edit stock",
              "data-ocid": `admin.inventory_edit.${index + 1}`,
              style: { color: "oklch(var(--muted-foreground))" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 12 })
            }
          )
        ] }) })
      ]
    }
  );
}
function AdminInventoryTab({
  products,
  lowStock,
  isFunky,
  onUpdateStock
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "h2",
      {
        className: "font-display font-bold uppercase tracking-wide text-sm mb-4",
        style: { color: "oklch(var(--foreground))" },
        children: [
          "Inventory Overview (",
          products.length,
          " products)"
        ]
      }
    ),
    lowStock.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mb-6 p-4 rounded-xl flex items-start gap-3",
        style: {
          backgroundColor: "oklch(var(--destructive) / 0.08)",
          border: "1px solid oklch(var(--destructive) / 0.3)",
          boxShadow: isFunky ? "0 0 16px oklch(var(--destructive) / 0.15)" : "none"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              size: 16,
              className: "mt-0.5 flex-shrink-0",
              style: { color: "oklch(var(--destructive))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "font-display font-bold text-sm uppercase tracking-wide",
                style: { color: "oklch(var(--destructive))" },
                children: [
                  lowStock.length,
                  " item",
                  lowStock.length > 1 ? "s" : "",
                  " critically low on stock"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-xs mt-0.5 line-clamp-2",
                style: { color: "oklch(var(--muted-foreground))" },
                children: lowStock.map((p) => p.name).join(" · ")
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl overflow-hidden",
        style: {
          border: isFunky ? "2px solid oklch(var(--neonblue) / 0.4)" : "1px solid oklch(var(--border))",
          boxShadow: isFunky ? "0 0 20px oklch(var(--neonblue) / 0.12)" : "none"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center px-4 py-3 text-xs font-body uppercase tracking-widest",
              style: {
                backgroundColor: isFunky ? "oklch(var(--neonblue) / 0.10)" : "oklch(var(--muted))",
                color: isFunky ? "oklch(var(--neonblue))" : "oklch(var(--muted-foreground))",
                borderBottom: isFunky ? "1px solid oklch(var(--neonblue) / 0.25)" : "1px solid oklch(var(--border))"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Product" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-20", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Stock · Edit" })
              ]
            }
          ),
          products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            StockRow,
            {
              product,
              index: i,
              isFunky,
              onUpdateStock
            },
            product.id
          )),
          products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center py-12",
              style: { color: "oklch(var(--muted-foreground))" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm", children: "No inventory data" })
            }
          )
        ]
      }
    )
  ] });
}
const STATUS_LABELS = {
  [OrderStatus.pending]: "Pending",
  [OrderStatus.shipped]: "Shipped",
  [OrderStatus.delivered]: "Delivered",
  [OrderStatus.cancelled]: "Cancelled"
};
const STATUS_COLORS = {
  [OrderStatus.pending]: {
    bg: "oklch(0.76 0.18 72 / 0.12)",
    fg: "oklch(0.62 0.18 72)",
    funkyBg: "oklch(var(--lime) / 0.12)",
    funkyFg: "oklch(var(--lime))"
  },
  [OrderStatus.shipped]: {
    bg: "oklch(0.48 0.2 273 / 0.12)",
    fg: "oklch(0.48 0.2 273)",
    funkyBg: "oklch(var(--neonblue) / 0.12)",
    funkyFg: "oklch(var(--neonblue))"
  },
  [OrderStatus.delivered]: {
    bg: "oklch(0.55 0.2 165 / 0.12)",
    fg: "oklch(0.55 0.2 165)",
    funkyBg: "oklch(0.65 0.28 165 / 0.15)",
    funkyFg: "oklch(0.72 0.25 165)"
  },
  [OrderStatus.cancelled]: {
    bg: "oklch(var(--destructive) / 0.12)",
    fg: "oklch(var(--destructive))",
    funkyBg: "oklch(var(--hotpink) / 0.12)",
    funkyFg: "oklch(var(--hotpink))"
  }
};
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatPrincipal(principal) {
  const s = principal.toString();
  if (s.length <= 10) return s;
  return `${s.slice(0, 6)}…${s.slice(-4)}`;
}
function AdminOrdersTab({
  orders,
  isLoading,
  isFunky,
  onUpdateStatus
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, i)
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "h2",
      {
        className: "font-display font-bold uppercase tracking-wide text-sm mb-4",
        style: { color: "oklch(var(--foreground))" },
        children: [
          "All Orders (",
          orders.length,
          ")"
        ]
      }
    ),
    orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16", "data-ocid": "admin.orders_empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "font-display text-lg font-bold uppercase",
        style: { color: "oklch(var(--muted-foreground))" },
        children: "No orders yet"
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl overflow-hidden",
        style: {
          border: isFunky ? "2px solid oklch(var(--lime) / 0.4)" : "1px solid oklch(var(--border))",
          boxShadow: isFunky ? "0 0 20px oklch(var(--lime) / 0.10)" : "none"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "hidden md:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 py-3 text-xs font-body uppercase tracking-widest",
              style: {
                backgroundColor: isFunky ? "oklch(var(--lime) / 0.08)" : "oklch(var(--muted))",
                color: isFunky ? "oklch(var(--lime))" : "oklch(var(--muted-foreground))",
                borderBottom: isFunky ? "1px solid oklch(var(--lime) / 0.2)" : "1px solid oklch(var(--border))"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Order ID · Customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", children: "Items" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-24 text-right", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-32 text-center", children: "Status" })
              ]
            }
          ),
          orders.map((order, i) => {
            const sc = STATUS_COLORS[order.status] ?? STATUS_COLORS[OrderStatus.pending];
            const badgeBg = isFunky ? sc.funkyBg : sc.bg;
            const badgeFg = isFunky ? sc.funkyFg : sc.fg;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col md:grid md:grid-cols-[1fr_auto_auto_auto_auto] gap-3 md:gap-4 items-start md:items-center px-4 py-4 transition-smooth",
                "data-ocid": `admin.order.item.${i + 1}`,
                style: {
                  borderBottom: i < orders.length - 1 ? isFunky ? "1px solid oklch(var(--lime) / 0.06)" : "1px solid oklch(var(--border))" : "none",
                  backgroundColor: i % 2 === 0 ? "oklch(var(--card))" : isFunky ? "oklch(var(--lime) / 0.02)" : "oklch(var(--muted) / 0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-mono text-xs",
                        style: { color: "oklch(var(--muted-foreground))" },
                        children: [
                          "#",
                          order.id.substring(0, 12),
                          "…"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display font-bold text-xs uppercase mt-0.5 truncate",
                        style: {
                          color: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--foreground))"
                        },
                        children: formatPrincipal(order.userId)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "w-20 text-center font-mono text-sm font-bold",
                      style: { color: "oklch(var(--foreground))" },
                      children: [
                        order.items.length,
                        " item",
                        order.items.length !== 1 ? "s" : ""
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "w-24 text-right font-mono font-bold text-sm",
                      style: {
                        color: isFunky ? "oklch(var(--lime))" : "oklch(var(--foreground))"
                      },
                      children: [
                        "$",
                        (Number(order.totalInCents) / 100).toFixed(2)
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-20 text-center font-body text-xs",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: formatDate(order.createdAt)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      "data-ocid": `admin.order_status.${i + 1}`,
                      value: order.status,
                      onChange: (e) => onUpdateStatus(order.id, e.target.value),
                      className: "appearance-none font-body text-xs px-3 py-1.5 rounded-full cursor-pointer pr-6 font-semibold uppercase tracking-wider",
                      style: {
                        backgroundColor: badgeBg,
                        color: badgeFg,
                        border: `1px solid ${badgeFg}40`,
                        outline: "none"
                      },
                      children: Object.values(OrderStatus).map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "option",
                        {
                          value: status,
                          style: {
                            backgroundColor: "oklch(var(--card))",
                            color: "oklch(var(--foreground))"
                          },
                          children: STATUS_LABELS[status]
                        },
                        status
                      ))
                    }
                  ) }) })
                ]
              },
              order.id
            );
          })
        ]
      }
    )
  ] });
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content$1,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function AdminProductDialog({
  open,
  onOpenChange,
  editingProduct,
  formData,
  onChange,
  onSubmit,
  isPending,
  isFunky
}) {
  const accentColor = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const accentFg = isFunky ? "oklch(0.05 0 0)" : "oklch(var(--primary-foreground))";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg max-h-[90vh] overflow-y-auto",
      "data-ocid": "admin.product_dialog",
      style: {
        border: isFunky ? "2px solid oklch(var(--hotpink) / 0.5)" : void 0,
        boxShadow: isFunky ? "0 0 40px oklch(var(--hotpink) / 0.2)" : void 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DialogTitle,
          {
            className: "font-display font-bold uppercase tracking-wide",
            style: {
              color: isFunky ? "oklch(var(--lime))" : "oklch(var(--foreground))"
            },
            children: editingProduct ? "Edit Product" : "Add New Product"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-xs uppercase tracking-widest", children: "Product Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "admin.product_name_input",
                required: true,
                value: formData.name,
                onChange: (e) => onChange({ ...formData, name: e.target.value }),
                placeholder: "Neon Riot Jacket"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-xs uppercase tracking-widest", children: "Description *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                "data-ocid": "admin.product_description_input",
                required: true,
                value: formData.description,
                onChange: (e) => onChange({ ...formData, description: e.target.value }),
                placeholder: "Product description…",
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-xs uppercase tracking-widest", children: "Category *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "admin.product_category_input",
                  required: true,
                  value: formData.category,
                  onChange: (e) => onChange({ ...formData, category: e.target.value }),
                  placeholder: "Apparel"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-xs uppercase tracking-widest", children: "Price (cents) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "admin.product_price_input",
                  type: "number",
                  required: true,
                  min: 0,
                  value: Number(formData.price),
                  onChange: (e) => onChange({ ...formData, price: BigInt(e.target.value || 0) }),
                  placeholder: "9900"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-xs uppercase tracking-widest", children: "Stock Quantity *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "admin.product_stock_input",
                type: "number",
                required: true,
                min: 0,
                value: Number(formData.stockQuantity),
                onChange: (e) => onChange({
                  ...formData,
                  stockQuantity: BigInt(e.target.value || 0)
                }),
                placeholder: "50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-body text-xs uppercase tracking-widest", children: "Image URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "admin.product_image_input",
                value: formData.imageUrl,
                onChange: (e) => onChange({ ...formData, imageUrl: e.target.value }),
                placeholder: "https://…"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                "data-ocid": "admin.product_dialog_cancel",
                onClick: () => onOpenChange(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                "data-ocid": "admin.product_dialog_submit",
                disabled: isPending,
                style: {
                  backgroundColor: accentColor,
                  color: accentFg,
                  border: "none"
                },
                children: isPending ? "Saving…" : editingProduct ? "Save Changes" : "Add Product"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function AdminProductsTab({
  products,
  isLoading,
  isFunky,
  onAdd,
  onEdit,
  onDelete
}) {
  const accentColor = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  const accentFg = isFunky ? "oklch(0.05 0 0)" : "oklch(var(--primary-foreground))";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          className: "font-display font-bold uppercase tracking-wide text-sm",
          style: { color: "oklch(var(--foreground))" },
          children: [
            "All Products (",
            products.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "admin.add_product_button",
          onClick: onAdd,
          size: "sm",
          className: "gap-2 font-body font-bold uppercase tracking-widest text-xs transition-smooth",
          style: {
            backgroundColor: accentColor,
            color: accentFg,
            border: "none"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
            " Add Product"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, i)
    )) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16",
        "data-ocid": "admin.products_empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display text-lg font-bold uppercase",
              style: { color: "oklch(var(--muted-foreground))" },
              children: "No products yet"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onAdd, className: "mt-4", size: "sm", children: "Add your first product" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl overflow-hidden",
        style: {
          border: isFunky ? "2px solid oklch(var(--hotpink) / 0.5)" : "1px solid oklch(var(--border))",
          boxShadow: isFunky ? "0 0 24px oklch(var(--hotpink) / 0.15)" : "none"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 px-4 py-3 text-xs font-body uppercase tracking-widest",
              style: {
                backgroundColor: isFunky ? "oklch(var(--hotpink) / 0.12)" : "oklch(var(--muted))",
                color: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--muted-foreground))",
                borderBottom: isFunky ? "1px solid oklch(var(--hotpink) / 0.3)" : "1px solid oklch(var(--border))"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10", children: "Img" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-right", children: "Price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-14 text-right", children: "Stock" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-center", children: "Actions" })
              ]
            }
          ),
          products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-3 items-center px-4 py-3 transition-smooth",
              "data-ocid": `admin.product.item.${i + 1}`,
              style: {
                borderBottom: i < products.length - 1 ? isFunky ? "1px solid oklch(var(--lime) / 0.08)" : "1px solid oklch(var(--border))" : "none",
                backgroundColor: i % 2 === 0 ? "oklch(var(--card))" : isFunky ? "oklch(var(--lime) / 0.03)" : "oklch(var(--muted) / 0.3)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded flex-shrink-0 overflow-hidden",
                    style: {
                      border: isFunky ? "1px solid oklch(var(--neonblue) / 0.3)" : "1px solid oklch(var(--border))"
                    },
                    children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: product.imageUrl,
                        alt: product.name,
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full pattern-block-print" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-display font-bold uppercase text-sm leading-tight truncate min-w-0",
                    style: {
                      color: isFunky ? "oklch(var(--lime))" : "oklch(var(--foreground))"
                    },
                    children: product.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "text-xs border-0 truncate max-w-full",
                    style: {
                      backgroundColor: isFunky ? "oklch(var(--neonblue) / 0.15)" : "oklch(var(--muted))",
                      color: isFunky ? "oklch(var(--neonblue))" : "oklch(var(--muted-foreground))"
                    },
                    children: product.category
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "w-16 text-right font-mono text-sm font-bold",
                    style: {
                      color: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--foreground))"
                    },
                    children: [
                      "$",
                      (Number(product.price) / 100).toFixed(0)
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "w-14 text-right font-mono text-sm font-bold",
                    style: {
                      color: Number(product.stockQuantity) <= 5 ? "oklch(var(--destructive))" : isFunky ? "oklch(var(--lime))" : "oklch(var(--foreground))"
                    },
                    children: Number(product.stockQuantity)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-16 flex gap-1 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      "data-ocid": `admin.edit_product.${i + 1}`,
                      onClick: () => onEdit(product),
                      "aria-label": "Edit product",
                      className: "h-7 w-7 transition-smooth",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 13 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      "data-ocid": `admin.delete_product.${i + 1}`,
                      onClick: () => onDelete(product.id),
                      "aria-label": "Delete product",
                      className: "h-7 w-7 transition-smooth",
                      style: { color: "oklch(var(--destructive))" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                    }
                  )
                ] })
              ]
            },
            product.id
          ))
        ]
      }
    )
  ] });
}
const EMPTY_PRODUCT = {
  id: "",
  name: "",
  description: "",
  category: "Apparel",
  imageUrl: "",
  price: BigInt(0),
  stockQuantity: BigInt(0),
  variants: []
};
function MandalaDecoration({ isFunky }) {
  const color1 = isFunky ? "oklch(var(--lime) / 0.18)" : "oklch(var(--secondary) / 0.15)";
  const color2 = isFunky ? "oklch(var(--hotpink) / 0.12)" : "oklch(var(--primary) / 0.08)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "120",
      height: "120",
      viewBox: "0 0 120 120",
      "aria-hidden": "true",
      className: "absolute right-8 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none select-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Decorative mandala motif" }),
        [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "60",
            cy: "30",
            rx: "4",
            ry: "16",
            fill: color1,
            transform: `rotate(${angle} 60 60)`
          },
          angle
        )),
        [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ellipse",
          {
            cx: "60",
            cy: "42",
            rx: "2.5",
            ry: "10",
            fill: color2,
            transform: `rotate(${angle} 60 60)`
          },
          angle
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "60", r: "8", fill: color1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "60", cy: "60", r: "4", fill: color2 })
      ]
    }
  );
}
function BlockPrintBorder({ isFunky }) {
  const c1 = isFunky ? "oklch(var(--lime))" : "oklch(var(--secondary))";
  const c2 = isFunky ? "oklch(var(--hotpink))" : "oklch(var(--primary))";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-1.5 w-full",
      style: {
        background: `repeating-linear-gradient(
          90deg,
          ${c1} 0px, ${c1} 18px,
          ${c2} 18px, ${c2} 36px,
          transparent 36px, transparent 40px
        )`
      }
    }
  );
}
function StatCard({
  label,
  value,
  icon: Icon,
  alert,
  isFunky
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-brand p-4 transition-smooth",
      style: {
        border: alert && isFunky ? "1px solid oklch(var(--destructive) / 0.5)" : void 0,
        boxShadow: alert && isFunky ? "0 0 12px oklch(var(--destructive) / 0.2)" : void 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon,
            {
              size: 14,
              style: {
                color: alert ? "oklch(var(--destructive))" : isFunky ? "oklch(var(--lime))" : "oklch(var(--muted-foreground))"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-body text-xs uppercase tracking-widest",
              style: { color: "oklch(var(--muted-foreground))" },
              children: label
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "font-display text-3xl font-black leading-none",
            style: {
              color: alert ? "oklch(var(--destructive))" : isFunky ? "oklch(var(--lime))" : "oklch(var(--foreground))",
              textShadow: isFunky && !alert ? "0 0 16px oklch(var(--lime) / 0.4)" : isFunky && alert ? "0 0 16px oklch(var(--destructive) / 0.4)" : "none"
            },
            children: value
          }
        )
      ]
    }
  );
}
function AdminContent() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const mode = useThemeStore((s) => s.mode);
  const isFunky = mode === "funky";
  const [editingProduct, setEditingProduct] = reactExports.useState(null);
  const [isDialogOpen, setIsDialogOpen] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState(EMPTY_PRODUCT);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => actor ? actor.getProducts() : [],
    enabled: !!actor
  });
  const { data: lowStock = [] } = useQuery({
    queryKey: ["admin-low-stock"],
    queryFn: async () => actor ? actor.adminGetLowStockProducts() : [],
    enabled: !!actor
  });
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => actor ? actor.adminGetAllOrders() : [],
    enabled: !!actor
  });
  const addMutation = useMutation({
    mutationFn: async (product) => {
      if (!actor) throw new Error("No actor");
      await actor.adminAddProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDialogOpen(false);
      ue.success("Product added!");
    },
    onError: () => ue.error("Failed to add product")
  });
  const updateMutation = useMutation({
    mutationFn: async (product) => {
      if (!actor) throw new Error("No actor");
      await actor.adminUpdateProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsDialogOpen(false);
      ue.success("Product updated!");
    },
    onError: () => ue.error("Failed to update product")
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("No actor");
      return actor.adminDeleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeleteId(null);
      ue.success("Product deleted");
    },
    onError: () => ue.error("Failed to delete product")
  });
  const updateStockMutation = useMutation({
    mutationFn: async ({ id, quantity }) => {
      if (!actor) throw new Error("No actor");
      return actor.adminUpdateStock(id, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-low-stock"] });
    }
  });
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({
      orderId,
      status
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.adminUpdateOrderStatus(orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      ue.success("Order status updated");
    },
    onError: () => ue.error("Failed to update status")
  });
  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData(EMPTY_PRODUCT);
    setIsDialogOpen(true);
  };
  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const product = {
      ...formData,
      price: BigInt(Math.round(Number(formData.price))),
      stockQuantity: BigInt(Math.round(Number(formData.stockQuantity)))
    };
    if (editingProduct) {
      updateMutation.mutate(product);
    } else {
      addMutation.mutate({ ...product, id: crypto.randomUUID() });
    }
  };
  const pendingCount = orders.filter(
    (o) => o.status === OrderStatus.pending
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { backgroundColor: "oklch(var(--background))" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BlockPrintBorder, { isFunky }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative overflow-hidden py-10 px-4",
            style: {
              backgroundColor: "oklch(var(--card))",
              borderBottom: isFunky ? "2px solid oklch(var(--hotpink) / 0.3)" : "1px solid oklch(var(--border))"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MandalaDecoration, { isFunky }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Settings,
                    {
                      size: 20,
                      style: {
                        color: isFunky ? "oklch(var(--lime))" : "oklch(var(--primary))"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "heading-brand text-4xl md:text-5xl",
                      style: {
                        color: isFunky ? "oklch(var(--lime))" : "oklch(var(--indigo))",
                        textShadow: isFunky ? "0 0 20px oklch(var(--lime) / 0.4), 0 0 40px oklch(var(--lime) / 0.2)" : "none"
                      },
                      children: "Admin Panel"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-body text-sm mt-1 ml-8",
                    style: { color: "oklch(var(--muted-foreground))" },
                    children: "Manage products, inventory & orders"
                  }
                ),
                lowStock.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "ml-8 mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold",
                    style: {
                      backgroundColor: "oklch(var(--destructive) / 0.12)",
                      color: "oklch(var(--destructive))",
                      border: "1px solid oklch(var(--destructive) / 0.3)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11 }),
                      lowStock.length,
                      " low-stock alert",
                      lowStock.length > 1 ? "s" : ""
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Products",
                value: products.length,
                icon: ShoppingBag,
                isFunky
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Low Stock",
                value: lowStock.length,
                icon: TriangleAlert,
                alert: lowStock.length > 0,
                isFunky
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Orders",
                value: orders.length,
                icon: Package,
                isFunky
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Pending",
                value: pendingCount,
                icon: Package,
                alert: pendingCount > 0,
                isFunky
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "products", "data-ocid": "admin.tabs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TabsList,
              {
                className: "mb-6 gap-1",
                style: {
                  backgroundColor: "oklch(var(--muted))",
                  border: isFunky ? "1px solid oklch(var(--hotpink) / 0.25)" : void 0
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      value: "products",
                      "data-ocid": "admin.products_tab",
                      className: "font-body uppercase tracking-widest text-xs font-semibold",
                      children: "Products"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      value: "inventory",
                      "data-ocid": "admin.inventory_tab",
                      className: "font-body uppercase tracking-widest text-xs font-semibold",
                      children: "Inventory"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TabsTrigger,
                    {
                      value: "orders",
                      "data-ocid": "admin.orders_tab",
                      className: "font-body uppercase tracking-widest text-xs font-semibold",
                      children: "Orders"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AdminProductsTab,
              {
                products,
                isLoading: productsLoading,
                isFunky,
                onAdd: openAddDialog,
                onEdit: openEditDialog,
                onDelete: (id) => setDeleteId(id)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "inventory", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AdminInventoryTab,
              {
                products,
                lowStock,
                isFunky,
                onUpdateStock: async (id, quantity) => {
                  await updateStockMutation.mutateAsync({ id, quantity });
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AdminOrdersTab,
              {
                orders,
                isLoading: ordersLoading,
                isFunky,
                onUpdateStatus: (orderId, status) => updateOrderStatusMutation.mutate({ orderId, status })
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AdminProductDialog,
          {
            open: isDialogOpen,
            onOpenChange: setIsDialogOpen,
            editingProduct,
            formData,
            onChange: setFormData,
            onSubmit: handleFormSubmit,
            isPending: addMutation.isPending || updateMutation.isPending,
            isFunky
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteId, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "admin.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogTitle,
              {
                className: "font-display font-bold uppercase tracking-wide",
                style: {
                  color: isFunky ? "oklch(var(--hotpink))" : "oklch(var(--foreground))"
                },
                children: "Delete Product?"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogDescription,
              {
                className: "font-body text-sm",
                style: { color: "oklch(var(--muted-foreground))" },
                children: "This action is permanent and cannot be undone."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "admin.delete_cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                "data-ocid": "admin.delete_confirm_button",
                onClick: () => deleteId && deleteMutation.mutate(deleteId),
                disabled: deleteMutation.isPending,
                style: {
                  backgroundColor: "oklch(var(--destructive))",
                  color: "oklch(var(--destructive-foreground))",
                  border: "none"
                },
                children: deleteMutation.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function Admin() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminContent, {}) });
}
export {
  Admin as default
};

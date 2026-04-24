import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/Layout";
import { useBackend } from "./hooks/useBackend";
import BrandStory from "./pages/BrandStory";
import Home from "./pages/Home";
import Lookbook from "./pages/Lookbook";
import Newsletter from "./pages/Newsletter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";

// Lazy-loaded pages for code-splitting
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Admin = lazy(() => import("./pages/Admin"));

function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-[50vh]"
      style={{ color: "oklch(var(--muted-foreground))" }}
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "oklch(var(--primary))" }}
      />
    </div>
  );
}

function RoleSyncer() {
  const { actor, isFetching: actorFetching } = useBackend();
  const { isAuthenticated } = useInternetIdentity();
  const { setIsAdmin, reset } = useAuthStore();

  useQuery({
    queryKey: ["caller-role", isAuthenticated],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return false;
      const isAdmin = await actor.isCallerAdmin();
      setIsAdmin(isAdmin);
      return isAdmin;
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      reset();
    }
  }, [isAuthenticated, reset]);

  return null;
}

function RootLayout() {
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <Layout>
      <RoleSyncer />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

// Existing routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const brandStoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/brand-story",
  component: BrandStory,
});
const lookbookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lookbook",
  component: Lookbook,
});
const newsletterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/newsletter",
  component: Newsletter,
});

// New routes
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: Products,
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetail,
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: Checkout,
});
const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: OrderConfirmation,
});
const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: Wishlist,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  brandStoryRoute,
  lookbookRoute,
  newsletterRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  wishlistRoute,
  loginRoute,
  registerRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

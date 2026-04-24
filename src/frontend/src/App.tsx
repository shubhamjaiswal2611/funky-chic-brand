import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import Layout from "./components/Layout";
import BrandStory from "./pages/BrandStory";
import Home from "./pages/Home";
import Lookbook from "./pages/Lookbook";
import Newsletter from "./pages/Newsletter";
import { useThemeStore } from "./store/themeStore";

function RootLayout() {
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

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

const routeTree = rootRoute.addChildren([
  homeRoute,
  brandStoryRoute,
  lookbookRoute,
  newsletterRoute,
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

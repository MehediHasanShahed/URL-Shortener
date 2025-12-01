import "./App.css";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import UrlProvider from "./context";

import AppLayout from "./layouts/app-layout";
import RequireAuth from "./components/require-auth";

import RedirectLink from "./pages/redirect-link";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Link from "./pages/link";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
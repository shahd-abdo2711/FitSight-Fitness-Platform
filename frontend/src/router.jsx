import { createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/__root";
import { SignupPage } from "./routes/signup";
import { LoginPage } from "./routes/login";
import { OnboardingPage } from "./routes/onboarding";
import { ShellLayout } from "./routes/_shell";
import { ProfilePage } from "./routes/profile";

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/onboarding", element: <OnboardingPage /> },
      {
        element: <ShellLayout />,
        children: [
          { path: "/profile", element: <ProfilePage /> },
          // مؤقتاً لحد ما نعمل الصفحات الحقيقية
          { path: "/home", element: <div>Home — coming next</div> },
        ],
      },
      { path: "/", element: <div className="p-10">Landing — coming next</div> },
      { path: "*", element: <div className="p-10">Page not found</div> },
    ],
  },
]);
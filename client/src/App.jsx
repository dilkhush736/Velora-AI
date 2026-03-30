import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import FullPageLoader from "./components/FullPageLoader";
import { useAuth } from "./context/AuthContext";

const ChatPage = lazy(() => import("./pages/ChatPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));

const ProtectedRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <FullPageLoader label="Loading your workspace" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <FullPageLoader label="Preparing the app" />;
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return children;
};

export default function App() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<FullPageLoader label="Loading page" />}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/app" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

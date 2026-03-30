import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUserRequest,
  loginRequest,
  logoutRequest,
  signupRequest,
} from "../api/authApi";
import { authStorage } from "../api/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = authStorage.getToken();

      if (!token) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const response = await getCurrentUserRequest();
        setUser(response.user);
      } catch (error) {
        authStorage.setToken(null);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    const response = await loginRequest(credentials);
    authStorage.setToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const signup = async (details) => {
    const response = await signupRequest(details);
    authStorage.setToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const logout = async () => {
    try {
      if (authStorage.getToken()) {
        await logoutRequest();
      }
    } catch (error) {
      // Logout is still completed client-side because JWT auth is stateless here.
    } finally {
      authStorage.setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
};


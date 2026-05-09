import { createContext, useContext, useEffect, useMemo, useState } from "react";

import * as authService from "../services/authService.js";
import { getToken, isTokenExpired, removeToken, saveToken } from "../utils/tokenManager.js";
import { buildDeviceFingerprint } from "../utils/securityHelpers.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken());
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState(null);

  const restoreSession = async () => {
    const storedToken = getToken();
    if (!storedToken || isTokenExpired(storedToken)) {
      removeToken();
      setToken(null);
      setUser(null);
      setValidating(false);
      return;
    }

    const profile = await authService.getCurrentUser();
    if (profile.success) {
      setUser(profile.data);
      setToken(storedToken);
    } else {
      removeToken();
      setToken(null);
      setUser(null);
    }
    setValidating(false);
  };

  useEffect(() => {
    restoreSession();
  }, []);

  useEffect(() => {
    const handler = () => {
      removeToken();
      setToken(null);
      setUser(null);
    };
    window.addEventListener("spychat:auth-expired", handler);
    return () => window.removeEventListener("spychat:auth-expired", handler);
  }, []);

  const login = async (payload) => {
    setLoading(true);
    setError(null);
    const devicePayload = payload.trustDevice ? buildDeviceFingerprint() : {};
    const response = await authService.login({ ...payload, ...devicePayload });
    if (!response.success) {
      setError(response.error || "Login failed");
      setLoading(false);
      return response;
    }

    saveToken(response.data.access_token, response.data.refresh_token);
    setToken(response.data.access_token);

    const profile = await authService.getCurrentUser();
    if (profile.success) {
      setUser(profile.data);
    } else {
      setUser({ username: payload.username });
    }
    setLoading(false);
    return response;
  };

  const register = async (payload) => {
    setLoading(true);
    setError(null);
    const response = await authService.register(payload);
    if (!response.success) {
      setError(response.error || "Registration failed");
    }
    setLoading(false);
    return response;
  };

  const logout = async () => {
    if (token) {
      await authService.logout(token);
    }
    removeToken();
    setToken(null);
    setUser(null);
  };

  const validateSession = async () => {
    if (!token || isTokenExpired(token)) {
      await logout();
      return { success: false, data: null, error: "Session expired" };
    }
    return authService.validateSession();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      loading,
      error,
      validating,
      login,
      register,
      logout,
      restoreSession,
      validateSession,
    }),
    [user, token, loading, error, validating]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

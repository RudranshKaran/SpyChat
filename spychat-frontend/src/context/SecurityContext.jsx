import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SecurityContext = createContext(null);

export const SecurityProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (alert) => {
    setAlerts((prev) => [{ id: Date.now(), ...alert }, ...prev]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  useEffect(() => {
    const handler = () => {
      addAlert({
        title: "Session expired",
        detail: "Your secure session expired. Please authenticate again.",
        type: "Session",
      });
    };
    window.addEventListener("spychat:auth-expired", handler);
    return () => window.removeEventListener("spychat:auth-expired", handler);
  }, []);

  const value = useMemo(
    () => ({ alerts, addAlert, removeAlert, clearAlerts }),
    [alerts]
  );

  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>;
};

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error("useSecurityContext must be used within SecurityProvider");
  }
  return context;
};

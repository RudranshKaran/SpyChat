const STORAGE_KEY = "spychat_token";

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const saveToken = (token, refreshToken = null) => {
  const payload = { token, refreshToken };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const getToken = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  return parsed?.token || null;
};

export const getTokens = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? safeParse(raw) : null;
};

export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const decodeJWT = (token) => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = decodeJWT(token);
  if (!payload?.exp) return false;
  return Date.now() >= payload.exp * 1000;
};

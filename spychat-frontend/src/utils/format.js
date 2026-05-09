export const formatTime = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  return date.toLocaleDateString();
};

export const timeRemaining = (target) => {
  if (!target) return 0;
  const diff = new Date(target).getTime() - Date.now();
  return Math.max(diff, 0);
};

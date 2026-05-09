export const normalizeError = (error) => {
  if (error?.response) {
    const status = error.response.status;
    const detail = error.response.data?.detail || error.response.data?.message;
    return {
      status,
      message: detail || "Request failed",
    };
  }
  if (error?.code === "ECONNABORTED") {
    return { status: 408, message: "Request timeout" };
  }
  if (error?.message) {
    return { status: 0, message: error.message };
  }
  return { status: 0, message: "Network error" };
};

export const wrapRequest = async (promise) => {
  try {
    const response = await promise;
    return { success: true, data: response.data, error: null };
  } catch (error) {
    const normalized = normalizeError(error);
    return { success: false, data: null, error: normalized.message };
  }
};

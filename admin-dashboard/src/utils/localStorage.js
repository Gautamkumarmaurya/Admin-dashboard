// Get item from localStorage
export const getItem = (k, f = null) => {
  try {
    return (
      JSON.parse(localStorage.getItem(k)) ?? f
    );
  } catch {
    return f;
  }
};

// Set item in localStorage
export const setItem = (k, v) =>
  localStorage.setItem(
    k,
    JSON.stringify(v)
  );

// Remove item from localStorage
export const removeItem = (k) =>
  localStorage.removeItem(k);

// Clear all localStorage data
export const clearStorage = () =>
  localStorage.clear();
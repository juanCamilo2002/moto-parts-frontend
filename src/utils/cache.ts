
export const saveToCache = async (key: string, data: any) => {
  if (!("caches" in window)) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving to cache", err);
  }
};

export const loadFromCache = (key: string) => {
  if (!("caches" in window)) return null;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error loading cache", err);
    return null;
  }
};

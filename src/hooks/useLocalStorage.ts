import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const parseWithDates = <T>(obj: T): T => {
    if (
      typeof obj === "string" &&
      obj.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
    ) {
      return new Date(obj) as T;
    } else if (Array.isArray(obj)) {
      return obj.map((item) => parseWithDates(item)) as T;
    } else if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, parseWithDates(value)]),
      ) as T;
    }
    return obj;
  };

  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return initialValue;
    } else {
      return parseWithDates(JSON.parse(item)) as T;
    }
  });

  useEffect(() => {
    if (storedValue === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  return { storedValue, setStoredValue };
}

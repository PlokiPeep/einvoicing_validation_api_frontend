import { useState } from 'react';

// See https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
export const SyncUser = (defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      let value = window.localStorage.getItem('user');

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem('user', JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem('user', JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

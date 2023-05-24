import React, { createContext, useMemo, useState } from "react";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast({ text, variant }) {
    const newToast = {
      id: crypto.randomUUID(),
      message: text,
      variant,
    };
    setToasts((toasts) => [...toasts, newToast]);
  }

  const removeAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const removeToast = React.useCallback(
    (id) => {
      const newList = toasts.filter((toast) => toast.id !== id);
      setToasts(newList);
    },
    [toasts]
  );

  const value = useMemo(() => {
    return {
      toasts,
      addToast,
      removeToast,
      removeAllToasts,
    };
  }, [toasts, removeToast, removeAllToasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;

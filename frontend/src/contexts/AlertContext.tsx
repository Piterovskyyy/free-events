import React, { createContext, useContext, useState, ReactNode } from 'react';

type Alert = {
  id: number;
  message: string;
};

type AlertContextType = (message: string) => void;

const AlertContext = createContext<AlertContextType | undefined>(undefined);

type AlertProviderProps = {
  children: ReactNode;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alerts.map(alert => (
        <div key={alert.id} role="alert" className="alert fixed shadow-md bottom-5 z-30 right-5 w-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{alert.message}</span>
        </div>
      ))}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

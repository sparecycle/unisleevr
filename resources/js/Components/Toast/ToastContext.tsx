import { createContext, useContext } from 'react';

type toastTypeString = 'success' | 'error' | 'info' | 'warning';

type ToastContextType = {
    openToast: (msg: string, type: toastTypeString) => void;
    closeToast: (id: number) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
    undefined,
);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

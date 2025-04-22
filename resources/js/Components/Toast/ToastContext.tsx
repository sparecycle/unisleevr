import { createContext, useContext } from 'react';

type ToastContextType = {
    openToast: (msg: string) => void;
    closeToast: (id: number) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    console.log('ToastContext:', context);
    return context;
};
import { ToastContext } from '@/Components/Toast/ToastContext';
import { useMemo, useState } from 'react';

type ToastProps = {
    msg: string;
    close: () => void;
};

type ToastProviderPropertiesType = {
    children: React.ReactNode;
};

type ToastType = {
    id: number;
    msg: string;
};

export const Toast = ({ msg, close }: ToastProps) => {
    return (
        <div
            className="toast animate-slidein flex w-[150px] rounded bg-green-700 p-4 text-lg text-white"
            aria-atomic="true"
            aria-live="assertive"
            role="alert"
        >
            <p>{msg}</p>
            <button onClick={close}>X</button>
        </div>
    );
};

export const ToastProvider = ({ children }: ToastProviderPropertiesType) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const openToast = (msg: string) => {
        const newToast = {
            id: Date.now(),
            msg,
        };
        console.log('openToast', newToast.id);
        setToasts((toasts) => [...toasts, newToast]);
    };
    const closeToast = (id: number) => {
        console.log('closeToast', id);
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    };

    const contextValue = useMemo(() => ({ openToast, closeToast }), []);
    return (
        <>
            <ToastContext.Provider value={contextValue}>
                {children}
                <div className="toast-container fixed right-0 top-0 z-[9999] flex flex-col gap-2 p-4">
                    {toasts &&
                        toasts.map((toast) => (
                            <Toast
                                key={toast.id}
                                msg={toast.msg}
                                close={() => closeToast(toast.id)}
                            />
                        ))}
                </div>
            </ToastContext.Provider>
        </>
    );
};

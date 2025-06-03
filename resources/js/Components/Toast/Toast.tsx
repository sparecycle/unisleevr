import { ToastContext } from '@/Components/Toast/ToastContext';
import { useEffect, useMemo, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

type ToastProps = {
    msg: string | undefined;
    type: toastTypeString;
    close: () => void;
};

type ToastProviderPropertiesType = {
    children: React.ReactNode;
};

type ToastType = {
    id: number;
    msg: string | undefined;
    type: toastTypeString;
};

type toastTypeString = 'success' | 'error' | 'info' | 'warning';

export const Toast = ({ msg, type, close }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Slide into view on mount
        const slideInTimeout = setTimeout(() => setIsVisible(true), 0);

        // Slide out and unmount after 1 second
        const slideOutTimeout = setTimeout(() => {
            setIsVisible(false);
            setTimeout(close, 300); // Unmount after sliding out
        }, 2000);

        return () => {
            clearTimeout(slideInTimeout);
            clearTimeout(slideOutTimeout);
        };
    }, [close]);

    const toastBaseClass =
        'toast flex min-w-[200px] justify-between rounded-sm p-2 text-lg text-white transition-transform duration-200 ease-in-out';

    const toastTypeClass = {
        success: 'bg-green-700 border border-green-500',
        error: 'bg-red-700 border border-red-500',
        info: 'bg-zinc-400 dark:bg-zinc-800 border border-zinc-500',
        warning: 'bg-yellow-500 border border-yellow-700',
    }[type];

    return (
        <div
            className={`${toastBaseClass} ${toastTypeClass} ${
                isVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
            aria-atomic="true"
            aria-live="assertive"
            role="alert"
        >
            <p>{msg ?? type}</p>
            <button className="pl-2" onClick={close}>
                <IoIosClose />
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }: ToastProviderPropertiesType) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const openToast = (msg: string, type: toastTypeString) => {
        const newToast = {
            id: Date.now(),
            msg,
            type,
        };
        setToasts((toasts) => [...toasts, newToast]);
    };
    const closeToast = (id: number) => {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    };

    const contextValue = useMemo(() => ({ openToast, closeToast }), []);
    return (
        <>
            <ToastContext.Provider value={contextValue}>
                {children}
                <div className="toast-container fixed right-0 top-0 z-9999 flex flex-col gap-2 p-4 pt-8">
                    {toasts &&
                        toasts.map((toast) => (
                            <Toast
                                key={toast.id}
                                msg={toast.msg}
                                close={() => closeToast(toast.id)}
                                type={toast.type}
                            />
                        ))}
                </div>
            </ToastContext.Provider>
        </>
    );
};

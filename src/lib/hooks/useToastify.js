import { useTheme } from '@/redux/hooks/useTheme';
import { ToastContainer, toast } from 'react-toastify';

export function useToastify() {

    const { theme } = useTheme();

    const toastContainerOptions = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: theme,
    }

    return { ToastContainer: ToastContainer, toastContainerOptions: toastContainerOptions, toast: toast };
}
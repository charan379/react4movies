import { ToastContainer, toast } from "react-toastify";
import useTheme from "./useTheme";

const useToastify = () => {
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
};


export default useToastify;
// Componentes Terceiros
import { toast } from 'react-toastify';

export default function Toast(type, message){

    const params = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    switch (type) {
        case 'success':
            toast.success(message, params)
            break;
        case 'error':
            toast.error(message, params);
            break;
        case 'info':
            toast.info(message, params);
            break;
        default:
            break;
    }

}
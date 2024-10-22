import { toast } from "react-toastify";

export const notify = (msg: string, type: string): void => {
    const options = {
        position: toast.POSITION.TOP_RIGHT,
    };

    switch (type) {
        case "success":
            toast.success(msg, options);
            break;

        case "error":
            toast.error(msg, options);
            break;

        case "warning":
            toast.warning(msg, options);
            break;

        default:
            // Default to success for unknown types
            toast.success(msg, options);
            break;
    }
};
import toast from 'react-hot-toast';

export const hotToastMessage = (msg: string, type: string): void => {

    switch (type) {
        case "success":
            toast.success(msg);
            break;

        case "error":
            toast.error(msg);
            break;

        default:
            // Default to success for unknown types
            toast.success(msg);
            break;
    }
};
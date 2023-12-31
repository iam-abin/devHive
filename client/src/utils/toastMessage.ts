import { toast } from "react-toastify";

export const notify = (msg: any, type: string) => {
    type === "error"
        ? toast.error(msg, {
                position: toast.POSITION.TOP_RIGHT,
          })
        : toast.success(msg, {
                position: toast.POSITION.TOP_RIGHT,
          });
};
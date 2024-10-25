import Swal, { SweetAlertResult } from "sweetalert2";

export const swal = async (
    title: string,
    confirmButtonText: string,
    avoidOptions = false
) => {
    const response: SweetAlertResult = await Swal.fire({
        title,
        text: avoidOptions ? undefined : "Are you sure!",
        icon: avoidOptions ? undefined : "warning",
        showCancelButton: avoidOptions ? undefined : true,
        confirmButtonColor: avoidOptions ? undefined : "#3085d6",
        cancelButtonColor: avoidOptions ? undefined : "#d33",
        confirmButtonText,
    });

    return response;
};

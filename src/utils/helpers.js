import {useToast} from "vue-toastification";

export const notification = (text, type) => {

    const toast = useToast()
    const options = {
        position: "top-right",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
    }

    type === 'danger' ? toast.error(text, options) : toast.success(text, options)
}
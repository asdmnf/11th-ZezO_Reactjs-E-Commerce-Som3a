import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ToastifyNotification = () => {
  
  const notify = (type, msg) => {
    if(type === "error") {
      return toast.error(msg)
    } else if(type === "success"){
      return toast.success(msg)
    } else if(type === "warning"){
      return toast.warning(msg)
    } else if(type === "info"){
      return toast.info(msg)
    }
  }

  return [notify]

}

export default ToastifyNotification

// <ToastContainer autoClose={500} />
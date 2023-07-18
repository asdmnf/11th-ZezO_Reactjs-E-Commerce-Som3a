import { useNavigate } from "react-router-dom"
import ToastifyNotification from "./ToastifyNotification"



const HeaderHook = () => {
  

  const navigate = useNavigate()



  const searchInputOnChangeHandle = (e) => {
      navigate("/search-result")
      sessionStorage.setItem("search-value", e.target.value)
    }


    // خاص بتسجيل الخروج
    const [notify] = ToastifyNotification()
    const navigateTo = useNavigate()
    const logOutOnClickHandle = () =>{
      localStorage.removeItem("userData")
      localStorage.removeItem("token")
      localStorage.removeItem("userRole")
      notify( "success", "تم تسجيل الخروج بنجاح")
      setTimeout(() => {
        navigateTo("/")
      }, 1500);
    }

  return [searchInputOnChangeHandle, logOutOnClickHandle]
}

export default HeaderHook
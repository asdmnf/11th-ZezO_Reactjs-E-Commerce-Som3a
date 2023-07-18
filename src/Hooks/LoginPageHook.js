import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../Redux/Actions/AuthenticationAction/AuthenticationAction"
import { getAllCartItems } from "../Redux/Actions/CartAction/cartAction"
import ToastifyNotification from "./ToastifyNotification"
import { getAllWishList } from "../Redux/Actions/WishListAction/wishListAction"
import { getLoggedUserData2 } from "../Redux/Actions/LoggedUserDataAction2/LoggedUserDataAction2"
import { resetAnyData } from "../Redux/Actions/linkAction"


const LoginPageHook = () => {

  const [notify] = ToastifyNotification()

  const navigateTo = useNavigate()

  const emailInputElementRef = useRef()
  const passwordInputElementRef = useRef()

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const dispatch = useDispatch()
  const loginResponse = useSelector(state => state.loginReducer.loginResponse)
  const loginResponseIsLoaded = useSelector(state => state.loginReducer.isLoaded)
  const [isClicked, setIsClicked] = useState(false)

  const [loader, setloader] = useState(false)

  const emailInputOnChangeHandle = (e) => {
    setEmailInput(e.target.value)
  }
  const passwordInputOnChangeHandle = (e) => {
    setPasswordInput(e.target.value)
  }
  const formButtonOnClickHandle = async (e) => {
    e.preventDefault()
    if(!emailInput){
      emailInputElementRef.current.focus()
      notify( "warning", "ادخل الإيميل")
      return null;
    } else if(!passwordInput){
      passwordInputElementRef.current.focus()
      notify( "warning", "ادخل كلمة السر")
      return null;
    }
    const data ={
      email: emailInput,
      password: passwordInput,
    }
    setloader(true)
    await dispatch(loginUser(data, "LoginPageHook"))
    setloader(false)
    setIsClicked(true)
  }

  useEffect(() => {
    if (loginResponseIsLoaded && isClicked){
      if (loginResponse.status === 200){
        notify( "success", "تم تسجيل الدخول بنجاح")
        setEmailInput('')
        setPasswordInput('')
        localStorage.setItem("userData", JSON.stringify(loginResponse?.data?.data))
        localStorage.setItem("userRole", loginResponse?.data?.data?.role)
        localStorage.setItem("token", loginResponse?.data?.token)
        setTimeout(() => {
          navigateTo("/")
        }, 1500);
        if (localStorage.getItem("userRole") === "user") {
          dispatch(getAllCartItems("LoginPageHook"))
          dispatch(getAllWishList("LoginPageHook"))
        }
        dispatch(resetAnyData("LoginPageHook"))
      } else {

        if (loginResponse?.response?.data?.error?.statusMessage) {
          if (loginResponse?.response?.data?.error?.statusMessage === "deactivated account please call the admin to activate it again") {
            notify( "warning", "حساب غير مفعل تواصل مع الادمن لتفعيله مرة اخرى")
          }
          if (loginResponse?.response?.data?.error?.statusMessage === "incorrect email or password") {
            notify( "warning", "الايميل او الباسورد غير صحيح")
          }
        } else {
          loginResponse?.response?.data?.error.map(item => {
            if (item.msg === "email format is incorrect") {
              notify( "warning", "صيغة الايميل خطأ")
            }
            if (item.msg === "password must be at least 6 chars/symbols") {
              notify( "warning", "الباسورد يجب الا يقل عن 6 احرف")
            }
          })
        }
      }
    }
    setIsClicked(false)
    // eslint-disable-next-line
  }, [isClicked])

  return [emailInputElementRef, passwordInputElementRef, emailInput, passwordInput, emailInputOnChangeHandle, passwordInputOnChangeHandle, formButtonOnClickHandle, loader]
}

export default LoginPageHook
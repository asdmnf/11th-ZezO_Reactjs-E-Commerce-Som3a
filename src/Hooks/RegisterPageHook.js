import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../Redux/Actions/AuthenticationAction/AuthenticationAction"
import ToastifyNotification from "./ToastifyNotification"



const RegisterPageHook = () => {

  const [notify] = ToastifyNotification()

  const navigateTo = useNavigate()


  const userNameInputElementRef = useRef()
  const emailInputElementRef = useRef()
  const phoneInputElementRef = useRef()
  const passwordInputElementRef = useRef()
  const passwordConfirmationInputElementRef = useRef()

  const [userNameInput, setUserNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('')

  const dispatch = useDispatch()
  const registerResponse = useSelector(state => state.registerReducer.registerResponse)
  const registerResponseIsLoaded = useSelector(state => state.registerReducer.isLoaded)
  const [isClicked, setIsClicked] = useState(false)

  const [loader, setLoader] = useState(false)




  const userNameInputOnChangeHandle = (e) => {
    setUserNameInput(e.target.value)
  }
  const emailInputOnChangeHandle = (e) => {
    setEmailInput(e.target.value)
  }
  const phoneInputOnChangeHandle = (e) => {
    setPhoneInput(e.target.value)
  }
  const passwordInputOnChangeHandle = (e) => {
    setPasswordInput(e.target.value)
  }
  const passwordConfirmationInputOnChangeHandle = (e) => {
    setPasswordConfirmationInput(e.target.value)
  }
  const formButtonOnClickHandle = async (e) => {
    e.preventDefault()
    if (!userNameInput){
      userNameInputElementRef.current.focus()
      notify( "warning", "ادخل اسم المستخدم")
      return null;
    } else if(!emailInput){
      emailInputElementRef.current.focus()
      notify( "warning", "ادخل الإيميل")
      return null;
    } else if(!phoneInput){
      phoneInputElementRef.current.focus()
      notify( "warning", "ادخل رقم الموبايل")
      return null;
    } else if(!passwordInput){
      passwordInputElementRef.current.focus()
      notify( "warning", "ادخل كلمة السر")
      return null;
    } else if(!passwordConfirmationInput){
      passwordConfirmationInputElementRef.current.focus()
      notify( "warning", "ادخل تأكيد كلمة السر")
      return null;
    } else if(passwordInput !== passwordConfirmationInput){
      notify( "warning", "كلمة السر غير متطابقة")
      return null;
    }

    const data = {
      name: userNameInput,
      email:emailInput,
      password:passwordInput,
      passwordConfirmation:passwordConfirmationInput,
      phone:phoneInput
    }
    
    setLoader(true)
    await dispatch(registerUser(data, "RegisterPageHook"))
    setLoader(false)
    setIsClicked(true)
  }

  useEffect(() => {
    if (registerResponseIsLoaded && isClicked){
      if (registerResponse.status === 201){
        notify( "success", "تم إنشاء الحساب بنجاح")
        setUserNameInput('')
        setEmailInput('')
        setPhoneInput('')
        setPasswordInput('')
        setPasswordConfirmationInput('')
        setTimeout(() => {
          navigateTo("/login")
        }, 1000);
      } else {

        if (registerResponse?.response?.data?.error?.statusMessage) {
          if (registerResponse?.response?.data?.error?.statusMessage === "signUp failed") {
            notify("error", "خطأ فى عملية التسجيل حاول مرة اخرى")
          }
        } else {
          // eslint-disable-next-line 
        registerResponse?.response?.data?.error?.map(item => {
          if (item.msg === "email is already in use"){
            notify( "warning", "الايميل موجود بالفعل")
            emailInputElementRef.current.focus()
          }  if (item.msg === "name must be at least 2 characters"){
            notify( "warning", "الاسم يجب الا يقل عن حرفين")
            userNameInputElementRef.current.focus()
          }  if (item.msg === "email format is incorrect"){
            notify( "warning", "صيغة الايميل خطأ")
            emailInputElementRef.current.focus()
          }  if (item.msg === "password must be at least 6 chars/symbols"){
            notify( "warning", "الباسورد يجب الا يقل عن 6 احرف")
            passwordInputElementRef.current.focus()
          }  if (item.msg === "password confirmation is wrong"){
            notify( "warning", "تأكيد الباسورد خطأ")
            passwordConfirmationInputElementRef.current.focus()
          }  if (item.msg === "phone ust be EGY or KSA numbers"){
            notify( "warning", "رقم التليفون يجب ان يكون مصرى")
            phoneInputElementRef.current.focus()
          }  if (item.msg === "this phone is already in use"){
            notify( "warning", "رقم التليفون مستخدم بالفعل")
            phoneInputElementRef.current.focus()
          }
        })
        }
      }
    }
    setIsClicked(false)
    // eslint-disable-next-line
  }, [isClicked])
  
  
  return [userNameInputOnChangeHandle, emailInputOnChangeHandle, phoneInputOnChangeHandle, passwordInputOnChangeHandle, passwordConfirmationInputOnChangeHandle, userNameInput, emailInput, phoneInput, passwordInput, passwordConfirmationInput, formButtonOnClickHandle, userNameInputElementRef, emailInputElementRef, phoneInputElementRef, passwordInputElementRef, passwordConfirmationInputElementRef, loader]
}

export default RegisterPageHook
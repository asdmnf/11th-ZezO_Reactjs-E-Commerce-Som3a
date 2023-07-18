

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordEmail, forgetPasswordNewPassworReset, forgetPasswordVerifyCode } from "../Redux/Actions/AuthenticationAction/AuthenticationAction";
import ToastifyNotification from "./ToastifyNotification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPasswordPageHook = () => {

  const [notify] = ToastifyNotification()

  const navigateTo = useNavigate()

  const emailInputElementRef = useRef();
  const codeInputElementRef = useRef();
  const oldPasswordInputElementRef = useRef();
  const newPasswordInputElementRef = useRef();

  const [emailInput, setEmailInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");

  const [emailIsClicked, setEmailIsClicked] = useState(false);
  const [codeIsClicked, setCodeIsClicked] = useState(false);
  const [changePasswordIsClicked, setChangePasswordIsClicked] = useState(false);

  const [emailLoader, setEmailLoader] = useState(false)
  const [codeLoader, setCodeLoader] = useState(false)
  const [changePasswordLoader, setChangePasswordLoader] = useState(false)

  const emailInputOnChangeHandle = (e) => {
    setEmailInput(e.target.value);
  };
  const codeInputOnChangeHandle = (e) => {
    setCodeInput(e.target.value);
  };
  const oldPasswordInputOnChangeHandle = (e) => {
    setOldPasswordInput(e.target.value);
  };
  const newPasswordInputOnChangeHandle = (e) => {
    setNewPasswordInput(e.target.value);
  };

  const dispatch = useDispatch()
  // eslint-disable-next-line
  const forgetPasswordEmailResponse = useSelector(state => state.forgetPasswordEmailReducer.forgetPasswordEmailResponse)
  // eslint-disable-next-line
  const forgetPasswordEmailResponseIsLoaded = useSelector(state => state.forgetPasswordEmailReducer.isLoaded)
  // eslint-disable-next-line
  const forgetPasswordCodeResponse = useSelector(state => state.forgetPasswordCodeReducer.forgetPasswordCodeResponse)
  // eslint-disable-next-line
  const forgetPasswordCodeResponseIsLoaded = useSelector(state => state.forgetPasswordCodeReducer.isLoaded)
  // eslint-disable-next-line
  const forgetPasswordNewPassworResponse = useSelector(state => state.forgetPasswordNewPassworReducer.forgetPasswordNewPassworResponse)
  // eslint-disable-next-line
  const forgetPasswordNewPassworResponseIsLoaded = useSelector(state => state.forgetPasswordNewPassworReducer.isLoaded)
  // eslint-disable-next-line
  const emailFormButtonOnClickHandle = async (e) => {
    e.preventDefault()
    if (!emailInput){
      notify("warning", "أدخل الإيميل")
      emailInputElementRef.current.focus()
      return null
    }

    setEmailLoader(true)
    await dispatch(forgetPasswordEmail({
      email: emailInput
    }, "ForgetPasswordPageHook"))
    setEmailLoader(false)
    setEmailIsClicked(true)
  };


  useEffect(() => {
    if (forgetPasswordEmailResponseIsLoaded && emailIsClicked) {
      if (forgetPasswordEmailResponse.status === 200) {
        notify("success", "تم ارسال الكود بنجاح")
      } else {
        if (forgetPasswordEmailResponse?.response?.data?.error?.statusMessage) {
          if (forgetPasswordEmailResponse?.response?.data?.error?.statusMessage === "email is not in our DB please check your email again") {
            notify("warning", "الايميل ليس مسجل لدينا")
          }
          if (forgetPasswordEmailResponse?.response?.data?.error?.statusMessage === "ResetCode sent Failiure") {
            notify("error", "خطأ فى ارسال الكود حاول مرة اخرى")
          }
        } else {
          forgetPasswordEmailResponse?.response?.data?.error.map(item => {
            if (item.msg === "email format is incorrect") {
              notify("warning", "صيغة الايميل خطأ")
            }
          })
        }
      }
    }
    setEmailIsClicked(false)
  }, [emailIsClicked])
  

  const codeFormButtonOnClickHandle = async (e) => {
    e.preventDefault()
    if (!codeInput){
      if (!emailInput){
        notify("warning", "أدخل الإيميل")
        emailInputElementRef.current.focus()
      }
      notify("warning", "أدخل كود التفعيل")
      codeInputElementRef.current.focus()
      return null
    }

    setCodeLoader(true)
    await dispatch(forgetPasswordVerifyCode({
      email: emailInput,
      resetCode: codeInput
    }, "ForgetPasswordPageHook"))
    setCodeLoader(false)
    setCodeIsClicked(true)
  };


  useEffect(() => {
    if (forgetPasswordCodeResponseIsLoaded && codeIsClicked) {
      if (forgetPasswordCodeResponse.status === 200) {
        notify("success", "تم تفعيل الكود بنجاح")
      } else {
        if (forgetPasswordCodeResponse?.response?.data?.error?.statusMessage) {
          if (forgetPasswordCodeResponse?.response?.data?.error?.statusMessage === "Email is Wrong please check your email") {
            notify("warning", "الايميل خطأ تحقق منه مجددا")
          }
          if (forgetPasswordCodeResponse?.response?.data?.error?.statusMessage === "invalid reset code please check it again or request another one") {
            notify("warning", "الكود خطأ تحقق منه مجددا")
          }
          if (forgetPasswordCodeResponse?.response?.data?.error?.statusMessage === "expired reset code please request another one") {
            notify("warning", "الكود منتهى اطلب كود اخر")
          }
        } else {
          forgetPasswordCodeResponse?.response?.data?.error.map(item => {
            if (item.msg === "email format is incorrect") {
              notify("warning", "صيغة الايميل خطأ")
            }
            if (item.msg === "resetCode length must be 6 numbers") {
              notify("warning", "الكود غير مكتمل الاحرف")
            }
          })
        }
      }
    }
    setCodeIsClicked(false)
  }, [codeIsClicked])

  const passwordFormButtonOnClickHandle = async (e) => {
    e.preventDefault()
    setChangePasswordLoader(true)
    await dispatch(forgetPasswordNewPassworReset({
      email: emailInput,
      newPassword: oldPasswordInput,
      newPasswordConfirmation: newPasswordInput
    }, "ForgetPasswordPageHook"))
    setChangePasswordLoader(false)
    setChangePasswordIsClicked(true)
  };


  useEffect(() => {
    if (forgetPasswordNewPassworResponseIsLoaded && changePasswordIsClicked) {
      if (forgetPasswordNewPassworResponse.status === 201) {
        notify("success", "تم تغيير الباسورد بنجاح")
        setEmailInput("")
        setCodeInput("")
        setOldPasswordInput("")
        setNewPasswordInput("")
        setTimeout(() => {
          navigateTo("/login")
        }, 1000);
      } else {
        if (forgetPasswordNewPassworResponse?.response?.data?.error?.statusMessage) {
          if (forgetPasswordNewPassworResponse?.response?.data?.error?.statusMessage === "Email is Wrong please check your email") {
            notify("warning", "الايميل خطأ تحقق منه مجددا")
          }
          if (forgetPasswordNewPassworResponse?.response?.data?.error?.statusMessage === "reset code not found request one first") {
            notify("warning", "الكود غير موجود اطلب كود اولا")
          }
        } else {
          forgetPasswordNewPassworResponse?.response?.data?.error.map(item => {
            if (item.msg === "email format is incorrect") {
              notify("warning", "صيغة الايميل خطأ")
            }
            if (item.msg === "password must be at least 6 chars/symbols") {
              notify("warning", "الباسورد يجب الا يقل عن 6 احرف")
            }
            if (item.msg === "password confirmation is wrong") {
              notify("warning", "تأكيد الباسورد خطأ")
            }
          })
        }
      }
    }
    setChangePasswordIsClicked(false)
  }, [changePasswordIsClicked])


  return [emailFormButtonOnClickHandle, codeFormButtonOnClickHandle, passwordFormButtonOnClickHandle, emailInputOnChangeHandle, emailInput, emailInputElementRef, codeInputOnChangeHandle, codeInput, codeInputElementRef, oldPasswordInputOnChangeHandle, oldPasswordInput, oldPasswordInputElementRef, newPasswordInputOnChangeHandle, newPasswordInput, newPasswordInputElementRef, emailLoader, codeLoader, changePasswordLoader]
};

export default ForgetPasswordPageHook;

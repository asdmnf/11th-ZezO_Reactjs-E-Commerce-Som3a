import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData, updateUserPassword } from "../../Redux/Actions/UserAction/userAction";
import ToastifyNotification from "../ToastifyNotification";


const UserProfilePageHook = () => {
  const [notify] = ToastifyNotification()

  const navigateTo = useNavigate()

  const nameInputRef = useRef()
  const phoneInputRef = useRef()
  const emailRef = useRef()

  const [nameInput, setNameInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [email, setEmail] = useState('')
  const [currentPasswordInput, setCurrentPasswordInput] = useState('')
  const [newPasswordInput, setNewPasswordInput] = useState('')
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('')

  const dispatch = useDispatch()
  const userData = useSelector(state => state.userReducer.userData)
  const userDataIsLoaded = useSelector(state => state.userReducer.userDataIsLoaded)
  const updateUserDataResponse = useSelector(state => state.userReducer.updateUserDataResponse)
  const updateUserDataResponseIsLoaded = useSelector(state => state.userReducer.updateUserDataResponseIsLoaded)
  const updateUserPasswordResponse = useSelector(state => state.userReducer.updateUserPasswordResponse)
  const updateUserPasswordResponseIsLoaded = useSelector(state => state.userReducer.updateUserPasswordResponseIsLoaded)

  const [loader, setLoader] = useState(false)
  const [editUserDataIsClicked, setEditUserDataIsClicked] = useState(false)
  const [saveEditUserDataIsClicked, setSaveEditUserDataIsClicked] = useState(false)
  const [changePasswordIsClicked, setChangePasswordIsClicked] = useState(false)

  // ------------------------------------------------------------------------------------------------
  // change user data

  // تبع المودال
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const nameInputOnChangeHandle = (e) => {
    setNameInput(e.target.value)
  }

  const phoneInputOnChangeHandle = (e) => {
    setPhoneInput(e.target.value)
  }

  const emailOnChangeHandle = (e) => {
    setEmail(e.target.value)
  }

  const editUserDataOnClickHandle = async () => {
    await dispatch(getUserData("UserProfilePageHook"))
    setEditUserDataIsClicked(true)
  }

  useEffect(() => {
      if (userData?.data){
        handleShow()
        setNameInput(userData?.data?.name)
        setPhoneInput(userData?.data?.phone)
        setEmail(userData?.data?.email)
      }
    // eslint-disable-next-line
  }, [userData])

  
  //------------------------------------------------------------------------------------------------------------------
  // Protected Content
  useEffect(() => {
    if (userData?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && editUserDataIsClicked) {
        notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
        setNameInput("")
        setPhoneInput("")
        setEmail("")

        setEditUserDataIsClicked(false)
    }
}, [editUserDataIsClicked])
//------------------------------------------------------------------------------------------------------------------

  

  const saveEditUserDataOnClickHandle = async () => {

    if (!nameInput) {
      notify('warning', 'ادخل الاسم اولا')
      nameInputRef.current.focus()
      return null
    } else
    if (!phoneInput) {
      notify('warning', 'ادخل رقم الهاتف اولا')
      phoneInputRef.current.focus()
      return null
    } else
    if (!email) {
      notify('warning', 'ادخل الإيميل اولا')
      emailRef.current.focus()
      return
    }
    await dispatch(updateUserData({
      name: nameInput,

      phone: phoneInput !== userData?.data?.phone ? phoneInput : undefined,
      email: email !== userData?.data.email ? email : undefined 
    }, "UserProfilePageHook"))
    setSaveEditUserDataIsClicked(true)
    handleClose()
  }

  useEffect(() => {
    if (updateUserDataResponseIsLoaded && saveEditUserDataIsClicked){
      if (updateUserDataResponse.status === 201){
        notify('success', 'تم تغيير البيانات بنجاح')
        localStorage.setItem('userData', JSON.stringify(updateUserDataResponse?.data?.data))
      } else {
        if (updateUserDataResponse?.response?.data?.error?.statusMessage) {
          if (updateUserDataResponse?.response?.data?.error?.statusMessage === "password cannot change from here") {
            notify('error', 'لا يمكن تغيير الباسورد من هنا')
          }
          if (updateUserDataResponse?.response?.data?.error?.statusMessage === "Invalid document id") {
            notify('error', 'الرقم التعريفى غير صحيح')
          }
        } else {
          updateUserDataResponse?.response?.data?.error?.map(item => {
            if (item.msg === "name must be at least 2 characters") {
              notify('warning', 'الاسم يجب الا يقل عن حرفين')
            }
            if (item.msg === "this phone is already in use") {
              notify('warning', 'رقم التليفون مستخدم بالفعل')
            }
            if (item.msg === "email already in use") {
              notify('warning', 'الايميل مستخدم بالفعل')
            }
            if (item.msg === "phone must be EGY or KSA numbers") {
              notify('warning', 'رقم التليفون يجب ان يكون مصرى')
            }
          })
        }
      }
    } else if (!updateUserDataResponseIsLoaded && saveEditUserDataIsClicked){
      notify('error', 'لم يتم تغيير البيانات بنجاح')
    }
    setSaveEditUserDataIsClicked(false)
    // eslint-disable-next-line
  }, [saveEditUserDataIsClicked])

  // ------------------------------------------------------------------------------------------------
  



  // ------------------------------------------------------------------------------------------------
  // change user password

  const currentPasswordOnChangeHandle = (e) => {
    setCurrentPasswordInput(e.target.value)
  }

  const newPasswordOnChangeHandle = (e) => {
    setNewPasswordInput(e.target.value)
  }

  const confirmNewPasswordOnChangeHandle = (e) => {
    setConfirmNewPasswordInput(e.target.value)
  }

  const changePasswordOnClickHandle = async () => {
    if (!currentPasswordInput) {
      notify('warning', 'ادخل كلمة المرور الحالية')
      return null
    } else if (!newPasswordInput) {
      notify('warning', 'ادخل كلمة المرور الجديدة')
      return null
    } else if (!confirmNewPasswordInput) {
      notify('warning', 'ادخل تأكيد كلمة المرور الجديدة')
      return null
    } else if (newPasswordInput !== confirmNewPasswordInput) {
      notify('warning', 'كلمة المرور الجديدة غير متطابقة')
      return null
    }
    setLoader(true)
    await dispatch(updateUserPassword({
      oldPassword: currentPasswordInput,
      password: newPasswordInput,
      passwordConfirmation: confirmNewPasswordInput,
    }, "UserProfilePageHook"))
    setLoader(false)
    setChangePasswordIsClicked(true)
  }

  useEffect(() => {
    if (updateUserPasswordResponseIsLoaded && changePasswordIsClicked){
      if (updateUserPasswordResponse?.status === 201){
        notify('success', 'تم تغيير كلمة المرور بنجاح وجارى تسجيل الخروج')
        setCurrentPasswordInput('')
        setNewPasswordInput('')
        setConfirmNewPasswordInput('')
        setTimeout(() => {
          localStorage.removeItem('userData')
          localStorage.removeItem('userRole')
          localStorage.removeItem('token')
          navigateTo('/login')
        }, 1500);
      }
      
      

    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (updateUserPasswordResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && changePasswordIsClicked) {
      notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
      setCurrentPasswordInput('')
      setNewPasswordInput('')
      setConfirmNewPasswordInput('')
    }
  //------------------------------------------------------------------------------------------------------------------

      
      
      else {
        updateUserPasswordResponse?.response?.data?.error?.map(item => {
          if (item.msg === "password must be at least 6 chars/symbols") {
            notify('warning', 'الباسورد يجب الا يقل عن 6 احرف')
          }
          if (item.msg === "old password is incorrect") {
            notify('warning', 'كلمة المرور الحالية خطأ')
          }
          if (item.msg === "password confirmation is wrong") {
            notify('warning', 'كلمة المرور الجديدة غير متطابقة')
          }
        })
      }
    }
    setChangePasswordIsClicked(false)
    // eslint-disable-next-line
  }, [changePasswordIsClicked])
  
  // ------------------------------------------------------------------------------------------------
  

  return [show, handleClose, editUserDataOnClickHandle, saveEditUserDataOnClickHandle, nameInputRef, nameInputOnChangeHandle, nameInput, phoneInputRef, phoneInputOnChangeHandle, phoneInput, currentPasswordOnChangeHandle, currentPasswordInput, newPasswordOnChangeHandle, newPasswordInput, confirmNewPasswordOnChangeHandle, confirmNewPasswordInput, changePasswordOnClickHandle, loader, emailRef, emailOnChangeHandle, email]
}

export default UserProfilePageHook
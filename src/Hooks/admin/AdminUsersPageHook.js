import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { activateAccount, changeToAdmin, changeToUser, deactivateAccount, getAllUsers } from "../../Redux/Actions/AdminUsersAction/adminUsersAction"
import { useState } from "react"
import ToastifyNotification from "../ToastifyNotification"


const AdminUsersPageHook = () => {

  const [notify] = ToastifyNotification()

  const dispatch = useDispatch()
  const allUsersData = useSelector(state => state.getAllUsersReducer.allUsersData)
  const allUsersDataIsLoaded = useSelector(state => state.getAllUsersReducer.allUsersDataIsLoaded)
  const changeToAdminResponse = useSelector(state => state.usersOperatoinsReducer.changeToAdminResponse)
  const changeToAdminResponseIsLoaded = useSelector(state => state.usersOperatoinsReducer.changeToAdminResponseIsLoaded)
  const changeToUserResponse = useSelector(state => state.usersOperatoinsReducer.changeToUserResponse)
  const changeToUserResponseIsLoaded = useSelector(state => state.usersOperatoinsReducer.changeToUserResponseIsLoaded)
  const deactivateAccountResponse = useSelector(state => state.usersOperatoinsReducer.deactivateAccountResponse)
  const deactivateAccountResponseIsLoaded = useSelector(state => state.usersOperatoinsReducer.deactivateAccountResponseIsLoaded)
  const activateAccountResponse = useSelector(state => state.usersOperatoinsReducer.activateAccountResponse)
  const activateAccountResponseIsLoaded = useSelector(state => state.usersOperatoinsReducer.activateAccountResponseIsLoaded)

  const [changeToAdminIsClicked, setChangeToAdminIsClicked] = useState(false)
  const [changeToUserIsClicked, setChangeToUserIsClicked] = useState(false)
  const [deactivateAccountIsClicked, setDeactivateAccountIsClicked] = useState(false)
  const [activateAccountIsClicked, setActivateAccountIsClicked] = useState(false)

  const [changeToAdminLoader, setChangeToAdminLoader] = useState(false)
  const [changeToUserLoader, setChangeToUserLoader] = useState(false)
  const [deactivateAccountLoader, setDeactivateAccountLoader] = useState(false)
  const [activateAccountLoader, setActivateAccountLoader] = useState(false)

  const [specificUserID, setSpecificUserID] = useState("")

  useEffect(() => {
    dispatch(getAllUsers("AdminUsersPageHook"))
  }, [])

  // change role to admin
  const changeRoleToAdminOnClickHandler = async (id) => {
    setSpecificUserID(id)
    setChangeToAdminLoader(true)
    await dispatch(changeToAdmin(id, {
      role: "admin"
    }, "AdminUsersPageHook"))
    setChangeToAdminLoader(false)
    setChangeToAdminIsClicked(true)
  }

  useEffect(() => {
    if (changeToAdminResponseIsLoaded && changeToAdminIsClicked) {
      if (changeToAdminResponse?.status === 201) {
        notify("success", "تمت الترقية الى ادمن بنجاح")
        dispatch(getAllUsers("AdminUsersPageHook"))
      } 


    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (changeToAdminResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && changeToAdminIsClicked) {
      notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------
      
      
      else {
        notify("error", "حدثت مشكلة حاول مرة اخرى")
      }
    } else if (!changeToAdminResponseIsLoaded && changeToAdminIsClicked) {
      notify("error", "حدثت مشكلة حاول مرة اخرى")
    }
    setChangeToAdminIsClicked(false)
  }, [changeToAdminIsClicked])


  // change role to user
  const changeRoleToUserOnClickHandler = async (id) => {
    setSpecificUserID(id)
    setChangeToUserLoader(true)
    await dispatch(changeToUser(id, {
      role: "user"
    }, "AdminUsersPageHook"))
    setChangeToUserLoader(false)
    setChangeToUserIsClicked(true)
  }

  useEffect(() => {
    if (changeToUserResponseIsLoaded && changeToUserIsClicked) {
      if (changeToUserResponse?.status === 201) {
        notify("success", "تم الرجوع الى مستخدم بنجاح")
        dispatch(getAllUsers("AdminUsersPageHook"))
      } 


    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (changeToUserResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && changeToUserIsClicked) {
      notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------
      
      
      else {
        notify("error", "حدثت مشكلة حاول مرة اخرى")
      }
    } else if (!changeToUserResponseIsLoaded && changeToUserIsClicked) {
      notify("error", "حدثت مشكلة حاول مرة اخرى")
    }
    setChangeToUserIsClicked(false)
  }, [changeToUserIsClicked])
  
  // deactivate account
  const deactivateAccountOnClickHandler = async (id) => {
    setSpecificUserID(id)
    setDeactivateAccountLoader(true)
    await dispatch(deactivateAccount(id, "AdminUsersPageHook"))
    setDeactivateAccountLoader(false)
    setDeactivateAccountIsClicked(true)
  }

  useEffect(() => {
    if (deactivateAccountResponseIsLoaded && deactivateAccountIsClicked) {
      if (deactivateAccountResponse?.status === 201) {
        notify("success", "تم الغاء تفعيل الحساب بنجاح")
        dispatch(getAllUsers("AdminUsersPageHook"))
      } 


    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (deactivateAccountResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && deactivateAccountIsClicked) {
      notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------

      
      
      else {
        notify("error", "حدثت مشكلة حاول مرة اخرى")
      }
    } else if (!deactivateAccountResponseIsLoaded && deactivateAccountIsClicked) {
      notify("error", "حدثت مشكلة حاول مرة اخرى")
    }
    setDeactivateAccountIsClicked(false)
  }, [deactivateAccountIsClicked])


  // activate account
  const activateAccountOnClickHandler = async (id) => {
    setSpecificUserID(id)
    setActivateAccountLoader(true)
    await dispatch(activateAccount(id, "AdminUsersPageHook"))
    setActivateAccountLoader(false)
    setActivateAccountIsClicked(true)
  }

  useEffect(() => {
    if (activateAccountResponseIsLoaded && activateAccountIsClicked) {
      if (activateAccountResponse?.status === 201) {
        notify("success", "تم تفعيل الحساب مجددا بنجاح")
        dispatch(getAllUsers("AdminUsersPageHook"))
      } 



    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (activateAccountResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && activateAccountIsClicked) {
      notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
    }
  //------------------------------------------------------------------------------------------------------------------
      
      
      
      else {
        notify("error", "حدثت مشكلة حاول مرة اخرى")
      }
    } else if (!activateAccountResponseIsLoaded && activateAccountIsClicked) {
      notify("error", "حدثت مشكلة حاول مرة اخرى")
    }
    setActivateAccountIsClicked(false)
  }, [activateAccountIsClicked])
  

  return [allUsersData, allUsersDataIsLoaded, changeRoleToAdminOnClickHandler, deactivateAccountOnClickHandler, changeToAdminLoader, deactivateAccountLoader, specificUserID, changeRoleToUserOnClickHandler, activateAccountOnClickHandler, changeToUserLoader, activateAccountLoader]
}

export default AdminUsersPageHook
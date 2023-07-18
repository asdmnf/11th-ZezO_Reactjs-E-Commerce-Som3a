import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAddress, getAllAddresses, getSpecificAddress, removeAddress, updateAddress } from "../../Redux/Actions/AddressAction/addressAction"
import ToastifyNotification from "../ToastifyNotification"


const UserAddressesPageHook = () => {
  const [notify] = ToastifyNotification()

  const [addressTitleInput, setAddressTitleInput] = useState('')
  const [addressDescriptionInput, setAddressDescriptionInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')

  const addressTitleInputRef = useRef()
  const addressDescriptionInputRef = useRef()
  const phoneInputRef = useRef()

  const dispatch = useDispatch()
  const addAddressResponse = useSelector(state => state.addressReducer.addAddressResponse)
  const addAddressResponseIsLoaded = useSelector(state => state.addressReducer.addAddressResponseIsLoaded)
  const allAddressesData = useSelector(state => state.addressReducer.allAddressesData)
  const allAddressesDataIsLoaded = useSelector(state => state.addressReducer.allAddressesDataIsLoaded)
  const removeAddressResponse = useSelector(state => state.addressReducer.removeAddressResponse)
  const removeAddressResponseIsLoaded = useSelector(state => state.addressReducer.removeAddressResponseIsLoaded)
  const updateAddressResponse = useSelector(state => state.addressReducer.updateAddressResponse)
  const updateAddressResponseIsLoaded = useSelector(state => state.addressReducer.updateAddressResponseIsLoaded)

  const [loader, setLoader] = useState(false)
  const [addAddressIsClicked, setAddAddressIsClicked] = useState(false)
  const [removeAddressIsClicked, setRemoveAddressIsClicked] = useState(false)
  const [editAddressIsClicked, setEditAddressIsClicked] = useState(false)
  const [saveEditAddressIsClicked, setSaveEditAddressIsClicked] = useState(false)

  //---------------------------------------------------------------------------------------
  // add address

  const addressTitleInputOnChangeHandle = (e) => {
    setAddressTitleInput(e.target.value)
  }
  const addressDescriptionInputOnChangeHandle = (e) => {
    setAddressDescriptionInput(e.target.value)
  }
  const phoneInputOnChangeHandle = (e) => {
    setPhoneInput(e.target.value)
  }
  const addAddressOnClickHandle = async () => {
    if (!addressTitleInput) {
      notify("warning", "ادخل المكان")
      addressTitleInputRef.current.focus()
      return null
    } else if (!addressDescriptionInput) {
      notify("warning", "ادخل تفاصيل العنوان")
      addressDescriptionInputRef.current.focus()
      return null
    } else if (!phoneInput) {
      notify("warning", "ادخل رقم الهاتف")
      phoneInputRef.current.focus()
      return null
    }
    setLoader(true)
    await dispatch(addAddress({
      title: addressTitleInput,
      fullAddress: addressDescriptionInput,
      phone: phoneInput,
    }, "UserAddressesPageHook"))
    setLoader(false)
    setAddAddressIsClicked(true)
    dispatch(getAllAddresses("UserAddressesPageHook"))
  }

  useEffect(() => {
    if (addAddressResponseIsLoaded && addAddressIsClicked) {
      if (addAddressResponse.status === 201) {
        notify("success", "تمت اضافة العنوان بنجاح")
        setAddressTitleInput("")
        setAddressDescriptionInput("")
        setPhoneInput("")
      } else {

        if (addAddressResponse?.response?.data?.error?.statusMessage) {
          if (addAddressResponse?.response?.data?.error?.statusMessage === "Failed to create address model") {
            notify("error", "هناك مشكلة فى اضافة العنوان حاول مرة اخرى")
          }
        } else {
          addAddressResponse?.response?.data?.error?.map(item => {
            if (item.msg === "title length must be at least 2 characters") {
              notify("warning", "المكان يجب الا يقل عن حرفين")
            }
            if (item.msg === "title length must be at least 10 characters") {
              notify("warning", "العنوان التفصيلى يجب الا يقل عن 10 احرف")
            }
            if (item.msg === "phone format is inncorrect") {
              notify("warning", "صيغة رقم التليفون غير صحيحة")
            }
          })
        }
      }
    } else if (!addAddressResponseIsLoaded && addAddressIsClicked) {
      notify("error", "هناك مشكلة فى اضافة العنوان حاول مرة اخرى")
    }
    setAddAddressIsClicked(false)
    // eslint-disable-next-line
  }, [addAddressIsClicked])

  //---------------------------------------------------------------------------------------





  //---------------------------------------------------------------------------------------
  // get all addresses

  useEffect(() => {
    dispatch(getAllAddresses("UserAddressesPageHook"))
    // eslint-disable-next-line
  }, [])
  
  //---------------------------------------------------------------------------------------





  //---------------------------------------------------------------------------------------
  // remove address

  const removeAddressOnClickHandle = async (id) => {
    await dispatch(removeAddress(id, "UserAddressesPageHook"))
    setRemoveAddressIsClicked(true)
    dispatch(getAllAddresses("UserAddressesPageHook"))
  }

  useEffect(() => {
    if (removeAddressResponseIsLoaded && removeAddressIsClicked) {
      if (removeAddressResponse.status === 200) {
        notify("success", "تم حذف العنوان بنجاح")
      } else {
        if (removeAddressResponse?.response?.data?.error?.statusMessage) {
          if (removeAddressResponse?.response?.data?.error?.statusMessage === "Failed to delete address check address id") {
            notify("error", "هناك مشكلة فى حذف العنوان حاول مرة اخرى")
          }
        }
      }
    } else if (!removeAddressResponseIsLoaded && removeAddressIsClicked) {
      notify("error", "هناك مشكلة فى حذف العنوان حاول مرة اخرى")
    }
    setRemoveAddressIsClicked(false)
    //------
    setAddressTitleInput("")
    setAddressDescriptionInput("")
    setPhoneInput("")
    setEditAddressIsClicked(false)
    //------
    // eslint-disable-next-line
  }, [removeAddressIsClicked])
  //---------------------------------------------------------------------------------------




  //---------------------------------------------------------------------------------------
  // edit address

  const [editAddressID, setEditAddressID] =  useState('')

  const editAddressOnClickHandle = async (id) => {
    setEditAddressIsClicked(true)
    let specificAddress = allAddressesData.data?.addresses.filter(item => {
      return item._id === id
    })
      setAddressTitleInput(specificAddress[0].title)
      setAddressDescriptionInput(specificAddress[0].fullAddress)
      setPhoneInput(specificAddress[0].phone)
      setEditAddressID(specificAddress[0]._id)
    window.scrollTo(0, 0)
  }

  const saveEditAddressOnClickHandle = async () => {
    setLoader(true)
    await dispatch(updateAddress(editAddressID, {
      title: addressTitleInput,
      fullAddress: addressDescriptionInput,
      phone: phoneInput,
    }, "UserAddressesPageHook"))
    setLoader(false)
    setSaveEditAddressIsClicked(true)
    dispatch(getAllAddresses("UserAddressesPageHook"))
  }


  useEffect(() => {
    if (updateAddressResponseIsLoaded && saveEditAddressIsClicked) {
      if (updateAddressResponse.status === 201) {
        notify("success", "تم تعديل العنوان بنجاح")
        setAddressTitleInput("")
        setAddressDescriptionInput("")
        setPhoneInput("")
        setEditAddressIsClicked(false)
      } else {

        if (updateAddressResponse?.response?.data?.error?.statusMessage) {
          if (updateAddressResponse?.response?.data?.error?.statusMessage === "failed to update address check address id") {
            notify("error", "هناك مشكلة فى تحديث العنوان حاول مرة اخرى")
          }
        } else {
          updateAddressResponse?.response?.data?.error?.map(item => {
            if (item.msg === "title length must be at least 2 characters") {
              notify("warning", "المكان يجب الا يقل عن حرفين")
            }
            if (item.msg === "title length must be at least 10 characters") {
              notify("warning", "العنوان التفصيلى يجب الا يقل عن 10 احرف")
            }
            if (item.msg === "phone format is inncorrect") {
              notify("warning", "صيغة رقم التليفون غير صحيحة")
            }
          })
        }
      }
    } else if (!updateAddressResponseIsLoaded && saveEditAddressIsClicked) {
      notify("error", "هناك مشكلة فى تحديث العنوان حاول مرة اخرى")
    }
    setSaveEditAddressIsClicked(false)
    // eslint-disable-next-line
  }, [saveEditAddressIsClicked])

  //---------------------------------------------------------------------------------------


  return [addressTitleInput, addressDescriptionInput, phoneInput, addressTitleInputRef, addressDescriptionInputRef, phoneInputRef, loader, addressTitleInputOnChangeHandle, addressDescriptionInputOnChangeHandle, phoneInputOnChangeHandle, addAddressOnClickHandle, allAddressesDataIsLoaded, allAddressesData, removeAddressOnClickHandle, editAddressOnClickHandle, editAddressIsClicked, saveEditAddressOnClickHandle]
}

export default UserAddressesPageHook
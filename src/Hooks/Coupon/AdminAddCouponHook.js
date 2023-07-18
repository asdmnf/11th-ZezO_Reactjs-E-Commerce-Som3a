import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCoupon, getAllCoupons, getSpecificCoupon, removeCoupon, updateCoupon } from "../../Redux/Actions/CouponAction/couponAction"
import ToastifyNotification from "../ToastifyNotification"


const AdminAddCouponHook = () => {
  const [notify] = ToastifyNotification()
  
  const [couponNameInput, setCouponNameInput] = useState('')
  const [couponDateInput, setCouponDateInput] = useState('')
  const [couponDiscount, setCouponDiscount] = useState('')
  const [couponDiscountLimit, setCouponDiscountLimit] = useState('')

  const couponNameInputRef = useRef()
  const couponDateInputRef = useRef()
  const couponDiscountRef = useRef()
  const couponDiscountLimitRef = useRef()

  const dispatch = useDispatch()
  const addCouponResponse = useSelector(state => state.couponReducer.addCouponResponse)
  const addCouponResponseIsLoaded = useSelector(state => state.couponReducer.addCouponResponseIsLoaded)
  const allCouponsData = useSelector(state => state.getAllCouponsReducer.allCouponsData)
  const allCouponsDataIsLoaded = useSelector(state => state.getAllCouponsReducer.allCouponsDataIsLoaded)
  const specificCouponData = useSelector(state => state.couponReducer.specificCouponData)
  const specificCouponDataIsLoaded = useSelector(state => state.couponReducer.specificCouponDataIsLoaded)
  const updateCouponResponse = useSelector(state => state.couponReducer.updateCouponResponse)
  const updateCouponResponseIsLoaded = useSelector(state => state.couponReducer.updateCouponResponseIsLoaded)
  const removeCouponResponse = useSelector(state => state.couponReducer.removeCouponResponse)
  const removeCouponResponseIsLoaded = useSelector(state => state.couponReducer.removeCouponResponseIsLoaded)

  const [loader, setLoader] = useState(false)
  const [addCouponIsClicked, setAddCouponIsClicked] = useState(false)
  const [removeCouponIsClicked, setRemoveCouponIsClicked] = useState(false)
  const [editCouponIsClicked, setEditCouponIsClicked] = useState(false)
  const [saveEditCouponIsClicked, setSaveEditCouponIsClicked] = useState(false)

  //---------------------------------------------------------------------------------------
  // add coupon

  const couponNameInputOnChangeHandle = (e) => {
    setCouponNameInput(e.target.value)
  }
  const couponDateInputOnChangeHandle = (e) => {
    setCouponDateInput(e.target.value)
  }
  const couponDiscountInputOnChangeHandle = (e) => {
    setCouponDiscount(e.target.value)
  }
  const couponDiscountLimitInputOnChangeHandle = (e) => {
    setCouponDiscountLimit(e.target.value)
  }
  const addCouponOnClickHandle = async () => {
    if (!couponNameInput) {
      notify("warning", "ادخل اسم الكوبون")
      couponNameInputRef.current.focus()
      return null
    } else if (!couponDateInput) {
      notify("warning", "ادخل تاريخ انتهاء الكوبون")
      couponDateInputRef.current.focus()
      return null
    } else if (!couponDiscount) {
      notify("warning", "ادخل نسبة خصم الكوبون")
      couponDiscountRef.current.focus()
      return null
    }

    setLoader(true)
    await dispatch(addCoupon({
      name: couponNameInput,
      expireDate: couponDateInput,
      discountPercentage: couponDiscount,
      maxDiscount: couponDiscountLimit ? couponDiscountLimit : undefined,
    }, "AdminAddCouponHook"))
    setLoader(false)
    setAddCouponIsClicked(true)
  }

  useEffect(() => {
    if (addCouponResponseIsLoaded && addCouponIsClicked) {
      if (addCouponResponse.status === 201) {
        notify("success", "تمت اضافة الكوبون بنجاح")
        dispatch(getAllCoupons("AdminAddCouponHook"))
        setCouponNameInput("")
        setCouponDateInput("")
        setCouponDiscount("")
        setCouponDiscountLimit("")
      } else {

        addCouponResponse?.response?.data?.error?.map(item => {
          if (item.msg === "found already try another name") {
            notify("warning", "الكوبون موجود مسبقا")
          }
          if (item.msg === "discountPercentage must be a number") {
            notify("warning", "نسبة خصم الكوبون يجب ان تكون رقم")
          }
          if (item.msg === "maxDiscount must be a number") {
            notify("warning", "الحد الاقصى للخصم يجب ان يكون رقم")
          }
        })
      }
    } else if (!addCouponResponseIsLoaded && addCouponIsClicked) {
      notify("error", "هناك مشكلة فى اضافة الكوبون حاول مرة اخرى")
    }
    setAddCouponIsClicked(false)
    // eslint-disable-next-line
  }, [addCouponIsClicked])

  //---------------------------------------------------------------------------------------




  //---------------------------------------------------------------------------------------
  // get all coupons

  useEffect(() => {
    dispatch(getAllCoupons("AdminAddCouponHook"))
    // eslint-disable-next-line
  }, [])
  
  //---------------------------------------------------------------------------------------




  //---------------------------------------------------------------------------------------
  // remove coupon

  const removeCouponOnClickHandle = async (id) => {
    await dispatch(removeCoupon(id, "AdminAddCouponHook"))
    setRemoveCouponIsClicked(true)
  }

  useEffect(() => {
    if (removeCouponResponse?.status === 200 && removeCouponIsClicked) {
      notify("success", "تم حذف الكوبون بنجاح")
      dispatch(getAllCoupons("AdminAddCouponHook"))
    } 
    


    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else if (removeCouponResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && removeCouponIsClicked) {
        notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
      }
    //------------------------------------------------------------------------------------------------------------------



    else if (!removeCouponResponseIsLoaded && removeCouponIsClicked) {
      notify("error", "هناك مشكلة فى حذف الكوبون")
    }
    setRemoveCouponIsClicked(false)
    //------ 
    setCouponNameInput("")
    setCouponDateInput("")
    setCouponDiscount("")
    setCouponDiscountLimit("")
    setEditCouponIsClicked(false)
    //------
    // eslint-disable-next-line
  }, [removeCouponIsClicked])
  //---------------------------------------------------------------------------------------




  //---------------------------------------------------------------------------------------
  // edit coupon

  const [editCouponID, setEditCouponID] =  useState('')

  const editCouponOnClickHandle = async (id) => {
    await dispatch(getSpecificCoupon(id, "AdminAddCouponHook"))
    setEditCouponIsClicked(true)
  }

  useEffect(() => {
    if (specificCouponData?.status === 200) {
      window.scrollTo(0, 0)
      setCouponNameInput(specificCouponData?.data?.name)
      setCouponDateInput(specificCouponData?.data?.expireDate)
      setCouponDiscount(specificCouponData?.data?.discountPercentage)
      setCouponDiscountLimit(specificCouponData?.data?.maxDiscount)
      setEditCouponID(specificCouponData?.data?._id)
    }
    // eslint-disable-next-line
  }, [specificCouponData])




  //------------------------------------------------------------------------------------------------------------------
  // Protected Content
  useEffect(() => {
      if (specificCouponData?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && editCouponIsClicked) {
        notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
        setEditCouponIsClicked(false)
      }
  }, [editCouponIsClicked])
  //------------------------------------------------------------------------------------------------------------------
  




  const saveEditCouponOnClickHandle = async () => {
    setLoader(true)
    await dispatch(updateCoupon(editCouponID, {

      name: couponNameInput.toString() !== specificCouponData?.data?.name.toString() ? couponNameInput : undefined,
      expireDate: couponDateInput,
      discountPercentage: couponDiscount,
      maxDiscount: couponDiscountLimit,
    }, "AdminAddCouponHook"))
    setLoader(false)
    setSaveEditCouponIsClicked(true)
  }


  useEffect(() => {
    if (updateCouponResponseIsLoaded && saveEditCouponIsClicked) {
      if (updateCouponResponse.status === 201) {
        notify("success", "تم تعديل الكوبون بنجاح")
        dispatch(getAllCoupons("AdminAddCouponHook"))
        setCouponNameInput("")
        setCouponDateInput("")
        setCouponDiscount("")
        setCouponDiscountLimit("")
        setEditCouponIsClicked(false)
      } else {
        updateCouponResponse?.response?.data?.error?.map(item => {
          if (item.msg === "found already try another name") {
            notify("warning", "الكوبون موجود مسبقا")
          }
          if (item.msg === "discountPercentage must be a number") {
            notify("warning", "نسبة خصم الكوبون يجب ان تكون رقم")
          }
          if (item.msg === "maxDiscount must be a number") {
            notify("warning", "الحد الاقصى للخصم يجب ان يكون رقم")
          }
        })
      }
    } else if (!updateCouponResponseIsLoaded && saveEditCouponIsClicked) {
      notify("error", "هناك مشكلة فى تحديث الكوبون حاول مرة اخرى")
    }
    setSaveEditCouponIsClicked(false)
    // eslint-disable-next-line
  }, [saveEditCouponIsClicked])
  
  //---------------------------------------------------------------------------------------
  

  return [couponNameInputOnChangeHandle, couponNameInput, couponDateInputOnChangeHandle, couponDateInput, couponDiscountInputOnChangeHandle, couponDiscount, addCouponOnClickHandle, couponNameInputRef, couponDateInputRef, couponDiscountRef, loader, allCouponsDataIsLoaded, allCouponsData, removeCouponOnClickHandle, editCouponOnClickHandle, editCouponIsClicked, saveEditCouponOnClickHandle, couponDiscountLimitRef, couponDiscountLimitInputOnChangeHandle, couponDiscountLimit]
}

export default AdminAddCouponHook
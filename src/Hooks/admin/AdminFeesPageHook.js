import { useDispatch, useSelector } from "react-redux"
import ToastifyNotification from "../ToastifyNotification"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { createFees, getAllFees, getSpecificFees, updateFees } from "../../Redux/Actions/FeesAction/feesAction"


const AdminFeesPageHook = () => {

  const [notify] = ToastifyNotification()

  const dispatch = useDispatch()
  const allFeesData = useSelector(state => state.getAllFeesReducer.allFeesData)
  const allFeesDataIsLoaded = useSelector(state => state.getAllFeesReducer.allFeesDataIsLoaded)
  const specificFeesData = useSelector(state => state.fessReducer.specificFeesData)
  const specificFeesDataIsLoaded = useSelector(state => state.fessReducer.specificFeesDataIsLoaded)
  const updateFeesResponse = useSelector(state => state.fessReducer.updateFeesResponse)
  const updateFeesResponseIsLoaded = useSelector(state => state.fessReducer.updateFeesResponseIsLoaded)

  const [shippingFeesInput, setShippingFeesInput] = useState("")
  const [taxFeesInput, setTaxFeesInput] = useState("")

  const [feesID, setFeesID] = useState("")

  const [saveEditFeesIsClicked, setSaveEditFeesIsClicked] =useState(false)

  const shippingFeesInputRef = useRef()
  const taxFeesInputRef = useRef()

  // Modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    dispatch(getAllFees("AdminFeesPageHook"))
  }, [])
  
  const editFeesOnClickHandle = async (id) => {
    setFeesID(id) 
    await dispatch(getSpecificFees(id, "AdminFeesPageHook"))
  }

  useEffect(() => {
    if (specificFeesData?.status === 200 ) {
      setShippingFeesInput(specificFeesData?.data?.shippingFees)
      setTaxFeesInput(specificFeesData?.data?.taxFeesPercentage)
      handleShow()
    }
  }, [specificFeesData])
  

  const shippingFeesInputOnChangeHandle = (e) => {
    setShippingFeesInput(e.target.value)
  }
  const taxFeesInputOnChangeHandle = (e) => {
    setTaxFeesInput(e.target.value)
  }
  const saveEditFeesOnClickHandle = async () => {
    if (!shippingFeesInput) {
      notify("warning", "يجب ادخال قيمة الشحن اولا")
      shippingFeesInputRef.current.focus()
      return
    }
    if (!taxFeesInput) {
      notify("warning", "يجب ادخال قيمة نسبة الضريبة المؤية اولا")
      taxFeesInputRef.current.focus()
      return
    }
    dispatch(updateFees(feesID, {
      shippingFees: shippingFeesInput,
      taxFeesPercentage: taxFeesInput,
    }, "AdminFeesPageHook"))
    setSaveEditFeesIsClicked(true)
  }

  useEffect(() => {
    if (updateFeesResponseIsLoaded && saveEditFeesIsClicked) {
      if (updateFeesResponse?.status === 201) {
        dispatch(getAllFees("AdminFeesPageHook"))
        handleClose()
        notify("success", "تم تغيير القيمة بنجاح")
      } else if (updateFeesResponse?.response?.data?.error) {
        if (updateFeesResponse?.response?.data?.error?.statusMessage) {
          notify("error", "يوجد مشكلة حاول مرة اخرى")
        } else {
          updateFeesResponse?.response?.data?.error.map(item => {
            if (item.msg === "shippingFees must be a number") {
              notify("warning", "قيمة الشحن يجب ان تكون رقم")
            }
            if (item.msg === "taxFeesPPercentage must be a number") {
              notify("warning", "نسبة الضريبة يجب ان تكون رقم")
            }
          })
        }
      } else {
        notify("error", "يوجد مشكلة حاول مرة اخرى")
      }
    } else if (!updateFeesResponseIsLoaded && saveEditFeesIsClicked) {
      notify("error", "يوجد مشكلة حاول مرة اخرى")
    }
    setSaveEditFeesIsClicked(false)
  }, [updateFeesResponse])

  
  const createFeesResponse = useSelector(state => state.fessReducer.createFeesResponse)
  const createFeesResponseIsLoaded = useSelector(state => state.fessReducer.createFeesResponseIsLoaded)

  const [shippingFees, setShippingFees] = useState("")
  const [taxFeesPercentage, setTaxFeesPercentage] = useState("")

  const [loader, setLoader] = useState(false)
  const [createFeesIsClicked, setCreateFeesIsClicked] = useState(false)

  const shippingFeesRef = useRef()
  const taxFeesPercentageRef = useRef()

  const shippingFeesOnChangeHandle = (e) => {
    setShippingFees(e.target.value)
  }

  const taxFeesPercentageOnChangeHandle = (e) => {
    setTaxFeesPercentage(e.target.value)
  }

  const addBtnOnClickHandle = async () => {
    if (!shippingFees) {
      notify("warning", "يجب ادخال قيمة الشحن اولا")
      shippingFeesRef.current.focus()
      return
    }
    if (!taxFeesPercentage) {
      notify("warning", "يجب ادخال قيمة نسبة الضريبة المؤية اولا")
      taxFeesPercentageRef.current.focus()
      return
    }
    setLoader(true)
    await dispatch(createFees(
      {
        scope: "global",
        shippingFees: shippingFees,
        taxFeesPercentage: taxFeesPercentage
      }, "AdminFeesPageHook"))
      setLoader(false)
      setCreateFeesIsClicked(true)
  }

  useEffect(() => {
    if (createFeesResponseIsLoaded && createFeesIsClicked) {
      if (createFeesResponse.status === 201) {
        notify("success", "تمت اضافة الشحن والضريبة بنجاح")
        dispatch(getAllFees("AdminFeesPageHook"))
        setShippingFees("")
        setTaxFeesPercentage("")
      }
    }
    setCreateFeesIsClicked(false)
  }, [createFeesIsClicked])
  
  

  return [show, handleClose, shippingFeesInputRef, shippingFeesInputOnChangeHandle, shippingFeesInput, taxFeesInputRef, taxFeesInputOnChangeHandle, taxFeesInput, saveEditFeesOnClickHandle, allFeesData, allFeesDataIsLoaded, editFeesOnClickHandle, shippingFeesOnChangeHandle, shippingFees, taxFeesPercentageOnChangeHandle, taxFeesPercentage, addBtnOnClickHandle, loader, shippingFeesRef, taxFeesPercentageRef]
}

export default AdminFeesPageHook
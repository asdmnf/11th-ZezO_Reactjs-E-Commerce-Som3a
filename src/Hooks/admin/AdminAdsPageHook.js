import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import addImage from "../../Assets/images/add-image.png";
import { createCarousel, getAllCarousel, updateCarousel } from "../../Redux/Actions/CarouselAction/carouselAction";
import ToastifyNotification from "../ToastifyNotification";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AdminAdsPageHook = () => {

  const [notify] = ToastifyNotification()

  const navigateTo = useNavigate()

  const dispatch = useDispatch()
  const createCarouselResponse = useSelector(state => state.carouselOperationsReducer.createCarouselResponse)
  const createCarouselResponseIsLoaded = useSelector(state => state.carouselOperationsReducer.createCarouselResponseIsLoaded)
  const specificCarouselData = useSelector(state => state.carouselOperationsReducer.specificCarouselData)
  const specificCarouselDataIsLoaded = useSelector(state => state.carouselOperationsReducer.specificCarouselDataIsLoaded)
  const updateCarouselResponse = useSelector(state => state.carouselOperationsReducer.updateCarouselResponse)
  const updateCarouselResponseIsLoaded = useSelector(state => state.carouselOperationsReducer.updateCarouselResponseIsLoaded)

  const [img, setImg] = useState()
  const [urlImg, setUrlImg] = useState(addImage)
  const [color, setColor] = useState("")
  const [discountText, setDiscountText] = useState("")
  const [text, setText] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("")

  const [addBtnIsClicked, setAddBtnIsClicked] = useState(false)
  const [loader, setLoader] = useState(false)



  // add carousel

  const backgroundOnChangeHandle = (e) => {
    setSelectedMethod(e.target.id)
  }
  const foregroundOnChangeHandle = (e) => {
    setSelectedMethod(e.target.id)
  }
  const fileInputOnChangeHandle = (e) => {
    setImg(e.target.files[0])
    setUrlImg(URL.createObjectURL(e.target.files[0]))
  }
  const textInputOnChangeHandle = (e) => {
    setText(e.target.value)
  }
  const colorInputOnChangeHandle = (e) => {
    setColor(e.target.value)
  }
  const discountTextInputOnChangeHandle = (e) => {
    setDiscountText(e.target.value)
  }
  const addBtnOnClickHandle = async () => {
    if (selectedMethod === "background") {
      if (!img) {
        notify("warning", "يجب ادخال صورة اولا")
        return
      }
      const formData = new FormData()
      formData.append("backgroundImage", img)
      formData.append("searchWord", text)
      setLoader(true)
      if (specificCarouselData?.data?.backgroundImage) {
        await dispatch(updateCarousel(specificCarouselData?.data?._id, formData, "AdminAdsPageHook"))
      } else {
        await dispatch(createCarousel(formData, "AdminAdsPageHook"))
      }
      setLoader(false)
      setAddBtnIsClicked(true)
    } else if (selectedMethod === "foreground") {
      if (!color) {
        notify("warning", "يجب ادخال لون خلفية اولا")
        return
      }
      const formData = new FormData()
      formData.append("foregroundImage", img)
      formData.append("backgroundColor", color)
      formData.append("title", discountText)
      formData.append("searchWord", text)
      setLoader(true)
      if (specificCarouselData?.data?.foregroundImage) {
        await dispatch(updateCarousel(specificCarouselData?.data?._id, formData, "AdminAdsPageHook"))
      } else {
        await dispatch(createCarousel(formData, "AdminAdsPageHook"))
      }
      setLoader(false)
      setAddBtnIsClicked(true)
    }
  }

  useEffect(() => {
    if ((createCarouselResponseIsLoaded || updateCarouselResponseIsLoaded) && addBtnIsClicked) {
      if (createCarouselResponse?.status === 201 || updateCarouselResponse?.status === 201) {
        dispatch(getAllCarousel("AdminAdsPageHook"))
        notify("success", "تم حفظ الخلفية بنجاح")
        setUrlImg(addImage)
        setImg(null)
        setText("")
        setDiscountText("")
        setColor("")
        navigateTo("/")
      } else {
        notify("error", "حدث خطأ حاول مرة اخرى")
      }
    } else if ((!createCarouselResponseIsLoaded || !updateCarouselResponseIsLoaded) && addBtnIsClicked) {
      notify("error", "حدث خطأ حاول مرة اخرى")
    }
    setAddBtnIsClicked(false)
  }, [addBtnIsClicked])

  // edit carousel
  const backgroundRadioRef = useRef()
  const foregroundRadioRef = useRef()

  useEffect(() => {
    if (specificCarouselData?.status === 200) {
      if (specificCarouselData?.data?.backgroundImage) {
        backgroundRadioRef.current.checked = true
        setSelectedMethod("background")
        setUrlImg(specificCarouselData?.data?.backgroundImage)
        setImg(specificCarouselData?.data?.backgroundImage.split("/")[4])
        setText(specificCarouselData?.data?.searchWord)
      }
    }
    if (specificCarouselData?.status === 200) {
      if (specificCarouselData?.data?.foregroundImage) {
        foregroundRadioRef.current.checked = true
        setSelectedMethod("foreground")
        setUrlImg(specificCarouselData?.data?.foregroundImage)
        setImg(specificCarouselData?.data?.foregroundImage.split("/")[4])
        setColor(specificCarouselData?.data?.backgroundColor)
        setDiscountText(specificCarouselData?.data?.title)
        setText(specificCarouselData?.data?.searchWord)
      }
    }
  }, [specificCarouselData])
  

  return [backgroundOnChangeHandle, foregroundOnChangeHandle, urlImg, fileInputOnChangeHandle, textInputOnChangeHandle, text, addBtnOnClickHandle, loader, colorInputOnChangeHandle, color, selectedMethod, discountTextInputOnChangeHandle, discountText, backgroundRadioRef, foregroundRadioRef]
}

export default AdminAdsPageHook
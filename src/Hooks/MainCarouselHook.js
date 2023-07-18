import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCarousel, getAllCarousel, getSpecificCarousel } from "../Redux/Actions/CarouselAction/carouselAction"
import ToastifyNotification from "./ToastifyNotification"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const MainCarouselHook = () => {

  const [notify] = ToastifyNotification()

  const navigateTo = useNavigate()

  const dispatch = useDispatch()
  const allCarouselData = useSelector(state => state.getAllCarouselReducer.allCarouselData)
  const allCarouselDataIsLoaded = useSelector(state => state.getAllCarouselReducer.allCarouselDataIsLoaded)
  const specificCarouselData = useSelector(state => state.carouselOperationsReducer.specificCarouselData)
  const specificCarouselDataIsLoaded = useSelector(state => state.carouselOperationsReducer.specificCarouselDataIsLoaded)
  const ddeleteCarouselResponse = useSelector(state => state.carouselOperationsReducer.ddeleteCarouselResponse)
  const ddeleteCarouselResponseIsLoaded = useSelector(state => state.carouselOperationsReducer.ddeleteCarouselResponseIsLoaded)

  const [deleteCarouselIsClicked, setDeleteCarouselIsClicked] = useState(false)
  const [editCarouselIsClicked, setEditCarouselIsClicked] = useState(false)

  const editCarouselOnClickHandle = async (id) => {
    await dispatch(getSpecificCarousel(id, "MainCarouselHook"))
    setEditCarouselIsClicked(true)
  }

    useEffect(() => {
      if (specificCarouselData?.status === 200) {
        navigateTo("/admin/ads")
      }



    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
        else if (specificCarouselData?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && editCarouselIsClicked) {
          notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
        }
        setEditCarouselIsClicked(false)
    }, [editCarouselIsClicked])
    //------------------------------------------------------------------------------------------------------------------

  

  // delete carousel
  const deleteCarouselOnClickHandle = async (id) => {
    await dispatch(deleteCarousel(id, "MainCarouselHook"))
    setDeleteCarouselIsClicked(true)
  }

  useEffect(() => {
    if (ddeleteCarouselResponse?.data === "document Deleted Successfully" && deleteCarouselIsClicked) {
      dispatch(getAllCarousel("MainCarouselHook"))
      notify("success", "تم الحذف بنجاح")
    } 
    


    //------------------------------------------------------------------------------------------------------------------
    // Protected Content
    else {
      if (ddeleteCarouselResponse?.response?.data?.error?.statusMessage === "protected content! only new content can be deleted" && deleteCarouselIsClicked) {
        notify("warning", "محتوى مأمن الجديد فقط هو المسموح بحذفه او تعديله")
      }
    }
    //------------------------------------------------------------------------------------------------------------------


    
    setDeleteCarouselIsClicked(false)
  }, [deleteCarouselIsClicked])

  return [allCarouselData, editCarouselOnClickHandle, deleteCarouselOnClickHandle]
}

export default MainCarouselHook
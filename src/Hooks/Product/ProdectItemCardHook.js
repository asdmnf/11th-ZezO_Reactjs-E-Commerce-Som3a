import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToWishList, getAllWishList, removeWishList } from "../../Redux/Actions/WishListAction/wishListAction"
import ToastifyNotification from "../ToastifyNotification"


const ProdectItemCardHook = (wishListData, wishListDataIsLoaded, productID) => {

  const [notify] = ToastifyNotification()
  const dispatch = useDispatch()
  const addWishListResponse = useSelector(state => state.WishListReducer.addWishListResponse)
  const addWishListResponseIsLoaded = useSelector(state => state.WishListReducer.addWishListResponseIsLoaded)
  const removeWishListResponse = useSelector(state => state.WishListReducer.removeWishListResponse)
  const removeWishListResponseIsLoaded = useSelector(state => state.WishListReducer.removeWishListResponseIsLoaded)

  const [favIconIsClicked, setFavIconIsClicked] = useState(false)

  const [showSolidFavIcon, setShowSolidFavIcon] = useState(false)




  const favIconOnClickHandle = async (id) => {
    if (!localStorage.getItem("userData")){
      notify("warning", "قم بتسجيل الدخول أولا")
      return false
    }
    if (wishListDataIsLoaded){ 
      const filteredWishListData =  wishListData.data.some(item => item.product._id === id)
      if (!filteredWishListData){
        await dispatch(addToWishList({
        product: id
      }, "ProdectItemCardHook"))
      setShowSolidFavIcon(true)
    } else if (filteredWishListData){
      await dispatch(removeWishList(id, "ProdectItemCardHook"))
      setShowSolidFavIcon(false)
    }
    setFavIconIsClicked(true)
  }
}

useEffect(() => {
    if (wishListDataIsLoaded && wishListData.status === 200 && localStorage.getItem("userRole") === "user"){ 
        const filteredWishListData =  wishListData.data.some(item => item.product._id === productID)
        if (!filteredWishListData){
        setShowSolidFavIcon(false)
        } else if (filteredWishListData){
        setShowSolidFavIcon(true)
        }
  }
// eslint-disable-next-line
}, [wishListData])

const lsUserData = localStorage.getItem("userData");
useEffect(() => {
  if (!localStorage.getItem("userData")){
    setShowSolidFavIcon(false)
  }
}, [lsUserData])


  useEffect(() => {
    if (addWishListResponseIsLoaded && favIconIsClicked){
      if (addWishListResponse.status === 201){
        notify("success", "تم الاضافة للمفضلة بنجاح")
        dispatch(getAllWishList("ProdectItemCardHook"))
      } else {
        notify("error", "هناك مشكلة فى عملية الاضافة حاول مرة اخرى")
      }
    }
    if (removeWishListResponseIsLoaded && favIconIsClicked){
      if (removeWishListResponse.status === 200){
        notify("success", "تم الحذف من المفضلة بنجاح")
        dispatch(getAllWishList("ProdectItemCardHook"))
      } else {

        if (removeWishListResponse?.response?.data?.error?.statusMessage) {
          if (removeWishListResponse?.response?.data?.error?.statusMessage === "wishlistDocument not found check product id") {
            notify("error", "الرقم التعريفى غير صحيح")
          }
        } else {
          notify("error", "هناك مشكلة فى عملية الحذف حاول مرة اخرى")
        }
      }
    }
    setFavIconIsClicked(false)
    // eslint-disable-next-line
  }, [favIconIsClicked])

  return [favIconOnClickHandle, showSolidFavIcon]
}

export default ProdectItemCardHook
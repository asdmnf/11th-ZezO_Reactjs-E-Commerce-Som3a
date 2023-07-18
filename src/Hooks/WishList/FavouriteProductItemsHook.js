import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllWishList, removeWishList } from "../../Redux/Actions/WishListAction/wishListAction"
import ToastifyNotification from "../ToastifyNotification"


const FavouriteProductItemsHook = () => {
  const [notify] = ToastifyNotification()
  const dispatch = useDispatch()

  const wishListData = useSelector(state => state.WishListReducer.wishListData)
  const wishListDataIsLoaded = useSelector(state => state.WishListReducer.wishListDataIsLoaded)
  const removeWishListResponse = useSelector(state => state.WishListReducer.removeWishListResponse)
  const removeWishListResponseIsLoaded2 = useSelector(state => state.WishListReducer.removeWishListResponseIsLoaded)

  const [favIconIsClicked, setFavIconIsClicked] = useState(false)

  // eslint-disable-next-line
  const [showSolidFavIcon, setShowSolidFavIcon] = useState(true)


  const favIconOnClickHandle = async (id) => {
  await dispatch(removeWishList(id, "FavouriteProductItemsHook"))
  setFavIconIsClicked(true)
}

  useEffect(() => {
    if (removeWishListResponseIsLoaded2 && favIconIsClicked){
      if (removeWishListResponse.status === 200){
        notify("success", "تم الحذف من المفضلة بنجاح")
        dispatch(getAllWishList("FavouriteProductItemsHook"))
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

  // useEffect(() => {
  //   // dispatch(getAllWishList("FavouriteProductItemsHook"))
  //   // eslint-disable-next-line
  // }, [])
  

  return [wishListData, wishListDataIsLoaded, favIconOnClickHandle, showSolidFavIcon]
}

export default FavouriteProductItemsHook
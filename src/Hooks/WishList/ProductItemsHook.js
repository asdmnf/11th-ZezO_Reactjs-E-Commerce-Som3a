



import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllWishList } from "../../Redux/Actions/WishListAction/wishListAction"


const ProductItemsHook = () => {

  const dispatch = useDispatch()

  const wishListData = useSelector(state => state.WishListReducer.wishListData)
  const wishListDataIsLoaded = useSelector(state => state.WishListReducer.wishListDataIsLoaded)


  return [wishListData, wishListDataIsLoaded]
}

export default ProductItemsHook
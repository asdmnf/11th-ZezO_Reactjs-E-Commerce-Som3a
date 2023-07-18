


import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCartItems } from "../../Redux/Actions/CartAction/cartAction"
import { getAllWishList } from "../../Redux/Actions/WishListAction/wishListAction"
import { useLocation } from "react-router-dom"
import { getAllCategoryData2 } from "../../Redux/Actions/categoryAction"
import { getAllBrandData2 } from "../../Redux/Actions/brandAction"
import { getHomeProduct, homeDevicesProductsAction, marketProductsAction, mostSalesProductsAction, samsungProductsAction } from "../../Redux/Actions/productAction/productAction"
import { getAllCarousel } from "../../Redux/Actions/CarouselAction/carouselAction"
import { getLoggedUserData2 } from "../../Redux/Actions/LoggedUserDataAction2/LoggedUserDataAction2"
import { resetAnyData } from "../../Redux/Actions/linkAction"


const HeaderCartButtonHook = () => {

  const path = useLocation()
  if (path.pathname !== "/search-result"){
    sessionStorage.clear()
  }

  useEffect(() => {
    dispatch(resetAnyData("HeaderCartButtonHook"))
  
  }, [sessionStorage.getItem("search-value")])
  
  
  const dispatch = useDispatch()
  const allCartData = useSelector(state => state.cartReducer.allCartData)
  const allCartDataIsLoaded = useSelector(state => state.cartReducer.allCartDataIsLoaded)
  useEffect(() => { 
    if (localStorage.getItem('userData') && localStorage.getItem('userRole') === "user"){


      dispatch(getAllCartItems("HeaderCartButtonHook"))
      dispatch(getAllWishList("HeaderCartButtonHook"))
    }

    // جديد تحسين الدسيباتش
    dispatch(getAllCategoryData2("HeaderCartButtonHook"))
    dispatch(getAllBrandData2("HeaderCartButtonHook"))
    dispatch(getHomeProduct("HeaderCartButtonHook-NewProducts"))

    dispatch(mostSalesProductsAction("HeaderCartButtonHook", 8, "&sort=-sold"))
    dispatch(marketProductsAction("HeaderCartButtonHook", 8, "&mainCategory=646402b6112a846cfcecc97c"))
    dispatch(homeDevicesProductsAction("HeaderCartButtonHook", 8, "&mainCategory=6466be98de0a035fda036340"))
    dispatch(samsungProductsAction("HeaderCartButtonHook", 8, "&brand=6466c273de0a035fda03635d"))
    dispatch(getAllCarousel("HeaderCartButtonHook"))

      // eslint-disable-next-line
  }, [])

  return [allCartDataIsLoaded, allCartData]
}

export default HeaderCartButtonHook
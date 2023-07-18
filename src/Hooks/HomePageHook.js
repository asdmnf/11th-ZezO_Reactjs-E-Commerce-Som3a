import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHomeProduct, homeDevicesProductsAction, marketProductsAction, mostSalesProductsAction, samsungProductsAction } from "../Redux/Actions/productAction/productAction"



const HomePageHook = () => {

  const dispatch = useDispatch()
  const productData = useSelector(state => state.productHomeReducer.product)
  const isLoaded = useSelector(state => state.productHomeReducer.isLoaded)
  const mostSalesProducts = useSelector(state => state.mostSalesProductsReducer.mostSalesProducts)
  const mostSalesProductsIsLoaded = useSelector(state => state.mostSalesProductsReducer.mostSalesProductsIsLoaded)
  const marketProducts = useSelector(state => state.marketProductsReducer.marketProducts)
  const marketProductsIsLoaded = useSelector(state => state.marketProductsReducer.marketProductsIsLoaded)
  const homeDevicesProducts = useSelector(state => state.homeDevicesProductsReducer.homeDevicesProducts)
  const homeDevicesProductsIsLoaded = useSelector(state => state.homeDevicesProductsReducer.homeDevicesProductsIsLoaded)
  const samsungProducts = useSelector(state => state.samsungProductsReducer.samsungProducts)
  const samsungProductsIsLoaded = useSelector(state => state.samsungProductsReducer.samsungProductsIsLoaded)
  
  // useEffect(() => {
  //   // dispatch(getHomeProduct("HomePageHook-NewProducts"))
  //   // dispatch(mostSalesProductsAction("HomePageHook", 8, "&sort=-sold"))
  //   // dispatch(marketProductsAction("HomePageHook", 8, "&mainCategory=643248e9e2b2681ccd2f9e3c"))
  //   // dispatch(homeDevicesProductsAction("HomePageHook", 8, "&mainCategory=643248c6e2b2681ccd2f9e39"))
  //   // dispatch(samsungProductsAction("HomePageHook", 8, "&brand=6432cdb59713230ffc3caf68"))
  //   // dispatch(queryProduct("-sold"))
  //   // eslint-disable-next-line
  // }, [])
  
  let slicedProductData = []
  if (productData.data){
    slicedProductData = productData.data.slice(0, 8)
  }

  const newestProductsBtnOnClickHandle = () => { // خاص بقسم المنتجات الحديثة
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("topLeftSortValue", `-updatedAt`)
    sessionStorage.setItem("allCategoryBoxCheck", "true")
    sessionStorage.setItem("allBrandBoxCheck", "true")
  }

  const mostSalestProductsBtnOnClickHandle = () => { // خاص بقسم المنتجات الاكثر مبيعا
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("topLeftSortValue", `-sold`)
    sessionStorage.setItem("allCategoryBoxCheck", "true")
    sessionStorage.setItem("allBrandBoxCheck", "true")
  }

  const marketProductsBtnOnClickHandle = () => { // خاص بقسم منتجات السوبر ماركت
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("categorySortValue", `mainCategory=646402b6112a846cfcecc97c`)
    sessionStorage.setItem("646402b6112a846cfcecc97c", "646402b6112a846cfcecc97c")
    sessionStorage.setItem("allBrandBoxCheck", "true")
  }

  const homeDevicesProductsBtnOnClickHandle = () => { // خاص بقسم منتجات الاجهزة المنزلية
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("categorySortValue", `mainCategory=6466be98de0a035fda036340`)
    sessionStorage.setItem("6466be98de0a035fda036340", "6466be98de0a035fda036340")
    sessionStorage.setItem("allBrandBoxCheck", "true")
  }

  const samsungBrandProductsBtnOnClickHandle = () => { // خاص بقسم منتجات سامسونج الغرض منها تعرض ماركة بدل تصنيف
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("brandSortValue", `brand=6466c273de0a035fda03635d`)
    sessionStorage.setItem("6466c273de0a035fda03635d", "6466c273de0a035fda03635d")
    sessionStorage.setItem("allCategoryBoxCheck", "true")
  }
  

  return [slicedProductData, isLoaded, newestProductsBtnOnClickHandle, mostSalestProductsBtnOnClickHandle, marketProductsBtnOnClickHandle, homeDevicesProductsBtnOnClickHandle, samsungBrandProductsBtnOnClickHandle, mostSalesProducts, mostSalesProductsIsLoaded, marketProducts, marketProductsIsLoaded, homeDevicesProducts, homeDevicesProductsIsLoaded, samsungProducts, samsungProductsIsLoaded]
}

export default HomePageHook
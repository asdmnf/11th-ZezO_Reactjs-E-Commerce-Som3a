




import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHomeProduct, getPageProduct } from "../../Redux/Actions/productAction/productAction"


const MostSalesPageHook = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPageProduct(8, 1, "MostSalesPageHook"))
    dispatch(getHomeProduct("MostSalesPageHook"))
    // eslint-disable-next-line
  }, [])
  
  const isLoaded = useSelector(state => state.productPageReducer.isLoaded)
  const productData = useSelector(state => state.productPageReducer.product?.data)
  const totalPages = useSelector(state => state.productPageReducer.totalPages)
  const totalProductsLength = useSelector(state => state.productHomeReducer.product?.data)

  const pageNumHandle = (pageNum) => {
    dispatch(getPageProduct(8, pageNum, "MostSalesPageHook"))
  }

  return [totalPages, pageNumHandle, productData, totalProductsLength, isLoaded]
}

export default MostSalesPageHook
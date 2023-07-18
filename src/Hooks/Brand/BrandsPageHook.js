import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBrandData } from "../../Redux/Actions/brandAction"


const BrandsPageHook = () => {
  

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllBrandData("BrandsPageHook", 8, 1))
    // eslint-disable-next-line
  }, [])

  const totalPages = useSelector(state => state.brandReducer.totalPages)
  const data = useSelector(state => state.brandReducer.brandData)
  const isLoaded = useSelector(state => state.brandReducer.isLoaded)

  const pageNumHandle = (pageNum) => {
    dispatch(getAllBrandData("BrandsPageHook", 8, pageNum))
  }
  

  return [totalPages, pageNumHandle, data, isLoaded]
}

export default BrandsPageHook
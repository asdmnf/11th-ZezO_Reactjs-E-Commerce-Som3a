import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategoryPage } from "../../Redux/Actions/categoryAction"


const CategoryPageHook = () => {
  
  useEffect(() => {
    dispatch(getAllCategoryPage("CategoryPageHook", 10, 1))
    // eslint-disable-next-line
  }, [])

  const data = useSelector(state => state.categoryReducer.category.data)
  const isLoaded = useSelector(state => state.categoryReducer.isLoaded)
  const totalPages = useSelector(state => state.categoryReducer.totalPages)
  const dispatch = useDispatch()
  const bgColors = ["#6610f2","#6f42c1","#d63384","#fd7e14","#20c997","#343a40","#0d6efd","#6c757d","#198754","#0dcaf0","#ffc107","#dc3545","wheat"]

  const pageNumHandle = (pagenum)=>{
    dispatch(getAllCategoryPage("CategoryPageHook", 10, pagenum))
  }

  return [data, isLoaded, totalPages, bgColors, pageNumHandle]

}

export default CategoryPageHook
import { useNavigate } from "react-router-dom"


const BrandItemHook = () => {


  const navigateTo = useNavigate()

  const brandOnClickHandle = (id) => {
    sessionStorage.setItem("search-value", ``)
    sessionStorage.setItem("brandSortValue", `brand=${id}`)
    sessionStorage.setItem(id, id)
    sessionStorage.setItem("allCategoryBoxCheck", "true")
    navigateTo("/search-result")
  }

  return [brandOnClickHandle]
}

export default BrandItemHook
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBrandData2 } from "../../Redux/Actions/brandAction"


const BrandsHook = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   // dispatch(getAllBrandData2("BrandsHook"))
  //   // eslint-disable-next-line
  // }, [])

  // const data = useSelector(state => state.brandReducer.brandData)
  // const isLoaded = useSelector(state => state.brandReducer.isLoaded)
  const data = useSelector(state => state.brand2Reducer.allBrandData);
  const isLoaded = useSelector(state => state.brand2Reducer.allBrandDataIsLoaded);

  return [data, isLoaded]

}

export default BrandsHook
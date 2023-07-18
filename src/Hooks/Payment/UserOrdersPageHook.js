import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders, getLoggedUserOrders } from "../../Redux/Actions/PaymentAction/PaymentAction"


const UserOrdersPageHook = () => {

  const dispatch = useDispatch()
  const allOrdersData = useSelector(state => state.paymentReducer.allOrdersData)
  const allOrdersDataIsLoaded = useSelector(state => state.paymentReducer.allOrdersDataIsLoaded)

  useEffect(() => {
    // dispatch(getAllOrders("UserOrdersPageHook"))
    dispatch(getLoggedUserOrders("UserOrdersPageHook"))
    // eslint-disable-next-line
  }, [])
  

  return [allOrdersDataIsLoaded, allOrdersData]
}

export default UserOrdersPageHook
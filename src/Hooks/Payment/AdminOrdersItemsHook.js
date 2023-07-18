import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders } from "../../Redux/Actions/PaymentAction/PaymentAction"


const AdminOrdersItemsHook = () => {

  const dispatch = useDispatch()
  const allOrdersData = useSelector(state => state.paymentReducer.allOrdersData)
  const allOrdersDataIsLoaded = useSelector(state => state.paymentReducer.allOrdersDataIsLoaded)

  useEffect(() => {
    dispatch(getAllOrders("AdminOrdersItemsHook"))
    // eslint-disable-next-line
  }, [])

  return [allOrdersDataIsLoaded, allOrdersData]
}

export default AdminOrdersItemsHook
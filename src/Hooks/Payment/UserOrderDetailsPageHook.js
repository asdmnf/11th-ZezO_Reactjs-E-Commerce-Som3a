import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getspecificOrder } from "../../Redux/Actions/PaymentAction/PaymentAction"


const UserOrderDetailsPageHook = () => {

  const orderID = useParams()

  const dispatch = useDispatch()
  const specificOrderData = useSelector(state => state.paymentReducer.specificOrderData)
  const specificOrderDataIsLoaded = useSelector(state => state.paymentReducer.specificOrderDataIsLoaded)


  useEffect(() => {
    dispatch(getspecificOrder(orderID.id, "UserOrderDetailsPageHook"))
    // eslint-disable-next-line
  }, [])


  return [specificOrderDataIsLoaded, specificOrderData]
}

export default UserOrderDetailsPageHook


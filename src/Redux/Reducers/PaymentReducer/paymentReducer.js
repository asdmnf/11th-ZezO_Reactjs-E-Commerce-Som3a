import { ADD_UPDATE, CHECKOUT_SESSION, CREATE_CASH_ORDER, DELETE_UPDATE, DELIVER_UPDATE, GET_ALL_ORDERS, GET_SPECIFIC_ORDER, PAID_UPDATE } from "../../types"


const initialValue = {
  createCashOrderResponseIsLoaded: false,
  allOrdersDataIsLoaded: false,
  specificOrderDataIsLoaded: false,
  paidUpdateResponseIsLoaded: false,
  deliverUpdateResponseIsLoaded: false,
  checkoutSessionDataIsLoaded: false,
  // addUpdateResponseIsLoaded: false,
  // deleteUpdateResponseIsLoaded: false,
  createCashOrderResponse: [],
  allOrdersData: [],
  specificOrderData: [],
  paidUpdateResponse: [],
  deliverUpdateResponse: [],
  checkoutSessionData: [],
  // addUpdateResponse: [],
  // deleteUpdateResponse: [],
}

const paymentReducer = (state = initialValue, action)=>{
  
  switch(action.type){
    case CREATE_CASH_ORDER: return {
      createCashOrderResponseIsLoaded: true,
      createCashOrderResponse: action.payload,
    }
    case GET_ALL_ORDERS: return {
      allOrdersDataIsLoaded: true,
      allOrdersData: action.payload,
    }
    case GET_SPECIFIC_ORDER: return {
      specificOrderDataIsLoaded: true,
      specificOrderData: action.payload,
    }
    case PAID_UPDATE: return {
      paidUpdateResponseIsLoaded: true,
      paidUpdateResponse: action.payload,
    }
    case DELIVER_UPDATE: return {
      deliverUpdateResponseIsLoaded: true,
      deliverUpdateResponse: action.payload,
    }
    case CHECKOUT_SESSION: return {
      checkoutSessionDataIsLoaded: true,
      checkoutSessionData: action.payload,
    }
    // case ADD_UPDATE: return {
    //   addUpdateResponseIsLoaded: true,
    //   addUpdateResponse: action.payload,
    // }
    // case DELETE_UPDATE: return {
    //   deleteUpdateResponseIsLoaded: true,
    //   deleteUpdateResponse: action.payload,
    // }
    default: return state
  }
}

export default paymentReducer
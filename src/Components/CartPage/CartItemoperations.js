import { Link } from 'react-router-dom'
import CartPageButton from './CartPageButton'
import Spinner from "react-bootstrap/Spinner";
import './CartItemoperations.css'

const CartItemoperations = (props) => {
  return (
    <div className='cart-item-operations'>
      <div className='cart-item-operations__dicount-coupon d-flex'>
        <input type="text" placeholder='كود الخصم' onChange={props.applyCouponInputOnChangeHandle} value={props.applyCouponInput} />
        <CartPageButton>
          <button onClick={props.applyCouponOnClickHandle}>
            تطبيق
            <Spinner animation="border" className={`apply-coupon-spinner ${!props.loader ? `d-none` : null}`} />
            </button>
        </CartPageButton>
      </div>
      <ul className="pe-3 mt-3">
        <li className="text-secondary">
          قيمة الشحن : {" "}
          <span className='text-dark'>
            {props.allCartDataIsLoaded && props.allCartData.status === 200 && props.allCartData.data?.shippingFees ? (parseInt(props.allCartData.data.shippingFees)) : `...` }
          </span>
        </li>
        <li className="text-secondary" title='14% حسب القانون المصرى'>
          قيمة الضريبة : {" "}
          <span className='text-dark'>
            {props.allCartDataIsLoaded && props.allCartData.status === 200 && props.allCartData.data?.taxFees ? (parseInt(props.allCartData.data.taxFees)) : `...` }
          </span>
        </li>
      </ul>


      <div className={`pe-3  ${props.allCartDataIsLoaded && props.allCartData?.status === 200 && props.allCartData.data?.totalPriceAfterDiscount ? `` : `d-none`} `}>
        <ul className="ul">
          <li className="text-secondary"> قبل الخصم : <span className='text-dark'>{props.allCartDataIsLoaded && props.allCartData.status === 200 && props.allCartData.data?.totalPriceAfterDiscount ? (parseInt(props.allCartData.data.totalPrice)) : `...` }</span></li>
          <li className="text-secondary">قيمة الخصم : <span className='text-dark'>{props.allCartDataIsLoaded && props.allCartData.status === 200 && props.allCartData.data?.totalPriceAfterDiscount ? (parseInt(props.allCartData.data?.totalPrice - props.allCartData.data?.totalPriceAfterDiscount)) : `...` }</span></li>
        </ul>
      </div>
      <div className="cart-item-operations__total-price d-flex mt-3">
        <div className="text-bg-dark h-100 px-2 py-1">الإجمالى</div>
        <div className=" w-100 d-flex justify-content-center align-items-center">
          {
            props.allCartDataIsLoaded && props.allCartData.status === 200 ? (
              props.allCartData.data?.totalPriceAfterDiscount ? (
                parseInt(props.allCartData.data?.totalPriceAfterDiscount)
              ) : parseInt(props.allCartData.data?.totalPrice)
            ) : ''
          }
        </div>
      </div>
      <div className="cart-item-operations__proceed-btn mt-3">
        <Link to={`${!localStorage.getItem("userData") ? `/login` : `/cart/payment-method` }`}>
          <CartPageButton>
            <button disabled={props.disabledBTN === true ? true : false}>اتمام الشراء</button>
          </CartPageButton>
        </Link>
      </div>
    </div>
  )
}

export default CartItemoperations
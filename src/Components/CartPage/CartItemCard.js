import { Link } from "react-router-dom";
import CartItemCardHook from "../../Hooks/Cart/CartItemCardHook";
import "./CartItemCard.css";


const CartItemCard = (props) => {
  const [cartItemQuantityOnChangeHandle, cartItemQuantityInput] = CartItemCardHook(props.productQuantity, props.productID)

  return (
    <div className="cart-item-card d-flex mb-3 shadow">
      <div className="col-sm-3 col-md-2 d-flex justify-content-center align-items-center">
        <Link to={`/product/${props.productID}`} >
          <div className="cart-item-card-image">
            <img src={props.productImageCover} alt="" />
          </div>
        </Link>
      </div>
      <div className="col-sm-9 col-md-10">
        <div className="cart-item-card-content">
          <div className="d-flex justify-content-between align-items-center">
            {props.adminOrderNumber === "yes" ? 
            <div className="cart-item-card-content__admin-order-number mb-3">رقم الطلب : <Link to="/admin/orders/254">254#</Link></div> : 
            <div className="cart-item-card-content-category mb-3">{props.productCategory}</div>}

            <div className={`cart-item-card-content-remove-icon ${props.removeIconDisplay}`}>
              <i className="fa-solid fa-trash" onClick={() => {props.deleteCartItemOnClickHandle(props.cartItemID)}}></i>
            </div>
          </div>
          <Link to={`/product/${props.productID}`} className="text-decoration-none">
            <div className="cart-item-card-content-title mb-2">{props.productTitle}</div>
          </Link>
          <div className={`cart-item-card-content-brand mb-2 ${props.brandDisplay} ${props.productBrand ? "" : "d-none"}`}>
            <span>الماركة: </span>
            {props.productBrand}
          </div>
          <div className={`cart-item-card-content-color mb-2 ${!props.productColor ? `d-none` : ``}`}>
            <span style={{ backgroundColor: `${props.productColor ? props.productColor : ""}`}}></span>
          </div>
          <div className="cart-item-card-content-quantity d-flex justify-content-between align-items-center">
            <div className="cart-item-card-content-quantity-count">
              الكمية
              <input type="number" min={1} onChange={(e) => cartItemQuantityOnChangeHandle(e, props.cartItemID)} value={cartItemQuantityInput || props.orderPageProductQuantity} disabled={props.orderPageProductQuantity ? true : false}  />
              <span className="quantity-star text-dark fs-5"> *</span> <span className="quantity-single-price text-success">{props.singleProductPrice} جنيه</span>
            </div>
            <div className="cart-item-card-content-quantity-price"><span 
            >{props.productPriceAfterDiscount ? props.productPriceAfterDiscount : props.productPrice}</span> جنيه</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

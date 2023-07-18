import { Link } from "react-router-dom";
import CartItemCard from "../../CartPage/CartItemCard";
import "./UserOrdersItems.css";

const UserOrdersItems = (props) => {
  return (
    <div className="user-orders-items my-5" style= {{backgroundColor: `${props.orderDeliveredStatus ? "#20c99722" : props.orderPaidStatus ? "#ffc10711" : "#0d6efd11"}`}}>
      <div className="user-orders-items__order-number mb-4">
        <h6 className="code-and-date d-flex justify-content-between align-items-center">
          <div className="order-code">كود الطلب: <Link to={`/user/order-details/${props.orderID}`} className="text-decoration-none">{props.orderNumber}#</Link></div>
          التاريخ: {`${new Date(props.orderDate).getDate()}/${new Date(props.orderDate).getMonth() + 1}/${new Date(props.orderDate).getFullYear()} - ${new Date(props.orderDate).getHours() < 10 ? `0${new Date(props.orderDate).getHours()}` : new Date(props.orderDate).getHours() }:${new Date(props.orderDate).getMinutes() < 10 ? `0${new Date(props.orderDate).getMinutes()}` : new Date(props.orderDate).getMinutes() }`}
        </h6>
      </div>
      <div className="user-orders-items__orders">
        {
          props.cartItems.map((item) => {
            return <CartItemCard 
                      key={item._id}
                      removeIconDisplay="d-none"
                      productID={item.product._id}
                      productImageCover={item.product.imageCover}
                      productTitle={item.product.title}
                      productBrand={item.product?.brand ? item.product.brand : ""}
                      productColor={item.color}
                      orderPageProductQuantity={item.quantity}
                      productPrice={item.itemPrice}
                      singleProductPrice={item.product.priceAfterDiscount ? item.product.priceAfterDiscount : item.product.price}
                  ></CartItemCard>
          })
        }
      </div>
      <div className="status-and-total d-flex justify-content-between align-items-center mt-4">
        <div className="user-orders-items__order-status">
          <h6>الحالة: {" "}
              {
                props.orderPaidStatus === false && props.orderDeliveredStatus === false ?
                  <span className="text-primary">قيد التنفيذ</span>
                : (props.orderPaidStatus === false ? <span className="text-warning">جارى استلام الدفعة</span> : 
                    props.orderDeliveredStatus === false ? <span className="text-warning">جارى التوصيل</span> : props.orderPaidStatus === true && props.orderDeliveredStatus === true ? <span className="text-success">تم استلام الطلب بنجاح</span> : '...') 
              }
          </h6>
        </div>
        <div className="user-orders-items__order-total">
          <h6>الاجمالى: <span>{parseInt(props.orderTotalPrice)} جنيه</span></h6>
          <div className="user-orders-items__info d-flex align-items-center">
            <i className="fa-solid fa-circle-info"></i>
            <div className="me-1 text-secondary">يشمل الشحن والضريبة</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersItems;
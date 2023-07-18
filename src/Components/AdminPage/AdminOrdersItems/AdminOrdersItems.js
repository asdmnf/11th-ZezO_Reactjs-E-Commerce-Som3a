import { Link } from "react-router-dom";
import AdminOrdersItemsHook from "../../../Hooks/Payment/AdminOrdersItemsHook";
import "./AdminOrdersItems.css";

const AdminOrdersItems = () => {
  const [allOrdersDataIsLoaded, allOrdersData] = AdminOrdersItemsHook();
  return (
    <>
      {allOrdersDataIsLoaded && allOrdersData?.data
        ? allOrdersData.data.map((item, i, orders) => {
            return (
              <div key={item._id} className="cart-item-card my-4 shadow" style= {{backgroundColor: `${item.isDelivered ? "#20c99722" : item.isPaid ? "#ffc10711" : "#0d6efd11"}`}}>
                <div className="cart-item-card-content">
                  <div className="cart-item-card-content__admin-order-number mb-3 d-flex justify-content-between align-items-center">
                    <div className="admin-order-code">
                      كود الطلب:
                      <Link
                        to={`/admin/orders/${item._id}`}
                        className="text-decoration-none me-1"
                      >
                        {item._id}#
                      </Link>
                    </div>
                    <div className="admin-order-status">
                      الحالة:
                      {
                        item.isPaid === false && item.isDelivered === false ?
                          <span className="text-primary me-2">قيد التنفيذ</span>
                        : (item.isPaid === false ? <span className="text-warning me-2">جارى استلام الدفعة</span> : 
                            item.isDelivered === false ? <span className="text-warning me-2">جارى التوصيل</span> : item.isPaid === true && item.isDelivered === true ? <span className="text-success me-2">تم استلام الطلب بنجاح</span> : '...') 
                      }
                    </div>
                  </div>
                  <ul className="order-information">
                    <li>
                      طلب من: <span className="text-success me-1">{item.user.name}</span>
                    </li>
                    <li>
                      رقم التواصل:{" "}
                      <span className="text-success me-1">{item.shippingAddress.phone}</span>
                    </li>
                    <li>
                      بتاريخ:{" "}
                      <span className="text-success me-1">{`${new Date(item.createdAt).getDate()}/${new Date(item.createdAt).getMonth() + 1}/${new Date(item.createdAt).getFullYear()} - ${new Date(item.createdAt).getHours() < 10 ? `0${new Date(item.createdAt).getHours()}` : new Date(item.createdAt).getHours() }:${new Date(item.createdAt).getMinutes() < 10 ? `0${new Date(item.createdAt).getMinutes()}` : new Date(item.createdAt).getMinutes() }`}</span>
                    </li>
                  </ul>
                  <div className="order-count-and-total d-flex justify-content-between align-items-center">
                    <div>
                      قام بطلب عدد{" "}
                      <Link 
                        to={`/admin/orders/${item._id}`}
                        className="text-decoration-none text-success me-1">
                          {item.cartItems.length}
                      </Link>{" "}
                      من المنتجات
                    </div>
                    <div>
                      الإجمالى: <span className="text-success me-1">{Math.round(item.totalPayment)}</span>{" "}
                      جنيه
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : <h1>لا توجد طلبات</h1>}
    </>
  );
};

export default AdminOrdersItems;

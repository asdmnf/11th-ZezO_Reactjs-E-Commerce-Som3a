import AdminSideBar from "../../../Components/AdminPage/AdminSideBar/AdminSideBar";
import CartItemCard from "../../../Components/CartPage/CartItemCard";
import CartPageButton from "../../../Components/CartPage/CartPageButton";
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer";
import AdminOrderNumberPageHook from "../../../Hooks/Payment/AdminOrderNumberPageHook";
import Spinner from "react-bootstrap/Spinner";
import "./AdminOrderNumberPage.css";

const AdminOrderNumberPage = () => {
  const [specificOrderDataIsLoaded, specificOrderData, paidInputOnClickHandle, deliverInputOnClickHandle, paidInputLoader, deliverInputLoader, updateValue, updateValueOnChangeHandle, addUpdateOnClickHandle, updateLoader, deleteUpdateOnClickHandle, emailIconOnClickHandle] = AdminOrderNumberPageHook()
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>
                ادارة الطلب رقم: <span>{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data._id : "..." }#</span>
              </h5>
            </div>
            <div className="admin-content">
            </div>
            <div className="customer-details">
              <h5 className="text-success mb-3">تفاصيل العميل</h5>
              <div className="customer-details__name">
                {" "}
                الاسم: <span>{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.user.name : "..." }</span>
              </div>
              <div className="customer-details__email">
                {" "}
                الايميل: <span>{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.user.email : "..." }</span>
                <i className="fa-solid fa-envelope" onClick={() => {
                  emailIconOnClickHandle(specificOrderData?.data?.user?.email, specificOrderData?.data?.user?.name)
                }}></i>
              </div>
                <h5 className="text-success mb-3 mt-5">بيانات الدفع</h5>
                <li className="admin-order-payment-method mb-2 text-secondary">طريقة الدفع: 
                  <span className="text-primary"> {" "}
                  {specificOrderData?.data?.paymentMethod === "cash" ? "الدفع عند الاستلام" : "اونلاين"}
                  </span>
                </li>
                <li className="admin-order-payment-status mb-2 text-secondary">حالة الدفع: {specificOrderDataIsLoaded && specificOrderData.data ? (
                  specificOrderData.data.isPaid === true ? <span className="text-success">تم الدفع</span> : <span className="text-danger">لم يتم استلام الدفعة بعد</span>
                ) : '...'}</li>
                <li className={`mb-2 text-secondary ${specificOrderData?.data?.paidDate ? "" : "d-none"}`}>تاريخ الدفع: 
                  <span className="text-primary">{" "}
                  {`${new Date(specificOrderData?.data?.paidDate).getDate()}/${new Date(specificOrderData?.data?.paidDate).getMonth() + 1}/${new Date(specificOrderData?.data?.paidDate).getFullYear()} - ${new Date(specificOrderData?.data?.paidDate).getHours() < 10 ? `0${new Date(specificOrderData?.data?.paidDate).getHours()}` : new Date(specificOrderData?.data?.paidDate).getHours() }:${new Date(specificOrderData?.data?.paidDate).getMinutes() < 10 ? `0${new Date(specificOrderData?.data?.paidDate).getMinutes()}` : new Date(specificOrderData?.data?.paidDate).getMinutes() }`}
                  </span>
                </li>
                <h5 className="text-success mb-3 mt-5">عنوان الشحن</h5>
                <p className="mb-2">{specificOrderData?.data?.shippingAddress?.fullAddress ? specificOrderData.data.shippingAddress.fullAddress : '...'}</p>
                <li className="admin-order-phone mb-2 text-secondary">رقم التواصل: <span className="text-dark">{specificOrderData?.data?.shippingAddress?.phone ? specificOrderData.data.shippingAddress.phone : '...'}</span></li>
                <li className="admin-order-deliver-status mb-2 text-secondary">حالة التوصيل: {specificOrderDataIsLoaded && specificOrderData.data ? (
                  specificOrderData.data.isDelivered === true ? <span className="text-success">تم التوصيل</span> : <span className="text-danger">لم يتم التوصيل بعد</span>
                ) : '...'}</li>
                <li className={`mb-2 text-secondary ${specificOrderData?.data?.deliveredDate ? "" : "d-none"}`}>تاريخ التوصيل: 
                  <span className="text-primary">{" "}
                  {`${new Date(specificOrderData?.data?.deliveredDate).getDate()}/${new Date(specificOrderData?.data?.deliveredDate).getMonth() + 1}/${new Date(specificOrderData?.data?.deliveredDate).getFullYear()} - ${new Date(specificOrderData?.data?.deliveredDate).getHours() < 10 ? `0${new Date(specificOrderData?.data?.deliveredDate).getHours()}` : new Date(specificOrderData?.data?.deliveredDate).getHours() }:${new Date(specificOrderData?.data?.deliveredDate).getMinutes() < 10 ? `0${new Date(specificOrderData?.data?.deliveredDate).getMinutes()}` : new Date(specificOrderData?.data?.deliveredDate).getMinutes() }`}
                  </span>
                </li>
                <h5 className="text-success mb-3 mt-5">معلومات اضافية</h5>
                <li className="admin-order-cost mb-2 text-secondary">قيمة الطلب: <span className="text-dark">{specificOrderDataIsLoaded && specificOrderData.data ? Math.round(specificOrderData.data.orderPrice) : '...'} جنيه</span></li>
                <li className="admin-order-shipping-cost mb-2 text-secondary">تكلفة الشحن: <span className="text-dark">{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.shippingFees : '...'} جنيه</span></li>
                <li className="admin-order-tax-cost mb-2 text-secondary">قيمة الضريبة: <span className="text-dark">{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.taxFees : '...'} جنيه</span> </li>
                <h5 className="text-success mb-5 mt-5">المنتجات المطلوبة</h5>
                {
                specificOrderDataIsLoaded && specificOrderData.data ? 
                  specificOrderData.data.cartItems.map((item) => {
                    return <CartItemCard
                              key={item._id}
                              removeIconDisplay="d-none"
                              productID={item.product._id}
                              productImageCover={item.product.imageCover}
                              productTitle={item.product.title}
                              productColor={item.color}
                              orderPageProductQuantity={item.quantity}
                              productPrice={item.itemPrice}
                              singleProductPrice={item.product.priceAfterDiscount ? item.product.priceAfterDiscount : item.product.price}
                              productBrand={item.product?.brand ? item.product.brand : ""}
                          ></CartItemCard>
                  }) : null 
              }
              <div className="customer-details__order-total d-flex justify-content-center align-items-center">
                {" "}
                الاجمالى: <span>{specificOrderDataIsLoaded && specificOrderData.data ? Math.round(specificOrderData.data.totalPayment) : "..." }</span>
              </div>
              <div className="customer-details__order-status mt-3 d-flex justify-content-center align-items-center">
              <label className="ms-2 me-3" htmlFor="order-status">حالة الدفع: </label>
                <select id="order-status" name="order-status" disabled={specificOrderDataIsLoaded && specificOrderData.data && specificOrderData.data.isPaid === true ? true : false}>
                  <option>تم الدفع</option>
                </select>
                  <CartPageButton>
                    <button onClick={() => paidInputOnClickHandle(specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data._id : null)} disabled={specificOrderDataIsLoaded && specificOrderData.data && specificOrderData.data.isPaid === true ? true : false}>
                      حفظ
                      <Spinner animation="border" className={`order-status-spinner ${!paidInputLoader ? `d-none` : null}`} />
                      </button>
                  </CartPageButton>
              </div>
              <div className="customer-details__order-status mt-3 d-flex justify-content-center align-items-center">
              <label className="ms-2" htmlFor="order-status">حالة التوصيل: </label>
                <select id="order-status" name="order-status" disabled={specificOrderDataIsLoaded && specificOrderData.data && specificOrderData.data.isDelivered === true ? true : false}>
                  <option>تم التوصيل</option>
                </select>
                  <CartPageButton>
                    <button onClick={() => deliverInputOnClickHandle(specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data._id : null)} disabled={specificOrderDataIsLoaded && specificOrderData.data && specificOrderData.data.isDelivered === true ? true : false}>
                      حفظ
                      <Spinner animation="border" className={`order-status-spinner ${!deliverInputLoader ? `d-none` : null}`} />
                      </button>
                  </CartPageButton>
              </div>
              <div className="admin-order-status d-flex justify-content-center my-5">
              {
                        specificOrderDataIsLoaded && specificOrderData.data && specificOrderData.data.isPaid === false && specificOrderData.data.isDelivered === false ?
                          <span className="text-danger me-2">لم يتم التعامل مع الطلب بعد</span>
                        : (specificOrderDataIsLoaded && specificOrderData.data && specificOrderData.data.isPaid === false ? <span className="text-warning me-2">جارى استلام الدفعة من طرف العميل</span> : 
                        specificOrderDataIsLoaded && specificOrderData.data && specificOrderData.data.isDelivered === false ? <span className="text-warning me-2">جارى استلام الطلب من قبل العميل</span> : specificOrderDataIsLoaded && specificOrderData.data && specificOrderData.data.isPaid === true && specificOrderData.data.isDelivered === true ? <span className="text-success me-2">تم استلام الطلب من قبل العميل بنجاح</span> : '...') 
                      }
              </div>
              <h5 className="text-success mb-4 mt-5">التحديثات</h5>
              <ul className="me-3">
                {
                  specificOrderData?.data?.updates?.map(item => {
                    return  <div className="d-flex align-items-center" key={item._id}>
                              <li className="admin-order-update mt-3 text-primary">
                              <span className="text-secondary">{" "}
                  {`${new Date(item.createdAt).getDate()}/${new Date(item.createdAt).getMonth() + 1}/${new Date(item.createdAt).getFullYear()} - ${new Date(item.createdAt).getHours() < 10 ? `0${new Date(item.createdAt).getHours()}` : new Date(item.createdAt).getHours() }:${new Date(item.createdAt).getMinutes() < 10 ? `0${new Date(item.createdAt).getMinutes()}` : new Date(item.createdAt).getMinutes() } : `}
                  </span>
                                <div className="d-inline-flex">
                                  {item.update}
                                                                <div className="update__delete-icon me-2">
                                  <i className="fa-solid fa-trash" onClick={() => {
                                    deleteUpdateOnClickHandle(item._id)
                                  }}></i>
                                                                </div>
                                </div>
                              </li>
                            </div> 
                  })
                }
              </ul>
              <div className="order-updates col-md-8">
                <textarea value={updateValue} onChange={updateValueOnChangeHandle}></textarea>
                <div className="d-flex justify-content-end">
                  <CartPageButton>
                      <button onClick={addUpdateOnClickHandle}>
                        إرسال
                        <Spinner animation="border" className={`order-update-spinner ${!updateLoader ? `d-none` : null}`} />
                        </button>
                    </CartPageButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AdminOrderNumberPage;

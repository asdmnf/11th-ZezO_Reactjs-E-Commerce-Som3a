import UserSideBar from "../../../Components/UserPage/UserSideBar/UserSideBar";
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer";
import UserOrderDetailsPageHook from "../../../Hooks/Payment/UserOrderDetailsPageHook";
import "./UserOrderDetailsPage.css";

const UserOrderDetailsPage = () => {
  const [specificOrderDataIsLoaded, specificOrderData] = UserOrderDetailsPageHook()
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-3">
            <UserSideBar></UserSideBar>
          </div>
          <div className="col-9">
            <div className="admin-header my-3">
              تفاصيل الطلب رقم: <span>{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data._id : '...'}#</span>
            </div>
            <div className="admin-content">
              <div className="customer-details shadow">
                <h5 className="text-success mb-3">البيانات الشخصية</h5>
                <li className="customer-details__name">
                  {" "}
                  الاسم: <span>{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.user.name : '...'}</span>
                </li>
                <li className="customer-details__email">
                  {" "}
                  الايميل: <span>{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.user.email : '...'}</span>
                </li>
                <h5 className="text-success mb-3 mt-5">بيانات الدفع</h5>
                <li className="mb-2 text-secondary">طريقة الدفع: 
                  <span className="text-primary"> {" "}
                  {specificOrderData?.data?.paymentMethod === "cash" ? "الدفع عند الاستلام" : "اونلاين"}
                  </span>
                </li>
                <li className="mb-2 text-secondary">حالة الدفع: {specificOrderDataIsLoaded && specificOrderData.data ? (
                  specificOrderData.data.isPaid === true ? <span className="text-success">تم الدفع</span> : <span className="text-warning">جارى استلام الدفعة</span>
                ) : '...'}</li>
                <li className={`mb-2 text-secondary ${specificOrderData?.data?.paidDate ? "" : "d-none"}`}>تاريخ الدفع: 
                  <span className="text-primary">{" "}
                  {`${new Date(specificOrderData?.data?.paidDate).getDate()}/${new Date(specificOrderData?.data?.paidDate).getMonth() + 1}/${new Date(specificOrderData?.data?.paidDate).getFullYear()} - ${new Date(specificOrderData?.data?.paidDate).getHours() < 10 ? `0${new Date(specificOrderData?.data?.paidDate).getHours()}` : new Date(specificOrderData?.data?.paidDate).getHours() }:${new Date(specificOrderData?.data?.paidDate).getMinutes() < 10 ? `0${new Date(specificOrderData?.data?.paidDate).getMinutes()}` : new Date(specificOrderData?.data?.paidDate).getMinutes() }`}
                  </span>
                </li>
                <h5 className="text-success mb-3 mt-5">عنوان الشحن</h5>
                <p className="mb-2">{specificOrderData?.data?.shippingAddress?.fullAddress ? specificOrderData.data.shippingAddress.fullAddress : '...'}</p>
                <li className="mb-2 text-secondary">رقم التواصل: <span className="text-dark">{specificOrderData?.data?.shippingAddress?.phone ? specificOrderData.data.shippingAddress.phone : '...'}</span></li>
                <li className="mb-2 text-secondary">حالة التوصيل: {specificOrderDataIsLoaded && specificOrderData.data ? (
                  specificOrderData.data.isDelivered === true ? <span className="text-success">تم التوصيل</span> : <span className="text-warning">جارى التوصيل</span>
                ) : '...'}</li>
                <li className={`mb-2 text-secondary ${specificOrderData?.data?.deliveredDate ? "" : "d-none"}`}>تاريخ التوصيل: 
                  <span className="text-primary">{" "}
                  {`${new Date(specificOrderData?.data?.deliveredDate).getDate()}/${new Date(specificOrderData?.data?.deliveredDate).getMonth() + 1}/${new Date(specificOrderData?.data?.deliveredDate).getFullYear()} - ${new Date(specificOrderData?.data?.deliveredDate).getHours() < 10 ? `0${new Date(specificOrderData?.data?.deliveredDate).getHours()}` : new Date(specificOrderData?.data?.deliveredDate).getHours() }:${new Date(specificOrderData?.data?.deliveredDate).getMinutes() < 10 ? `0${new Date(specificOrderData?.data?.deliveredDate).getMinutes()}` : new Date(specificOrderData?.data?.deliveredDate).getMinutes() }`}
                  </span>
                </li>
                <h5 className="text-success mb-3 mt-5">معلومات اضافية</h5>
                <li className="mb-2 text-secondary">قيمة الطلب: <span className="text-dark">{specificOrderDataIsLoaded && specificOrderData.data ? Math.round(specificOrderData.data.orderPrice) : '...'} جنيه</span></li>
                <li className="mb-2 text-secondary">تكلفة الشحن: <span className="text-dark">{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.shippingFees : '...'} جنيه</span></li>
                <li className="mb-2 text-secondary">قيمة الضريبة: <span className="text-dark">{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.taxFees : '...'} جنيه</span> </li>
                <li className="mb-2 text-secondary">البائع: <span className="text-dark">ZezO.com</span> </li>

                <h5 className="text-success mb-4 mt-5">التحديثات</h5>
              <ul className="me-3 mb-5">
                {
                  specificOrderData?.data?.updates?.map(item => {
                    return  <div className="d-flex align-items-center" key={item._id}>
                              <li className="mt-3 text-primary">
                              <span className="text-secondary">{" "}
                  {`${new Date(item.createdAt).getDate()}/${new Date(item.createdAt).getMonth() + 1}/${new Date(item.createdAt).getFullYear()} - ${new Date(item.createdAt).getHours() < 10 ? `0${new Date(item.createdAt).getHours()}` : new Date(item.createdAt).getHours() }:${new Date(item.createdAt).getMinutes() < 10 ? `0${new Date(item.createdAt).getMinutes()}` : new Date(item.createdAt).getMinutes() } : `}
                  </span>
                                {item.update}
                              </li>
                            </div> 
                  })
                }
              </ul>

                <div className="customer-details__order-total d-flex justify-content-center align-items-center">
                  {" "}
                  الاجمالى: <span>{specificOrderDataIsLoaded && specificOrderData.data ? specificOrderData.data.totalPayment : '...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default UserOrderDetailsPage;

import CartPageButton from "../../Components/CartPage/CartPageButton";
import UserAddressCard from "../../Components/UserPage/UserAddressCard/UserAddressCard";
import CategoryHeader from "../../Components/Utilities/02-CategoryHeader/CategoryHeader";
import SectionContainer from "../../Components/Utilities/09-SectionContainer/SectionContainer";
import PaymentMethodPageHook from "../../Hooks/Payment/PaymentMethodPageHook";
import Spinner from "react-bootstrap/Spinner";
import "./PaymentMethodPage.css";

const PaymentMethodPage = () => {
  const [allCartDataIsLoaded, allCartData, allAddressesDataIsLoaded, allAddressesData, addressSelectOnChangeHandle, buyItemsOnClickHandle, visaSelectOnChangeHandle, cashSelectOnChangeHandle, loader, addressTitle, addressDetails, addressphone, paymentMethod] = PaymentMethodPageHook();
  return (
    <SectionContainer>
      <CategoryHeader BtnDisplay="d-none">إختر طريقة الدفع</CategoryHeader>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="payment-method">
              <div className="payment-method___visa d-flex align-items-center">
                <input type="radio" id="visa" name="payment-method" onChange={visaSelectOnChangeHandle} />
                <label htmlFor="visa">الدفع عن طريق الفيزا</label>
              </div>
              <div className="payment-method___cash d-flex align-items-center mt-3">
                <input type="radio" id="cash" name="payment-method" onChange={cashSelectOnChangeHandle} />
                <label htmlFor="cash">الدفع عند الاستلام</label>
              </div>
              <div className="col-sm-4 add-sub-category">
                <div className="add-sub-category__select">
                  <select onChange={addressSelectOnChangeHandle}>
                    <option value="0">اختر عنوان الشحن</option>
                    {allAddressesDataIsLoaded &&
                    allAddressesData.status === 200
                      ? allAddressesData.data?.addresses.map((item) => {
                          return (
                            <option
                              className="text-dark"
                              key={item._id}
                              value={item._id}
                            >
                              {item.title}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
              <div
                className={`col-lg-8 ${
                  addressDetails
                    ? ""
                    : `d-none`
                }`}
              >
                {
                  addressDetails
                    ? <UserAddressCard
                        controlIconsDisplay="d-none"
                        bgColor="text-bg-warning"
                        addressAlias={addressTitle}
                        addressDetails={addressDetails}
                        addressPhone={addressphone}
                      ></UserAddressCard>
                    : null
                }
                
              </div>

                <div className={`online-payment-info-card ${paymentMethod !== "visa" ? "d-none" : ""}`}>
                  <h1>استخدم هذه القيم لتجربة الدفع الاونلاين</h1>
                  <ul>
                    <li>رقم الكارت: <span>4242 4242 4242 4242</span></li>
                    <li>تاريخ صلاحية الكارت: <span>اى تاريخ قادم وليكن 5/25</span></li>
                    <li>الرقم السرى: <span>اى 3 ارقام 555</span></li>
                    <li>الاسم: <span>اى اسم</span></li>
                  </ul>
                </div>

            </div>
          </div>
          <div className="total-and-proceed col-12 d-flex justify-content-end mt-3">
            <div className="payment-method___total-price">
              الاجمالى : {' '} 
              <span>
              {
                allCartDataIsLoaded && allCartData.status === 200 ? (
                  allCartData.data?.totalPriceAfterDiscount ? (
                    parseInt(allCartData.data?.totalPriceAfterDiscount)
                  ) : parseInt(allCartData.data?.totalPrice)
                ) : ' ...'
              }
              </span>
            </div>
            <div className="payment-method___proceed-btn ms-3">
              <CartPageButton>
                <button onClick={buyItemsOnClickHandle}>
                  اتمام الشراء
                  <Spinner animation="border" className={`buy-item-spinner ${!loader ? `d-none` : null}`} />
                </button>
              </CartPageButton>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default PaymentMethodPage;

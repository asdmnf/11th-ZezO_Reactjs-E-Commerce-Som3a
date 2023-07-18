import CartPageButton from "../../../Components/CartPage/CartPageButton";
import UserAddressCard from "../../../Components/UserPage/UserAddressCard/UserAddressCard";
import UserSideBar from "../../../Components/UserPage/UserSideBar/UserSideBar";
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer";
import UserAddressesPageHook from "../../../Hooks/Address/UserAddressesPageHook";
import Spinner from "react-bootstrap/Spinner";
import "./UserAddressesPage.css";

const UserAddressesPage = () => {
  const [addressTitleInput, addressDescriptionInput, phoneInput, addressTitleInputRef, addressDescriptionInputRef, phoneInputRef, loader, addressTitleInputOnChangeHandle, addressDescriptionInputOnChangeHandle, phoneInputOnChangeHandle, addAddressOnClickHandle, allAddressesDataIsLoaded, allAddressesData, removeAddressOnClickHandle, editAddressOnClickHandle, editAddressIsClicked, saveEditAddressOnClickHandle] = UserAddressesPageHook();
  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <UserSideBar></UserSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              {
                !editAddressIsClicked ? (<h5>اضافة عنوان جديد</h5>) : <h5>تعديل عنوان حالى</h5> 
              }
              
            </div>
            <div className="col-9">
              <div className="admin-content mt-5">
                <div className="new-address-form">
                  <input
                    type="text"
                    placeholder="المكان (المنزل - العمل)"
                    ref={addressTitleInputRef}
                    onChange={addressTitleInputOnChangeHandle}
                    value={addressTitleInput}
                  />
                  <textarea
                    placeholder="العنوان بالتفصيل"
                    ref={addressDescriptionInputRef}
                    onChange={addressDescriptionInputOnChangeHandle}
                    value={addressDescriptionInput}
                  ></textarea>
                  <input
                    type="number"
                    placeholder="رقم الهاتف"
                    ref={phoneInputRef}
                    onChange={phoneInputOnChangeHandle}
                    value={phoneInput}
                  />
                  <div className="new-address-form__btn">
                  {
                    !editAddressIsClicked ? (
                      <CartPageButton>
                        <button onClick={addAddressOnClickHandle} >
                          اضافة العنوان
                          <Spinner animation="border" className={`coupon-spinner ${!loader ? `d-none` : null}`} />
                        </button>
                      </CartPageButton>
                    ) : <CartPageButton>
                          <button onClick={saveEditAddressOnClickHandle} >
                            حفظ التعديل
                            <Spinner animation="border" className={`coupon-spinner ${!loader ? `d-none` : null}`} />
                          </button>
                        </CartPageButton>
                  }
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-header my-3">
              <h5 className="address-header-text">
                دفتر العناوين ({" "}
                {allAddressesDataIsLoaded ? allAddressesData.data?.addresses.length : 0} عنوان
                متاح )
              </h5>
            </div>
            <div className="admin-content">
              {allAddressesDataIsLoaded ? (
                allAddressesData.data?.addresses.length ? (
                  allAddressesData.data.addresses.map((item) => {
                    return (
                      <UserAddressCard
                        key={item._id}
                        addressID={item._id}
                        addressAlias={item.title}
                        addressDetails={item.fullAddress}
                        addressPhone={item.phone}
                        removeAddressOnClickHandle={removeAddressOnClickHandle}
                        editAddressOnClickHandle={editAddressOnClickHandle}
                      ></UserAddressCard>
                    );
                  })
                ) : (
                  <h1>لا توجد عناوين</h1>
                )
              ) : (
                <h1>جارى التحديث</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default UserAddressesPage;

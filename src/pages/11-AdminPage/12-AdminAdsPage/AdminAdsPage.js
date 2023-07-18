import AdminSideBar from "../../../Components/AdminPage/AdminSideBar/AdminSideBar"
import CartPageButton from "../../../Components/CartPage/CartPageButton"
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer"
import Spinner from 'react-bootstrap/Spinner';
import AdminAdsPageHook from "../../../Hooks/admin/AdminAdsPageHook";
import "./AdminAdsPage.css"

const AdminAdsPage = () => {

  const [backgroundOnChangeHandle, foregroundOnChangeHandle, urlImg, fileInputOnChangeHandle, textInputOnChangeHandle, text, addBtnOnClickHandle, loader, colorInputOnChangeHandle, color, selectedMethod, discountTextInputOnChangeHandle, discountText, backgroundRadioRef, foregroundRadioRef] = AdminAdsPageHook()

  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
          <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>إدراة الاعلانات الترويجية</h5>
            </div>
            <div className="admin-content admin-content-ads">
              <div className="mt-4 text-success">
                <div className="payment-method___visa d-flex align-items-center">
                  <input type="radio" id="background" name="payment-method" onChange={backgroundOnChangeHandle} ref={backgroundRadioRef} />
                  <label htmlFor="background">إضافة خلفية فقط</label>
                </div>
                <div className="payment-method___cash d-flex align-items-center mt-3">
                  <input type="radio" id="foreground" name="payment-method" onChange={foregroundOnChangeHandle} ref={foregroundRadioRef}/>
                  <label htmlFor="foreground">إضافة لون مع صورة أمامية</label>
                </div>
              </div>
              <div className={`background mt-5 ${selectedMethod === "background" ? "" : "d-none"}`}>
              <div className="add-brand__image">

        <label htmlFor="add-image">
          <img src={urlImg} alt="" />
        </label>
        <input className="d-none" type="file" name="" id="add-image" onChange={fileInputOnChangeHandle} />
      </div>
      <div className="col-sm-10 col-md-8">
        <div className="add-brand__name">
          <input className="mt-2" type="text" placeholder="نص البحث" onChange={textInputOnChangeHandle} value={text} />
          <div className={`add-brand__btn d-flex justify-content-end align-items-center`}>
                <CartPageButton >
                  <button onClick={addBtnOnClickHandle} >
                  حفظ 
                  <Spinner animation="border" className={`addBrand-spinner ${!loader ? `d-none` : null}`} />
                </button>
                </CartPageButton>            
          </div>
        </div>
      </div>
              </div>
              <div className={`foreground mt-5 ${selectedMethod === "foreground" ? "" : "d-none"}`}>
              <div className="add-brand__image">

        <label htmlFor="add-image">
          <img src={urlImg} alt="" />
        </label>
        <input className="d-none" type="file" name="" id="add-image" onChange={fileInputOnChangeHandle} />
      </div>
      <div className="col-sm-10 col-md-8">
        <div className="add-brand__name">
          <input className="mt-2" type="text" placeholder="لون الخلفية" onChange={colorInputOnChangeHandle} value={color} />
          <input className="mt-2" type="text" placeholder="عنوان الخصم" onChange={discountTextInputOnChangeHandle} value={discountText} />
          <input className="mt-2" type="text" placeholder="نص البحث" onChange={textInputOnChangeHandle} value={text} />
          <div className={`add-brand__btn d-flex justify-content-end align-items-center`}>
                <CartPageButton >
                  <button onClick={addBtnOnClickHandle} >
                  حفظ 
                  <Spinner animation="border" className={`addBrand-spinner ${!loader ? `d-none` : null}`} />
                </button>
                </CartPageButton>
            
          </div>
        </div>
      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default AdminAdsPage
import AdminSideBar from "../../../Components/AdminPage/AdminSideBar/AdminSideBar"
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductButtonStyle from "../../../Components/Utilities/15-ProductButtonStyle/ProductButtonStyle";
import AdminFeesPageHook from "../../../Hooks/admin/AdminFeesPageHook";
import CartPageButton from "../../../Components/CartPage/CartPageButton";
import Spinner from 'react-bootstrap/Spinner';
import "./AdminFeesPage.css"

const AdminFeesPage = () => {

  const [show, handleClose, shippingFeesInputRef, shippingFeesInputOnChangeHandle, shippingFeesInput, taxFeesInputRef, taxFeesInputOnChangeHandle, taxFeesInput, saveEditFeesOnClickHandle, allFeesData, allFeesDataIsLoaded, editFeesOnClickHandle, shippingFeesOnChangeHandle, shippingFees, taxFeesPercentageOnChangeHandle, taxFeesPercentage, addBtnOnClickHandle, loader, shippingFeesRef, taxFeesPercentageRef] = AdminFeesPageHook()

  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
          <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>إدارة الشحن والضريبة</h5>
            </div>
            <div className="admin-content">
              {
                allFeesData?.data?.length ?
                  (
                    allFeesDataIsLoaded ?
                    allFeesData?.data?.map(item => {
                      return <div key={item._id} className="fees-card shadow mt-3 d-flex align-items-center">
                      <div className={`fees-card__edit-fees`}>
                      <i className="fa-solid fa-pen-to-square" onClick={() => {
                        editFeesOnClickHandle(item._id)
                      }} ></i>
                      </div>
                      <div className="fees-card__content">
                        <div className="user-profile-card__shipping mb-3">
                          قيمة الشحن: <span>{item.shippingFees}</span>
                        </div>
                        <div className="user-profile-card__tax">
                          نسبة الضريبة المؤية: <span>{item.taxFeesPercentage}</span>
                        </div>
                      </div>
                    </div>
                    })
                    : <h1>جارى التحميل</h1>
                  )
                : 
                <div className="col-sm-10 col-md-8">
                  <div className="add-brand__name">
                            <input className="mt-2" type="number" placeholder="قيمة الشحن" onChange={shippingFeesOnChangeHandle} value={shippingFees} ref={shippingFeesRef} />
                            <input className="mt-2" type="number" placeholder="نسبة الضريبة المؤية" onChange={taxFeesPercentageOnChangeHandle} value={taxFeesPercentage} ref={taxFeesPercentageRef} />
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
              }
            </div>
          </div>
        </div>
      </div>
      <div className="edit-user-data-modal">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>تعديل البيانات</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="change-password__form change-fees">
              <input type="number" placeholder="قيمة الشحن" ref={shippingFeesInputRef} onChange={shippingFeesInputOnChangeHandle} value={shippingFeesInput} />
              <input type="number" placeholder="النسبة المؤية للضريبة" ref={taxFeesInputRef} onChange={taxFeesInputOnChangeHandle} value={taxFeesInput} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark rounded-3" onClick={handleClose}>
              إلغاء
            </Button>
            <ProductButtonStyle onClick={saveEditFeesOnClickHandle} >حفظ التعديل</ProductButtonStyle>
          </Modal.Footer>
        </Modal>
      </div>
    </SectionContainer>
  )
}

export default AdminFeesPage
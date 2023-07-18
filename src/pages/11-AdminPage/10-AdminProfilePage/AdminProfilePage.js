import AdminSideBar from "../../../Components/AdminPage/AdminSideBar/AdminSideBar"
import CartPageButton from "../../../Components/CartPage/CartPageButton"
import UserProfileCard from "../../../Components/UserPage/UserProfileCard/UserProfileCard"
import SectionContainer from "../../../Components/Utilities/09-SectionContainer/SectionContainer"
import UserProfilePageHook from "../../../Hooks/User/UserProfilePageHook";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductButtonStyle from "../../../Components/Utilities/15-ProductButtonStyle/ProductButtonStyle";
import Spinner from 'react-bootstrap/Spinner'
import "./AdminProfilePage.css"

const AdminProfilePage = () => {

  const [show, handleClose, editUserDataOnClickHandle, saveEditUserDataOnClickHandle, nameInputRef, nameInputOnChangeHandle, nameInput, phoneInputRef, phoneInputOnChangeHandle, phoneInput, currentPasswordOnChangeHandle, currentPasswordInput, newPasswordOnChangeHandle, newPasswordInput, confirmNewPasswordOnChangeHandle, confirmNewPasswordInput, changePasswordOnClickHandle, loader, emailRef, emailOnChangeHandle, email] = UserProfilePageHook()

  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
          <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              <h5>الملف الشخصى</h5>
            </div>
            <div className="admin-content">
              <UserProfileCard
                editUserDataOnClickHandle={editUserDataOnClickHandle}
                userName={localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")).name) : "..."}
                userPhone={localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")).phone) : "..."}
                userEmail={localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")).email) : "..."}
                userRole={localStorage.getItem("userData") ? (JSON.parse(localStorage.getItem("userData")).role) : "..."}
                adminControlsDisplay="d-none"
              ></UserProfileCard>
            </div>
            <div className="change-password__header mt-4 mb-3">
              <h5>تغيير كلمة المرور</h5>
            </div>
            <div className="change-password__form">
              <div className="col-sm-10 col-md-8">
                <input type="password" placeholder="كلمة المرور الحالية" onChange={currentPasswordOnChangeHandle} value={currentPasswordInput} />
                <input type="password" placeholder="كلمة المرور الجديدة" onChange={newPasswordOnChangeHandle} value={newPasswordInput} />
                <input type="password" placeholder="تأكيد كلمة المرور الجديدة" onChange={confirmNewPasswordOnChangeHandle} value={confirmNewPasswordInput} />
                <div className="change-password__btn">
                  <CartPageButton>
                    <button onClick={changePasswordOnClickHandle}>
                      تغيير
                      <Spinner animation="border" className={`change-password-spinner ${!loader ? `d-none` : null}`} />
                      </button>
                  </CartPageButton>
                </div>
              </div>
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
            <div className="change-password__form">
              <input type="text" placeholder="الاسم" ref={nameInputRef} onChange={nameInputOnChangeHandle} value={nameInput} />
              <input type="tel" placeholder="رقم الهاتف" ref={phoneInputRef} onChange={phoneInputOnChangeHandle} value={phoneInput} />
              <input type="text" placeholder="الإيميل" ref={emailRef} onChange={emailOnChangeHandle} value={email} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark rounded-3" onClick={handleClose}>
              إلغاء
            </Button>
            <ProductButtonStyle onClick={saveEditUserDataOnClickHandle} >حفظ التعديل</ProductButtonStyle>
          </Modal.Footer>
        </Modal>
      </div>
    </SectionContainer>
  )
}

export default AdminProfilePage
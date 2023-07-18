import CartPageButton from '../../CartPage/CartPageButton'
import Spinner from 'react-bootstrap/Spinner'
import './UserProfileCard.css'

const UserProfileCard = (props) => {
  return (
    <div className='user-profile-card shadow mt-3' style={{backgroundColor: `${props.userActive === false ? "#dc354511" : props.userRole === "admin" ? "#0d6efd11" : ""}`}}>
      <div className="user-profile-card__header d-flex justify-content-between align-items-center">
      <div className="user-profile-card__name">
        الاسم: <span>{props.userName}</span>
      </div>
      <div className={`user-profile-card__remove-icon ${props.editIconDisplay}`}>
      <i className="fa-solid fa-pen-to-square" onClick={props.editUserDataOnClickHandle}></i>
      </div>
      </div>
      <div className="user-profile-card__phone mt-2">
        رقم الهاتف: <span>{props.userPhone}</span>
      </div>
      <div className="user-profile-card__email mt-2">
        الايميل: <span>{props.userEmail}</span>
      </div>
      <div className="user-profile-card__email mt-2">
        الصلاحية: <span className='text-primary fw-semibold'>{props.userRole}</span>
      </div>
      <div className={`user-profile-card__email mt-2 ${props.userActive === false ? "" : "d-none"}`}>
        حالة الحساب: <span className='text-danger fw-semibold'>غير مفعل</span>
      </div>
      <div className={`admin-controls_btns d-flex justify-content-end ${props.adminControlsDisplay} mt-3`}>
        <div className={`${props.userRole === "admin" || props.userActive === false ? "d-none" : ""}`}>
          <CartPageButton >
            <button className='change-role_btn ms-2 shadow' onClick={() => {
              props.changeRoleToAdminOnClickHandler(props.userID)
            }} >
              الترقية الى ادمن
              <Spinner animation="border" className={`admin-controls_btns-spinner ${props.changeToAdminLoader && props.specificUserID === props.userID ? "" : "d-none"}`} />
            </button>
          </CartPageButton>
        </div>
        <div className={`${props.userRole === "user" || props.userActive === false? "d-none" : ""}`}>
          <CartPageButton >
            <button className='change-role_btn ms-2 shadow' onClick={() => {
              props.changeRoleToUserOnClickHandler(props.userID)
            }} >
              الرجوع الى مستخدم
              <Spinner animation="border" className={`admin-controls_btns-spinner ${props.changeToUserLoader && props.specificUserID === props.userID ? "" : "d-none"}`} />
            </button>
          </CartPageButton>
        </div>
        <div className={`${props.userActive === false ? "d-none" : ""}`}>
          <CartPageButton >
            <button className='deactivate-account_btn shadow' onClick={() => {
              props.deactivateAccountOnClickHandler(props.userID)
            }} >
              الغاء تفعيل الحساب
              <Spinner animation="border" className={`admin-controls_btns-spinner ${props.deactivateAccountLoader && props.specificUserID === props.userID ? "" : "d-none"}`} />
            </button>
          </CartPageButton>
        </div>
        <div className={`${props.userActive === true ? "d-none" : ""}`}>
          <CartPageButton >
            <button className='deactivate-account_btn shadow' onClick={() => {
              props.activateAccountOnClickHandler(props.userID)
            }} >
              تفعيل الحساب
              <Spinner animation="border" className={`admin-controls_btns-spinner ${props.activateAccountLoader && props.specificUserID === props.userID ? "" : "d-none"}`} />
            </button>
          </CartPageButton>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCard
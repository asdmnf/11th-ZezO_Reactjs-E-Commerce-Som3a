import AdminSideBar from '../../../Components/AdminPage/AdminSideBar/AdminSideBar'
import CartPageButton from '../../../Components/CartPage/CartPageButton'
import SectionContainer from '../../../Components/Utilities/09-SectionContainer/SectionContainer'
import AdminAddCouponHook from '../../../Hooks/Coupon/AdminAddCouponHook'
import Spinner from 'react-bootstrap/Spinner'
import CouponCard from './CouponCard/CouponCard'
import './AdminAddCoupon.css'

const AdminAddCoupon = () => {
  const [couponNameInputOnChangeHandle, couponNameInput, couponDateInputOnChangeHandle, couponDateInput, couponDiscountInputOnChangeHandle, couponDiscount, addCouponOnClickHandle, couponNameInputRef, couponDateInputRef, couponDiscountRef, loader, allCouponsDataIsLoaded, allCouponsData, removeCouponOnClickHandle, editCouponOnClickHandle, editCouponIsClicked, saveEditCouponOnClickHandle, couponDiscountLimitRef, couponDiscountLimitInputOnChangeHandle, couponDiscountLimit] = AdminAddCouponHook()


  return (
    <SectionContainer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <AdminSideBar></AdminSideBar>
          </div>
          <div className="col-lg-9">
            <div className="admin-header">
              {
                !editCouponIsClicked ? (<h5>اضافة كوبون جديد</h5>) : <h5>تعديل كوبون حالى</h5> 
              }
              
            </div>
            <div className="admin-content">
            <div className="col-lg-10">
              <div className="add-coupon">
                <input type="text" placeholder='اسم الكوبون' ref={couponNameInputRef} onChange={couponNameInputOnChangeHandle} value={couponNameInput}  />
                <input type="text" placeholder='تاريخ انتهاء صلاحية الكوبون' ref={couponDateInputRef} onChange={couponDateInputOnChangeHandle} value={couponDateInput} onFocus={()=> couponDateInputRef.current.type = "date"} onBlur={()=> couponDateInputRef.current.type = "text"} />
                <input type="number" placeholder='نسبة خصم الكوبون المؤية' ref={couponDiscountRef} onChange={couponDiscountInputOnChangeHandle} value={couponDiscount}  />
                {/* جديد */}
                <input type="number" placeholder='أقصى حد للخصم' ref={couponDiscountLimitRef} onChange={couponDiscountLimitInputOnChangeHandle} value={couponDiscountLimit}  />
                <div className="add-coupon__btn">
                  {
                    !editCouponIsClicked ? (
                      <CartPageButton>
                        <button onClick={addCouponOnClickHandle} >
                          اضافة الكوبون
                          <Spinner animation="border" className={`coupon-spinner ${!loader ? `d-none` : null}`} />
                        </button>
                      </CartPageButton>
                    ) : <CartPageButton>
                          <button onClick={saveEditCouponOnClickHandle} >
                            حفظ التعديل
                            <Spinner animation="border" className={`coupon-spinner ${!loader ? `d-none` : null}`} />
                          </button>
                        </CartPageButton>
                  }
                
                </div>
                <div className="admin-header my-3">
              <h5>الكوبونات الموجودة حاليا ( {
                allCouponsDataIsLoaded ? (allCouponsData.results) : 0
                } كوبون )</h5>
            </div>
                {
                  allCouponsDataIsLoaded ? (
                    allCouponsData.data?.length ? (
                      allCouponsData.data.map((item) => {
                        return <CouponCard 
                          key={item._id} 
                          item = {item}
                          removeCouponOnClickHandle = {removeCouponOnClickHandle}
                          editCouponOnClickHandle = {editCouponOnClickHandle}
                        ></CouponCard>
                      })
                    ) : <h1>لا توجد كوبونات</h1>
                  ) : <h1>جارى التحديث</h1>
                }
              </div>
            </div>
            </div>
          </div>
        </div> 

      </div>
    </SectionContainer>
  )
}

export default AdminAddCoupon
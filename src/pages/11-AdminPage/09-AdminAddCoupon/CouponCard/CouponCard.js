import './CouponCard.css'

const CouponCard = (props) => {
  return (
    <div className="coupon-card my-3 shadow">
      <div className="coupon-card__content">
          <div className="d-flex justify-content-between align-items-center">
            <h6>اسم الكوبون : <span>{props.item.name}</span></h6>
            <div className="d-flex">
              <div className="coupon-controls__edit">
                <i className="fa-solid fa-pen-to-square" onClick={() => props.editCouponOnClickHandle(props.item._id)}></i>
              </div>
              <div className="coupon-controls__remove me-4">
                <i className="fa-solid fa-trash" onClick={() => props.removeCouponOnClickHandle(props.item._id)}></i>
              </div>
            </div>
          </div>
          <h6>تاريخ الانتهاء : <span>{`${new Date(props.item.expireDate).getDate()}/${new Date(props.item.expireDate).getMonth() + 1}/${new Date(props.item.expireDate).getFullYear()}`}</span></h6>
          <h6>نسبة الخصم : <span>{props.item.discountPercentage}%</span></h6>





            <h6 className={`${props.item.maxDiscount ? "d-block" : "d-none"}`}>اقصى حد للخصم : <span>{props.item.maxDiscount}</span></h6>
            <div className={`coupon-card__date d-flex justify-content-end align-items-center  
            ${Math.ceil((new Date(props.item.expireDate) - new Date()) / (1000*60*60*24)) <= 0 ? `text-danger` : 
            Math.ceil((new Date(props.item.expireDate) - new Date()) / (1000*60*60*24)) > 0 &&
            Math.ceil((new Date(props.item.expireDate) - new Date()) / (1000*60*60*24)) < 3 ? `text-warning` : 
            `text-primary` } `}>
              <i className="fa-solid fa-circle-info"></i>
              <span className={`me-1 `}>{new Date(props.item.expireDate) <= new Date() ? " منتهى " : ` باقى ${Math.ceil((new Date(props.item.expireDate) - new Date()) / (1000*60*60*24))} يوم`}</span>
            </div>


          
      </div>
    </div>
  )
}

export default CouponCard
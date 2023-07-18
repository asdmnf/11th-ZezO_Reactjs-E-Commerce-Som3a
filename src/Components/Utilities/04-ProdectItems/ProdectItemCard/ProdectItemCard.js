import { Link, useNavigate } from 'react-router-dom'
import ProdectItemCardHook from '../../../../Hooks/Product/ProdectItemCardHook'
import './ProdectItemCard.css'

const ProdectItemCard = (props) => {
    const [favIconOnClickHandle, showSolidFavIcon] = ProdectItemCardHook(props.wishListData, props.wishListDataIsLoaded, props.productID)
    const navigate = useNavigate()
    return (
        <div className="prodect-item-card card shadow">
            <div className={`admin-controls ${props.showAdminControls === "yes" && (`d-flex`)} justify-content-between align-items-center`}>
                <div className="admin-controls__edit">
                <i className="fa-solid fa-pen-to-square" onClick={()=>{
                    navigate(`/admin/edit-product/${props.productID}`)
                }} ></i>
                </div>
                <div className="admin-controls__remove">
                <i className="fa-solid fa-trash" onClick={()=>{
                    props.productDeleteIconOnClickHandle(props.productID)
                }} ></i>
                </div>
            </div>
            <Link to={`/product/${props.productID}`} className="prodect-item-card-image d-flex justify-content-center align-items-center">
                <img src={props.productImage} alt="" />
            </Link>
            <div className="prodect-item-card-fav-icon d-flex justify-content-end mt-3">
                {
                    !props.showSolidFavIcon ? (
                        <>
                            <i className={`fa-regular fa-heart ${showSolidFavIcon ? `d-none` : `d-block` } ${localStorage.getItem("userRole") === "admin" ? `d-none` : null}`} onClick={()=> favIconOnClickHandle(props.productID)} ></i>
                            <i className={`fa-solid fa-heart ${showSolidFavIcon ? `d-block` : `d-none` }`} onClick={()=> favIconOnClickHandle(props.productID)} ></i>
                        </>
                    ) : <i className="fa-solid fa-heart" onClick={()=> props.favIconOnClickHandle(props.productID)} ></i>
                }
            
            </div>
            <Link to={`/product/${props.productID}`} className="prodect-item-card-description text-decoration-none mt-2">
                <p>{props.productDescription}</p>
            </Link>
            <div className="prodect-item-card-price-rating d-flex justify-content-between align-items-center">
                <div className="prodect-item-card-rating">
                <i className="fa-solid fa-star"></i>
                <span>{props.productRating}</span>
                </div>
                <div className="prodect-item-card-price d-flex">
                    <span className={`ms-1 ${props.productPriceAfterDiscount ? `text-decoration-line-through text-danger` : `d-none`}`}>{props.productPrice}</span>
                    <span>{props.productPriceAfterDiscount ? props.productPriceAfterDiscount : props.productPrice}</span>
                    <p>جنيه</p>
                </div>
            </div>


            {/* معادلة الخصم */}
            <div className="product-discount-percentage">
                <div className={` d-flex justify-content-end align-items-center ${props.productPriceAfterDiscount ? '' : `d-none`}`}>
                    <i className="fa-solid fa-gift ms-1"></i>
                    <div>
                        خصم {""}
                        {
                            props.productPriceAfterDiscount ? (
                                parseInt(((props.productPrice - props.productPriceAfterDiscount) / props.productPrice) * 100)
                            ) : null
                        }
                        %
                    </div>
                </div>
            </div>


            <div className={`admin-product-quantity-info ${localStorage.getItem("userRole") === "admin" ? `` : `d-none`}`}>
                <div className={`product-quantity mt-2 d-flex align-items-center  ${props.productQuantity <= 3 ? `text-danger` : props.productQuantity > 3 && props.productQuantity <= 7 ? `text-warning` : props.productQuantity > 7 ? `text-success` : null } `}>
                    <i className="fa-solid fa-circle-info"></i>
                    <div className='me-1' >المتاح بالمخزن: {props.productQuantity}</div>
                </div>
                <div className="product-quantity text-primary d-flex align-items-center">
                    <i className="fa-solid fa-circle-info"></i>
                    <div className='me-1' >تم بيع: {props.productSold}</div>
                </div>
                </div>

        </div>
    )
}

export default ProdectItemCard
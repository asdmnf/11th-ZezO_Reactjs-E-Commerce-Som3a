import PrpductRating from '../14-PrpductRating/PrpductRating'
import ProductButtonStyle from '../15-ProductButtonStyle/ProductButtonStyle'
import Spinner from "react-bootstrap/Spinner";
import { nanoid } from 'nanoid';
import ProductContentHook from '../../../Hooks/Cart/ProductContentHook';
import './ProductContent.css'
import { useNavigate } from 'react-router-dom';

const ProductContent = (props) => {
  const [addToCartOnClickHandle, colorOnClickHandle, colorValue, loader, categoryItemOnClickHandle, brandItemOnClickHandle] = ProductContentHook(props.specificProductData)

  const navigateTo = useNavigate()

  return (
    <div className="product-page-content">
              <div className={`admin-controls__edit-product ${localStorage.getItem("userRole") === "admin" ? "" : "d-none"}`}>
                <i className="fa-solid fa-pen-to-square" onClick={()=>{
                    navigateTo(`/admin/edit-product/${props.specificProductData._id}`)
                }} ></i>
                </div>

              <div className={`product-category ${props.specificProductData?.mainCategory?.name ? "" : "d-none"}`}>
                القسم : <span onClick={() => categoryItemOnClickHandle(props.specificProductData?.mainCategory?._id)} style={{cursor: "pointer"}}>{props.specificProductData?.mainCategory ? props.specificProductData?.mainCategory?.name : <Spinner animation="grow" variant="info me-1" />}</span>
                <span className='text-dark fs-5'> | </span> <span> {props.specificProductData?.subCategory?.map(item => {
                  return <span className='' key={item._id} style={{cursor: "pointer"}} onClick={() => {
                    sessionStorage.setItem("subCategorySortValue", `subCategory=${item._id}`)
                    navigateTo("/search-result")
                  }}> &#187; {item.name} </span>
                })} </span>
              </div>
              <div className={`product-brand ${props.specificProductData?.brand?.name ? "" : "d-none"}`}>
                الماركة : <span onClick={() => brandItemOnClickHandle(props.specificProductData?.brand?._id)} style={{cursor: "pointer"}} >{props.specificProductData?.brand ? props.specificProductData?.brand?.name : <Spinner animation="grow" variant="info me-1" />}</span>
              </div>
              <div className="product-title">
                <h5>{props.isLoaded ? (props.specificProductData ? (props.specificProductData.title) : "لا توجد بيانات") : <Spinner animation="grow" variant="info me-1" />}</h5>
              </div>
              <PrpductRating rate={props.isLoaded ? (props.specificProductData ? (props.specificProductData.ratingAverage) : "لا توجد بيانات") : <Spinner animation="grow" variant="info me-1" />}></PrpductRating>
              <div className="product-colors d-flex mb-3">
              {props.isLoaded ? (props.specificProductData ? (props.specificProductData.color.map((item)=>{
                    return <span key={nanoid()} style={{ backgroundColor: item, outline: `${colorValue === item ? (`3px dashed #0d6efd`) : `none` }` }} onClick={() => {
                      colorOnClickHandle(item)
                    }} ></span>
                  })) : "لا توجد بيانات") : <Spinner animation="grow" variant="info me-1" />}
              </div>
              <div className="product-description">
                المواصفات :
                <div>{props.isLoaded ? (props.specificProductData ? (props.specificProductData.description) : "لا توجد بيانات") : <Spinner animation="grow" variant="info me-1" />}</div>
              </div>
              <div className="d-flex align-items-center">
                <div className="product-price">
                <span>{props.isLoaded ? (props.specificProductData ? (props.specificProductData.priceAfterDiscount ? props.specificProductData.priceAfterDiscount : props.specificProductData.price ) : "...") : <Spinner animation="grow" variant="info me-1" />} </span>
                جنيه
                </div>
                <div className={`product-cart me-3  ${localStorage.getItem("userRole") === "admin" || (props.isLoaded && props.specificProductData && props.specificProductData.quantity <= 0) ? `d-none` : null} `}>
                <ProductButtonStyle onClick={addToCartOnClickHandle}>
                  أضف الى العربة
                  <Spinner animation="border" className={`add-to-cart-spinner ${!loader ? `d-none` : null}`} />
                  </ProductButtonStyle>
                </div>
              </div>

              {/* معادلة الخصم */}
            <div className={`product-discount-percentage d-flex mt-2 align-items-center ${props.isLoaded && props.specificProductData && props.specificProductData.priceAfterDiscount ? '' : `d-none`}`}>
                <i className="fa-solid fa-gift ms-1"></i>
                <div>
                    خصم {""}
                    {
                        props.isLoaded && props.specificProductData && props.specificProductData.priceAfterDiscount ? (
                            parseInt(((props.specificProductData.price - props.specificProductData.priceAfterDiscount) / props.specificProductData.price) * 100)
                        ) : null
                    }
                    %
                </div>
                <div className="me-2 text-secondary">بدلا من <span className='text-danger text-decoration-line-through'>{props.specificProductData?.price}</span> <span>جنيه</span> </div>
            </div>

                  {/* الكمية والبيع للادمن */}
              <div className={`admin-product-quantity-info ${localStorage.getItem("userRole") === "admin" ? `` : `d-none`}`}>
                <div className={`product-quantity mt-2 d-flex align-items-center  ${props.isLoaded && props.specificProductData ? (props.specificProductData.quantity <= 3 ? `text-danger` : props.specificProductData.quantity > 3 &&  props.specificProductData.quantity <= 7 ? `text-warning` : props.specificProductData.quantity > 7 ? `text-success` : ``) : null } `}>
                    <i className="fa-solid fa-circle-info"></i>
                    <div className='me-1' >المتاح بالمخزن: {props.isLoaded && props.specificProductData ? props.specificProductData.quantity : "..."}</div>
                </div>
                <div className="product-quantity text-primary d-flex align-items-center">
                    <i className="fa-solid fa-circle-info"></i>
                    <div className='me-1' >تم بيع: {props.isLoaded && props.specificProductData ? props.specificProductData.sold : "..."}</div>
                </div>
                </div>

                  {/* الكمية للمستخدم العادى */}
              <div className={`admin-product-quantity-info product-quantity text-danger mt-2 d-flex align-items-center ${(localStorage.getItem("userRole") === "user" || !localStorage.getItem("userRole")) && props.isLoaded && props.specificProductData && props.specificProductData.quantity <= 0 ? `` : `d-none`}`}>
              <i className="fa-solid fa-circle-info"></i>
              <div className='me-1'>نفذت الكمية</div>
              </div>
              
            </div>
  )
}

export default ProductContent
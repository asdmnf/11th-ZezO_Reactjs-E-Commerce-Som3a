import "./ProductCarousel.css";
import Carousel from "react-bootstrap/Carousel";
import { nanoid } from "nanoid";
import ProductCarouselHook from "../../../Hooks/WishList/ProductCarouselHook";

const ProductCarousel = (props) => {
  const [favIconOnClickHandle, showSolidFavIcon] = ProductCarouselHook()
  return (
    <div className="product-carousel shadow-sm">
      <Carousel variant="dark">
        {props.isLoaded
          ? props.specificProductData
            ? props.specificProductData?.iamgesGallery.map((item) => {
                return (
                  <Carousel.Item key={nanoid()} interval={2000}>
                    <div className="product-carousel-item d-flex justify-content-center align-items-center">
                      <img src={item} alt="" />
                    </div>
                  </Carousel.Item>
                );
              })
            : null
          : null}
      </Carousel>
      <div className={`product-favourite ${localStorage.getItem("userRole") === "admin" ? `d-none` : null} `}>
        <i
          className={`fa-regular fa-heart ${
            showSolidFavIcon ? `d-none` : `d-block`
          }`}
          onClick={() => favIconOnClickHandle(props.specificProductData._id)}
        ></i>
        <i
          className={`fa-solid fa-heart ${
            showSolidFavIcon ? `d-block` : `d-none`
          }`}
          onClick={() => favIconOnClickHandle(props.specificProductData._id)}
        ></i>
      </div>
    </div>
  );
};

export default ProductCarousel;

import "./PrpductRating.css";

const PrpductRating = (props) => {
  return (
    <div className="product-rating text-warning mb-2 mx-2">
      {
        props.rate === 1 ? (
          <>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : props.rate === 1.5 ? (
          <>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star-half-stroke"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : props.rate === 2 ? (
          <>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : props.rate === 2.5 ? (
          <>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star-half-stroke"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : props.rate === 3 ? (
          <>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : props.rate === 3.5 ? (
          <>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star-half-stroke"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : props.rate === 4 ? (
          <>
            <i className="fa-regular fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : props.rate === 4.5 ? (
          <>
            <i className="fa-regular fa-star-half-stroke"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : props.rate === 5 ? (
          <>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </>
        ) : null
      }
      <span className="me-1">{props.rate}</span>
    </div>
  );
};

export default PrpductRating;

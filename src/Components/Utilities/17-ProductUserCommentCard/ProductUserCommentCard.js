import PrpductRating from "../14-PrpductRating/PrpductRating";
import "./ProductUserCommentCard.css";

const ProductUserCommentCard = (props) => {
  return (
    <div className="user-comment-card">
      <div className="name-and-rating-and-controls d-flex justify-content-between align-items-center">
        <div className="name-and-rating d-flex">
          <div className="user-comment-card-username ms-3">{props.name}</div>
          <PrpductRating rate={props.rate}></PrpductRating>
        </div>
        <div className={`user-controls ${props.showUserControls === "yes" && (`d-flex`)}`}>
          <div className={`user-controls__edit ${localStorage.getItem("userRole") === "admin" ? "d-none" : ""}`}>
            <i className="fa-solid fa-pen-to-square" onClick={()=> props.editCommentOnClickHandle(props.id)}></i>
          </div>
          <div className={`user-controls__remove me-4`}>
            <i className="fa-solid fa-trash" onClick={()=> props.removeCommentOnClickHandle(props.id)}></i>
          </div>
        </div>
      </div>
      <div className="user-comment-card-text">{props.comment}</div>
      <hr />
    </div>
  );
};

export default ProductUserCommentCard;

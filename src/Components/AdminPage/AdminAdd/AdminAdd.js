import CartPageButton from "../../CartPage/CartPageButton";
import addImage from "../../../Assets/images/add-image.png";
import "./AdminAdd.css";

const AdminAdd = (props) => {

  return (
    <div>
      <div className="add-brand__image">
        <h6>{props.title}</h6>
        <label htmlFor="add-image">
          <img src={addImage} alt="" />
        </label>
        <input className="d-none" type="file" name="" id="add-image" />
      </div>
      <div className="col-8">
        <div className="add-brand__name">
          <input className="mt-2" type="text" placeholder={props.inputPlaceHolder} />
          <div className={`add-brand__btn ${props.BtnDisplay}`}>
            <CartPageButton >
              <button >حفظ التعديلات</button>
            </CartPageButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAdd;

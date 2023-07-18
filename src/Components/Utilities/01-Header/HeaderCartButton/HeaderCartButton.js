import { Link } from "react-router-dom";
import HeaderCartButtonHook from "../../../../Hooks/Cart/HeaderCartButtonHook";
import "./HeaderCartButton.css";


const HeaderCartButton = (props) => {
  const [allCartDataIsLoaded, allCartData] = HeaderCartButtonHook()

  return (
    <Link to={props.ToLink} className={`header-cart-button ${!localStorage.getItem("userRole") || localStorage.getItem("userRole") === "admin" ? `d-none` : null}`}>
      <div className="d-flex justify-content-center align-items-center ">
        {props.children}
        <span className={`cart-count badge ${allCartDataIsLoaded && allCartData.status && allCartData.numberOfCartItems === 0 ? `d-none` : `` }`}>
          {allCartDataIsLoaded && allCartData.status === 200
            ? allCartData.numberOfCartItems
            : null}
        </span>
      </div>
    </Link>
  );
};

export default HeaderCartButton;

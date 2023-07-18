import { Link } from "react-router-dom";
import logo from "../../../Assets/images/Logo-png.png";
import HeaderButton from "./HeaderButton/HeaderButton";
import HeaderHook from "../../../Hooks/HeaderHook";
import { ToastContainer } from "react-toastify";
import HeaderCartButton from "./HeaderCartButton/HeaderCartButton";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const [searchInputOnChangeHandle, logOutOnClickHandle] = HeaderHook();

  const anyData = useSelector(state => state.linkReducer.anyData)

  return (
    <header className="header d-flex justify-content-center align-items-center fixed-top">
      <div className="container d-flex justify-content-center align-items-center gap-2">
        <div className="logo-and-search d-flex align-items-center w-100">
          <div className="header-logo">
            <Link to="/">
              <img className="img-fluid" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="header-search mx-3">
            <form>
              <input
                type="text"
                placeholder="ابحث عن منتج"
                onChange={searchInputOnChangeHandle}
                value={sessionStorage.getItem("search-value") ? sessionStorage.getItem("search-value") : null || ""}
              />
              <Link to="/search-result">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </form>
          </div>
        </div>
        <div className="dropdown-and-cart d-flex align-items-center">
          {localStorage.getItem("userRole") ? (
            localStorage.getItem("userRole") === "admin" ? (
              <div className="dropdown ms-3">
                <button
                  type="button"
                  className="btn btn-warning dropdown-toggle"
                  data-bs-toggle="dropdown"
                > 
                  أهلا بيك يا {JSON.parse(localStorage.getItem("userData")).name} <span></span>
                </button> 
                <ul className="dropdown-menu text-bg-warning">
                  <li>
                    <Link className="dropdown-item" to="/admin/profile">
                      لوحة التحكم
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={logOutOnClickHandle}>تسجيل الخروج</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown ms-3">
                <button
                  type="button"
                  className="btn btn-warning dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  أهلا بيك يا {JSON.parse(localStorage.getItem("userData")).name} <span></span>
                </button>
                <ul className="dropdown-menu text-bg-warning">
                  <li>
                    <Link className="dropdown-item" to="/user/orders">
                      إدارة الطلبات
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user/fav-products">
                      القائمة المفضلة
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user/addresses">
                      العناوين الشخصية
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user/profile">
                      الملف الشخصى
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={logOutOnClickHandle}>تسجيل الخروج</Link>
                  </li>
                </ul>
              </div>
            )
          ) : (
            <HeaderButton ToLink="/login">
              <i className="fa-regular fa-circle-user"></i>
              دخول
            </HeaderButton>
          )}

          <HeaderCartButton ToLink="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            العربة
          </HeaderCartButton>
        </div>
      </div>
      <ToastContainer autoClose={500} />
    </header>
  );
};

export default Header;

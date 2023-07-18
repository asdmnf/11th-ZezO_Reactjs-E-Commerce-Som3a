import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginRegisterForm from "../../Components/LoginRegisterpages/01-LoginRegisterForm/LoginRegisterForm";
import SectionContainer from "../../Components/Utilities/09-SectionContainer/SectionContainer";
import LoginPageHook from "../../Hooks/LoginPageHook";
import Spinner from 'react-bootstrap/Spinner';
import "./LoginPage.css";

const LoginPage = () => {
  const [emailInputElementRef, passwordInputElementRef, emailInput, passwordInput, emailInputOnChangeHandle, passwordInputOnChangeHandle, formButtonOnClickHandle, loader] = LoginPageHook()
  return (
    <SectionContainer>
      <div className="login-register-header">
      <p>تسجيل الدخول</p>
    </div>
      <LoginRegisterForm 
        BtnTitle="تسجيل الدخول"
        emailInputElementRef = {emailInputElementRef}
        passwordInputElementRef = {passwordInputElementRef}
        emailInput = {emailInput}
        passwordInput = {passwordInput}
        emailInputOnChangeHandle = {emailInputOnChangeHandle}
        passwordInputOnChangeHandle = {passwordInputOnChangeHandle}
        formButtonOnClickHandle = {formButtonOnClickHandle}
      >
        تسجيل الدخول
        <Spinner animation="border" className={`forget_password-spinner ${!loader ? `d-none` : null}`} />
      </LoginRegisterForm>
        <div className="login-register d-flex justify-content-center">
            <p>ليس لديك حساب ؟</p>
            <Link to="/register" className="text-decoration-none me-2">أنشئ حساب جديد</Link>
        </div>
        <div className="login-register d-flex justify-content-center">
            <p>نسيت كلمة السر ؟</p>
            <Link to="/forget-password" className="text-decoration-none me-2">إضغط هنا</Link>
        </div>
        <ToastContainer autoClose={500} />
    </SectionContainer>
  );
};

export default LoginPage;

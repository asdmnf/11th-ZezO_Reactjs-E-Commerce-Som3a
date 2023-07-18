import { Link } from 'react-router-dom'
import LoginRegisterForm from '../../Components/LoginRegisterpages/01-LoginRegisterForm/LoginRegisterForm'
import SectionContainer from '../../Components/Utilities/09-SectionContainer/SectionContainer'
import RegisterPageHook from '../../Hooks/RegisterPageHook'
import Spinner from 'react-bootstrap/Spinner';
import './RegisterPage.css'

const RegisterPage = () => {
  const [userNameInputOnChangeHandle, emailInputOnChangeHandle, phoneInputOnChangeHandle, passwordInputOnChangeHandle, passwordConfirmationInputOnChangeHandle, userNameInput, emailInput, phoneInput, passwordInput, passwordConfirmationInput, formButtonOnClickHandle, userNameInputElementRef, emailInputElementRef, phoneInputElementRef, passwordInputElementRef, passwordConfirmationInputElementRef, loader] = RegisterPageHook()
  return (
    <SectionContainer>
      <div className="login-register-header">
      <p>حساب جديد</p>
    </div>
      <LoginRegisterForm
        BtnTitle="أنشئ حساب جديد"
        userNameInputElementRef = {userNameInputElementRef}
        emailInputElementRef = {emailInputElementRef}
        phoneInputElementRef = {phoneInputElementRef}
        passwordInputElementRef = {passwordInputElementRef}
        passwordConfirmationInputElementRef = {passwordConfirmationInputElementRef}
        userNameInput = {userNameInput}
        emailInput = {emailInput}
        phoneInput = {phoneInput}
        passwordInput = {passwordInput}
        passwordConfirmationInput = {passwordConfirmationInput}
        userNameInputOnChangeHandle = {userNameInputOnChangeHandle}
        emailInputOnChangeHandle = {emailInputOnChangeHandle}
        phoneInputOnChangeHandle = {phoneInputOnChangeHandle}
        passwordInputOnChangeHandle = {passwordInputOnChangeHandle}
        passwordConfirmationInputOnChangeHandle = {passwordConfirmationInputOnChangeHandle}
        formButtonOnClickHandle = {formButtonOnClickHandle}
      >
        أنشئ حساب جديد
        <Spinner animation="border" className={`forget_password-spinner ${!loader ? `d-none` : null}`} />
      </LoginRegisterForm>
        <div className="login-register d-flex justify-content-center">
            <p>لديك حساب بالفعل ؟</p>
            <Link to="/login" className="text-decoration-none me-2">تسجيل الدخول</Link>
        </div>
    </SectionContainer>
  )
}

export default RegisterPage
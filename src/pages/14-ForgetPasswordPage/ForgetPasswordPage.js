import { ToastContainer } from "react-toastify";
import FormButtonStyle from "../../Components/LoginRegisterpages/02-FormButtonStyle/FormButtonStyle";
import SectionContainer from "../../Components/Utilities/09-SectionContainer/SectionContainer";
import ForgetPasswordPageHook from "../../Hooks/ForgetPasswordPageHook";
import Spinner from 'react-bootstrap/Spinner';
import "./ForgetPasswordPage.css";

const ForgetPasswordPage = () => {
  const [emailFormButtonOnClickHandle, codeFormButtonOnClickHandle, passwordFormButtonOnClickHandle, emailInputOnChangeHandle, emailInput, emailInputElementRef, codeInputOnChangeHandle, codeInput, codeInputElementRef, oldPasswordInputOnChangeHandle, oldPasswordInput, oldPasswordInputElementRef, newPasswordInputOnChangeHandle, newPasswordInput, newPasswordInputElementRef, emailLoader, codeLoader, changePasswordLoader] = ForgetPasswordPageHook()
  return (
    <SectionContainer>
      <div className="login-register-header">
        <p>نسيت كلمة السر</p>
      </div>
      <div className="login-form m-auto my-5 col-11 col-sm-8 col-md-6 col-lg-4">
        <div className="d-flex flex-column">
          <input className="text-center" type="email" name="" id="email" placeholder="الإيميل" onChange={emailInputOnChangeHandle} value={emailInput} ref={emailInputElementRef} />

          <FormButtonStyle formButtonOnClickHandle={emailFormButtonOnClickHandle}  BtnTitle="أرسل الإيميل للحصول على كود تفعيل">
          أرسل الإيميل للحصول على كود تفعيل
          <Spinner animation="border" className={`forget_password-spinner ${!emailLoader ? `d-none` : null}`} />
          </FormButtonStyle>
        </div>
        <div className="d-flex flex-column mt-5">
          <input className="forget-password__verify-code text-center" maxLength={6} type="text" name="" id="text" placeholder="ادخل كود التفعيل" onChange={codeInputOnChangeHandle} value={codeInput} ref={codeInputElementRef} />
          <FormButtonStyle formButtonOnClickHandle={codeFormButtonOnClickHandle}  BtnTitle="تأكيد كود التفعيل">
          تأكيد كود التفعيل
          <Spinner animation="border" className={`forget_password-spinner ${!codeLoader ? `d-none` : null}`} />
          </FormButtonStyle>
        </div>
        <div className="d-flex flex-column mt-5">
        <input type="password" name="" id="old-password" placeholder="كلمة السر الجديدة" onChange={oldPasswordInputOnChangeHandle} value={oldPasswordInput} ref={oldPasswordInputElementRef} />
        <input type="password" name="" id="new-password" placeholder="تأكيد كلمة السر الجديدة" onChange={newPasswordInputOnChangeHandle} value={newPasswordInput} ref={newPasswordInputElementRef} />
          <FormButtonStyle formButtonOnClickHandle={passwordFormButtonOnClickHandle}  BtnTitle="تغيير كلمة السر">
          تغيير كلمة السر
          <Spinner animation="border" className={`forget_password-spinner ${!changePasswordLoader ? `d-none` : null}`} />
          </FormButtonStyle>
        </div>
      </div>

      <ToastContainer autoClose={500} />
    </SectionContainer>
  );
};

export default ForgetPasswordPage;

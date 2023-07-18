import FormButtonStyle from "../02-FormButtonStyle/FormButtonStyle";
import "./LoginRegisterForm.css";

const LoginRegisterForm = (props) => {  
  return (
    <div className="login-form m-auto my-3 col-11 col-sm-8 col-md-6 col-lg-4">
      <form action="" className="d-flex flex-column">
        {props.BtnTitle === "أنشئ حساب جديد" && (<input type="text" name="" id="text" placeholder="اسم المستخدم" onChange={props.userNameInputOnChangeHandle} value={props.userNameInput} ref={props.userNameInputElementRef} />)}
        <input type="email" name="" id="email" placeholder="الإيميل" onChange={props.emailInputOnChangeHandle} value={props.emailInput} ref={props.emailInputElementRef} />
        {props.BtnTitle === "أنشئ حساب جديد" && (<input type="tel" name="" id="tel" placeholder="الموبايل" onChange={props.phoneInputOnChangeHandle} value={props.phoneInput} ref={props.phoneInputElementRef} />)}
        <input type="password" name="" id="password" placeholder="كلمة السر" onChange={props.passwordInputOnChangeHandle} value={props.passwordInput} ref={props.passwordInputElementRef} />
        {props.BtnTitle === "أنشئ حساب جديد" && (<input type="password" name="con-password" id="" placeholder="تأكيد كلمة السر" onChange={props.passwordConfirmationInputOnChangeHandle} value={props.passwordConfirmationInput} ref={props.passwordConfirmationInputElementRef} />)}
        <FormButtonStyle formButtonOnClickHandle={props.formButtonOnClickHandle} BtnTitle={props.BtnTitle}>{props.children}</FormButtonStyle>
      </form>
    </div>
  );
};

export default LoginRegisterForm;

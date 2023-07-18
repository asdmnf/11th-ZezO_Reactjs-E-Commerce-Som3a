import './FormButtonStyle.css'

const FormButtonStyle = (props) => {
  return (
    <button className='form-btn-style' onClick={props.formButtonOnClickHandle} type="submit">{props.children}</button>
  )
}

export default FormButtonStyle
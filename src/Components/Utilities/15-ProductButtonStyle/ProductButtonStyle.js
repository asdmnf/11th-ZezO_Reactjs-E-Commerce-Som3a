import './ProductButtonStyle.css'

const ProductButtonStyle = (props) => {
  return (
    <button className="product-btn-style" onClick={props.onClick}>{props.children}</button>
  )
}

export default ProductButtonStyle
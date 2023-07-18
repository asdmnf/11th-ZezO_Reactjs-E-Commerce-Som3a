import './CartPageButton.css'

const CartPageButton = (props) => {
  return (
    <div className='cart-page-btn'>{props.children}</div>
  )
}

export default CartPageButton
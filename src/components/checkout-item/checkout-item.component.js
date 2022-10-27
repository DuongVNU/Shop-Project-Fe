import './checkout-item.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, clearItemFromCart, removeItemToCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";

const CheckoutItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems)
  
  
  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name}/>
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => dispatch(removeItemToCart(cartItem, cartItems))}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => dispatch(addItemToCart(cartItem, cartItems))}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div onClick={() => dispatch(clearItemFromCart(cartItem, cartItems))} className='remove-button'>&#x2715;</div>
    </div>
  )
}

export default CheckoutItem;

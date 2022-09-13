import './cart-icon.styles';
import {useContext} from "react";
import {CartContext} from "../../context/cart.context";
import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles';

const CartIcon = () => {
  const {isCartOpen, setIsCartOpen} = useContext(CartContext)
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)
  const {cartCount} = useContext(CartContext)
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;

import {Outlet, Link} from "react-router-dom";
import {ReactComponent as LogoImg} from "../../../src/assets/crown.svg";
import './navigation.styles'
import {useContext} from "react";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../context/cart.context";
import {NavigationContainer, NavLink, LogoContainer, NavLinks} from './navigation.styles'
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";

const Navigation = () => {
  const currentUser =  useSelector(selectCurrentUser);
  
  const {isCartOpen} = useContext(CartContext);
  
  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <LogoImg className='logo'/>
        </LogoContainer>
        <NavLinks className='nav-links-container'>
          <NavLink to='/shop'>SHOP</NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) : <NavLink to='/auth'>SIGN IN</NavLink>
            
          }
          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet/>
    </>
  )
}

export default Navigation;

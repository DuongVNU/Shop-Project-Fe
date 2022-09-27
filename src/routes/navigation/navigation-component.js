import {Outlet} from "react-router-dom";
import {ReactComponent as LogoImg} from "../../../src/assets/crown.svg";
import './navigation.styles'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {NavigationContainer, NavLink, LogoContainer, NavLinks} from './navigation.styles'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import {signOutStart} from "../../store/user/user.action";


const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const signOutUser = dispatch(signOutStart())

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <LogoImg className='logo'/>
        </LogoContainer>
        <NavLinks className='nav-links-container'>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) :
            <NavLink to='/auth'>SIGN IN</NavLink>

          }
          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet/>
    </>)
}

export default Navigation;

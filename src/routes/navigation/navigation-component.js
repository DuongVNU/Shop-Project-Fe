import {Outlet, Link} from "react-router-dom";
import {ReactComponent as LogoImg} from "../../../src/assets/crown.svg";
import './navigation.styles.scss'
import {useContext} from "react";
import {UserContext} from "../../context/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../context/cart.context";

const Navigation = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  
  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null)
  }
  
  const {isCartOpen} = useContext(CartContext);
  
  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <LogoImg className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
            ) : <Link className='nav-link' to='/auth'>SIGN IN</Link>
            
          }
          <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet/>
    </>
  )
}

export default Navigation;

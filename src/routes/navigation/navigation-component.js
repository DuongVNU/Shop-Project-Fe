import {Outlet, Link} from "react-router-dom";
import {ReactComponent as LogoImg} from "../../../src/assets/crown.svg";
import './navigation.styles.scss'
import {useContext} from "react";
import {UserContext} from "../../context/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const {currentUser,setCurrentUser} = useContext(UserContext)
  
  const signOutHandler =async () => {
   const res = await signOutUser();
    setCurrentUser(null)
  }
  
  
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
          
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Navigation;

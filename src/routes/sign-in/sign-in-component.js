import {
  createUserDocumentFromAuth,
  signInWithGooglePopup
} from '../../utils/firebase/firebase.utils'
import SignUpForm from "../../components/sign-up-form/sign-up-form-component";

const SignIn = ()=>{
  
  const logGoogleUser = async () => {
    const {user} = await  signInWithGooglePopup();
    await createUserDocumentFromAuth(user)
  }
  
  return(
    <>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign In with goole
      </button>
  <SignUpForm/>

    </>
  )
}

export default SignIn

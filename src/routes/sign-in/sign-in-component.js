import {createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

const SignIn = ()=>{
  const logGoogleUser = async () => {
    const {user} = await  signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  
  
  return(
    <>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign In with goole
      </button>
    </>
  )
}

export default SignIn

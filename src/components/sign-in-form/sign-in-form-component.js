import {useState, useContext} from 'react'
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input-component";
import './sign-in-form.styles.scss';
import Button, {BUTTON_TYPE_CLASS} from "../button/button.component";
import {UserContext} from "../../context/user.context";

const defaultFormFields = {
  email: '',
  password: '',
}


const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields
  const {setCurrentUser} = useContext(UserContext);
  
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password)
      setCurrentUser(user);
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('incorrect password')
      } else if (error.code === 'auth/user-not-dound') {
        alert('no user associated with this email')
      }
      console.log("error sign-form", error)
    }
  }
  
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }
  
  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }
  
  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput
          label='Email'
          required
          type="email"
          onChange={handleChange}
          name='email'
          value={email}
        />
        
        <FormInput
          label='Password'
          required
          type="password"
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASS.google} onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      
      </form>
    
    </div>
  
  )
}

export default SignInForm;

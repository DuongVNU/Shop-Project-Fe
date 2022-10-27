import {useState} from 'react'
import FormInput from "../form-input/form-input-component";
import './sign-in-form.styles.scss';
import Button, {BUTTON_TYPE_CLASS} from "../button/button.component";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";

const defaultFormFields = {
  email: '',
  password: '',
}


const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields
  const dispatch = useDispatch();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      dispatch(emailSignInStart(email, password))
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('incorrect password')
      } else if (error.code === 'auth/user-not-found') {
        alert('no user associated with this email')
      }
      console.log("error sign-form", error)
    }
  }
  
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
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

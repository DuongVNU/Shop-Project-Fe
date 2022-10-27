import {useState} from 'react'
import FormInput from "../form-input/form-input-component";
import './sign-up-form.styles.scss';
import Button, {BUTTON_TYPE_CLASS} from "../button/button.component";
import {useDispatch} from "react-redux";
import {signUpStart} from "../../store/user/user.action";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields
  const dispatch = useDispatch();
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      // const {user} = await createAuthUserWithEmailAndPassword(email, password)
      // await createUserDocumentFromAuth(user, {displayName})
      
      dispatch(signUpStart(email, password, displayName))
      
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      }
      console.log('user creation encountered an error', error)
    }
  }
  
  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }
  
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          required type="text"
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        
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
        <FormInput
          label='Confirm Password'
          required
          type="password"
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        
        <Button buttonType={BUTTON_TYPE_CLASS.google} type="submit">Sign Up</Button>
      </form>
    
    </div>
  
  )
}

export default SignUpForm;

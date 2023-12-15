import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import extraContext from '../context/notes/ExtraContext';

function Signup() {
  const navigate = useNavigate();
  const Context = useContext(extraContext);
  const signup = Context.signup;
  const showAlert = Context.showAlert;
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" });

  const handelChange = (event) =>{
    setCredentials({...credentials, [event.target.name]: event.target.value});
  }

  const handelSubmit = async(event)=>{
    event.preventDefault();
    try {
      const response = await signup(credentials.name,credentials.email,credentials.password);
      if(response && response.success){
       localStorage.setItem("token", response.auth_token);
       navigate('/');
       showAlert("Success","Successfully Sign Up")
      }else{
        showAlert("Warning", response.message)
      }
    } catch (error) {
      console.log("Api error "+error.message);
    }
    setCredentials({name:"", email:"", password:""});
  }

  return (
    <div className='login-container'>
    <div className="heading"><p>Inotebook Signup</p></div>
    <div className="login">
       <form  method="post"  onSubmit={handelSubmit}>
            <input type="text" placeholder='Enter Your Name' name='name' value={credentials.name}  onChange={handelChange} required minLength={3} />
           <input type="email" placeholder='Enter Your Email'name='email' value={credentials.email}  onChange={handelChange} required/>
           <input type="password" placeholder='Enter Your Password' name='password' value={credentials.password} onChange={handelChange} required minLength={6} />
           <input type="submit" value="Sign up"  className='submit'/>
       </form>
    </div>
   </div>
  )
}

export default Signup

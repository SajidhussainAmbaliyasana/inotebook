import React, { useContext, useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import extraContext from "../context/notes/ExtraContext";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const context = useContext(extraContext);
  const login = context.login;
  const showAlert = context.showAlert;

  

  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(credentials.email, credentials.password);
      if (response && response.success) {
        localStorage.setItem('token', response.auth_token);
        navigate('/');
        showAlert("Success","Successfully Login ")
      } else {
        showAlert("warning",response.message);
      }
    } catch (error) {
      console.log("API Error: " + error.message);
    }
  
    setCredentials({ email: "", password: "" });
  };
  
  const handelChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    
  };
 
  

  return (
    <div className="login-container">
      <div className="heading">
        <p>Inotebook Login</p>
      </div>
      <div className="login">
        <form method="get" onSubmit={handelSubmit}>
          <input type="email" placeholder="Enter Your Email" name="email" value={credentials.email} required onChange={handelChange}
          />
          <input type="password" placeholder="Enter Your Password"  name="password" value={credentials.password} required minLength={6} onChange={handelChange}
          />
          <input type="submit" value="Login" className="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;

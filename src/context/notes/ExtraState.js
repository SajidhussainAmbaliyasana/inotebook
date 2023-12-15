import { useState } from "react";
import ExtraContext from "./ExtraContext";


const ExtraState = (props) => {

  const [model, setModel] = useState(false);
  const [alert,setAlert] = useState(null);
 

  const toggleModel = () => {
    setModel(!model);
  };

  const login = async (email, password) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
  
    try {
      const loginResponse = await fetch("http://localhost:5000/api/auth/login",requestOptions);
      const response = await loginResponse.json();
  
      return response; // Return the entire response object
    } catch (error) {
      console.log("Api Error" + error.message);
      throw error; // Re-throw the error to be caught in the calling function
    }
  };

  const signup = async(name,email,password)=>{
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password }),
    };
    try {
      const signup = await fetch("http://localhost:5000/api/auth/createuser",requestOptions);
      const response = await signup.json();
      return response;
    } catch (error) {
      console.log("Api Error"+error.message)
      throw error;
    }
  }

  const showAlert = (type,message)=>{
    const typeUpper = type.toUpperCase();
    setAlert({
      type:typeUpper,
      message:message
    })

    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

 
  
  return (
    <ExtraContext.Provider value={{ model, toggleModel, login, signup, alert, showAlert }}>
      {props.children}
    </ExtraContext.Provider>
  );
};

export default ExtraState;

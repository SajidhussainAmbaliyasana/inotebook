import React from 'react'
import './Style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'


function Navbar() {
  let location = useLocation();
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const handelLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='navbar'>
      <div className="nav-item ">
            <Link to="/" className={`${location.pathname === "/"?"active":"not-active"}`}>Home</Link>
        </div>
        <div className="nav-item">
            <Link to="about" className={`${location.pathname === "/about"?"active":"not-active"}`}>About</Link>
        </div>
        <div className="nav-item">
          {!token ? (
            <>
             <Link to="login"> <button> Login</button></Link>
            <Link to="signup"> <button>Signup</button></Link>
            </>
          ):(
            <button onClick={handelLogout}>Logout</button>
          )}
          
        </div>
        
    </div>
  )
}

export default Navbar

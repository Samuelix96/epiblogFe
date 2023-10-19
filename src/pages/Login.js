import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "../pages/login.css"
const Login = () =>  {
    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)
  
    const navigate= useNavigate();


    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    console.log(loginData)
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/login`,{
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(loginData)
            } );
            const data = await response.json();
            
            if (data.token) {
            setLoginData(data)
            localStorage.setItem("loggedInUser",JSON.stringify(data.token))
              console.log(data.token)
            navigate('/home')
        }
        } catch (error) {
            console.log("errore nella fetch del login", error)
        }
        
    }

    const redirectHandler = () => {
      window.location.href = `${process.env.REACT_APP_BASE_SERVER_URL}/auth/github`
    }


return(
    

<div class="login-box">
  <h2>Login</h2>
  <form onSubmit={onSubmit} >
    <div class="user-box">
      <input type="email"
      onChange={handleInputChange} name="email" required="" />
      <label>Email</label>
    </div>
    <div class="user-box">
      <input type="password"
      onChange={handleInputChange} name="password" required="" />
      <label>Password</label>
    </div>
    
    <a href="#">
        
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <button  className=" rounded text-white opacity-0.5" type="submit">Submit</button>
    </a>
  </form>
  <button className="mt-3 text-white" onClick={() => redirectHandler()}>Login with GitHub</button>
</div>


)
}

export default Login 
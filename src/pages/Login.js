import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/login.css"
import { Link } from "react-router-dom";
import { Dice1 } from "react-bootstrap-icons";
import { Container } from "react-bootstrap";

const Login = () =>
{
  const [ loginData, setLoginData ] = useState({})
  const [ login, setLogin ] = useState(null)
  const [error, setError] = useState(null)

  const navigate = useNavigate();


  const handleInputChange = (e) =>
  {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [ name ]: value
    })
  }


  console.log(loginData)
  const onSubmit = async (e) =>
  {
    e.preventDefault();
    try
    {
      const response = await fetch(`${ process.env.REACT_APP_BASE_SERVER_URL }/login`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(loginData)
      });
      const data = await response.json();

      if (data.token)
      {
        setLoginData(data)
        localStorage.setItem("token", JSON.stringify(data.token))
        console.log(data.token)
        navigate('/home')
      } else {
        setError("Accesso non riuscito Email o Password errate")
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    } catch (error)
    {
      console.log("errore nella fetch del login", error)   
    }

  }

  const redirectHandler = () =>
  {
    window.location.href = `${ process.env.REACT_APP_BASE_SERVER_URL }/auth/github`
  }


  return (
    <Container fluid className="backside-login">
      <div>
        <div class="container-login">
          <div class="screen">
            <div class="screen__content">
              <form onSubmit={ onSubmit } class="login">
                <div class="login__field">
                  <i class="login__icon fas fa-user"></i>
                  <input type="text"
                    onChange={ handleInputChange }
                    class="login__input"
                    name="email"
                    required
                    placeholder="User name / Email" />
                </div>
                <div class="login__field">
                  <i class="login__icon fas fa-lock"></i>
                  <input
                    onChange={ handleInputChange }
                    type="password"
                    name="password"
                    required
                    class="login__input"
                    placeholder="Password" />
                </div>
                <button class="button login__submit">
                  <span class="button__text">Log In Now</span>
                  <i class="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
              { error && (
                <div className="alert alert-danger mb-3">
                  { error }
                </div>
              ) }
              <div className="mx-3 p-2">
                <Link to={ `addNewUser` }>
                  <button className=" p-3 btn btn-success">Sign in </button>
                </Link>
              </div>
              <div class="social-login">
                <h3>Accedi con </h3>
                <div class=" fs-3 social-icons">
                  <button className=" btn btn-outline-primary rounded-5" onClick={ redirectHandler }>
                    <a href="#" class="social-login__icon fab fa-github "></a>
                  </button>
                  <button className="mx-1 btn btn-outline-primary rounded-5">
                    <a href="#" class="social-login__icon fab fa-facebook"></a>
                  </button>
                  <button className=" btn btn-outline-primary rounded-5">
                    <a href="#" class="social-login__icon fab fa-twitter"></a>
                  </button>
                </div>

              </div>
            </div>

            <div class="screen__background">
              <span class="screen__background__shape screen__background__shape4"></span>
              <span class="screen__background__shape screen__background__shape3"></span>
              <span class="screen__background__shape screen__background__shape2"></span>
              <span class="screen__background__shape screen__background__shape1"></span>
            </div>

          </div>
        </div>
      </div>

    </Container>


  )
}

export default Login 
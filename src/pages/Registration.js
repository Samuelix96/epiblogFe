import React , { useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import "./registration.css"
import axios from "axios"

const Registration = () => {
  const [registrationData, setRegistrationData] = useState({})
    const [loading, setLoading] = useState(false)
  
    const navigate= useNavigate();

    console.log(registrationData)

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setRegistrationData({
            ...registrationData,
            [name]: value
        })
    }

    const onSubmit = async(e) => {
      e.preventDefault();
      try {
          const response = await fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/registration`,{
              headers: {
                  "Content-Type": "application/json"
              },
              method: 'POST',
              body: JSON.stringify(registrationData)
          } );
          const data = await response.json();
          
          if (data.token) {
            setRegistrationData(data)
          localStorage.setItem("token",JSON.stringify(data.token))
            console.log(data.token)
          navigate('/')
      }
      } catch (error) {
          console.log("errore nella fetch del login", error)
      }
      
  }




  return (
    <div className=" prova-2 justify-content-center  vh-100 d-flex align-items-center ">
      <Form onSubmit={onSubmit} className='prova-3'  >
        <Form.Group className="mb-3 fs-4" controlId="exampleForm.ControlInput1">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            onChange={handleInputChange}
            placeholder="FirstName"
            autoFocus
            required
          />
          <Form.Label>lastName</Form.Label>
          <Form.Control
           type = "lastName"
           onChange={handleInputChange}
            placeholder="lastName"
            name="lastName"
            autoFocus
            required
          />
          
          <Form.Label>inserisci la tua email</Form.Label>
          <Form.Control
           type = "email"
           onChange={handleInputChange}
            placeholder="email"
            name="email"
            autoFocus
            required
          />
          <Form.Label>Crea la tua password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleInputChange}
            placeholder="password"
            name="password"
            autoFocus
            required
          />
          <Form.Label>Data di nascita </Form.Label>
          <Form.Control
            type="text"
            onChange={handleInputChange}
            placeholder="birth"
            name="birth"
            autoFocus
            required
          />
          <Form.Label>Inserisci l url della tua image</Form.Label>
          <Form.Control
            type="text"
            onChange={handleInputChange}
            placeholder="avatar"
            name="avatar"
            autoFocus
            required
          />
          
        </Form.Group>
        <button type="submit" className="btn btn-danger">Send Post</button>
      </Form>
    </div>
  )
}

export default Registration

import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import ProtectedRoutes from './middlewares/ProtectedRoute'
import ErrorNotFound from "./pages/BlogDetail"
import NewForm from "./pages/NewForm"
import Login from './pages/Login'
import Success from './pages/Success'

const App = () => {
  
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path= '/'  element={<Login/>}/>
        <Route path='/success' element= { <Success/>}/>
        <Route element={<ProtectedRoutes/>} >
        <Route path= '/home' element= {<Home />}/>
        
        </Route>
        <Route path= '/newblogs' element= {<NewForm />}/>
        <Route path= "*" element= {<ErrorNotFound />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App

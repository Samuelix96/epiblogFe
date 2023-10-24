import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProtectedRoutes from './middlewares/ProtectedRoute'
import ErrorNotFound from "./pages/BlogDetail"
import NewForm from "./pages/NewForm"
import Login from './pages/Login'
import Success from './pages/Success'
import UpdateBlogs from './pages/UpdateBlogs'
import Registration from "./pages/Registration"

const App = () =>
{

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={ <Login /> } />
          <Route path='/success' element={ <Success /> } />
          <Route path='/addNewUser' element={ <Registration/> } />
          <Route element={ <ProtectedRoutes /> } >

            <Route path='/home' element={ <Home /> } />
            <Route path='/newblogs' element={ <NewForm /> } />
            <Route path='/updateBlogs/:id' element={ <UpdateBlogs /> } />

          </Route>
          
          <Route path="*" element={ <ErrorNotFound /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

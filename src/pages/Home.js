import React, {useEffect} from 'react'

import Footer from "../components/footer/Footer"
import LatestPost from "../components/latestPost/LatestPost"
import { useSession } from '../hooks/authSessionLogin'
import MainLayout from '../layout/MainLayout'
import "./home.css"


const Home = () => {


  const session = useSession()
  console.log(session)

  

   
  return (
    <div className='home-box'>
    <MainLayout/>
    <LatestPost  />
    <Footer />
   
    </div>
    
  )
}

export default Home

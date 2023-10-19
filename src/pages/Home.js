import React from 'react'
import Navigation from "../components/navigation/Navigation"
import Footer from "../components/footer/Footer"
import LatestPost from "../components/latestPost/LatestPost"
import HeaderCarousel from "../components/jumbotron/Jumbotron"
import { useSession } from '../hooks/authSessionLogin'
const Home = () => {


  const session = useSession()
  console.log(session)

   
  return (
    <>
    <Navigation />
    <HeaderCarousel />
    <LatestPost />
    <Footer />
   
    </>
    
  )
}

export default Home

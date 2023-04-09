import React from 'react'
import AboutSection from '../HomeComponents/AboutSection'
import AvailableOnSection from '../HomeComponents/AvailableOnSection'
import Footer from '../HomeComponents/Footer'
import GetMyAvatarSection from '../HomeComponents/GetMyAvatarSection'
import HomeSection from '../HomeComponents/HomeSection'
import Navbar from '../HomeComponents/Navbar'
import PriceSection from '../HomeComponents/PriceSection'
import ReviewsSection from '../HomeComponents/ReviewsSection'
import TutorialSection from '../HomeComponents/TutorialSection'

const Home = () => {
  return (
    <div className='w-screen h-full bg-neutral'>
        <Navbar/>
        <HomeSection/>
        <ReviewsSection/>
        <AboutSection/>
        <TutorialSection/>
        <AvailableOnSection/>
        <PriceSection/>
        <GetMyAvatarSection/>
        <Footer/>
    </div>
  )
}

export default Home
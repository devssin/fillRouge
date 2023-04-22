import React from 'react'
import Header from '../components/Header'
import Hero from './Hero'
import About from './About'
import Doctors from './LatestDoctors'



const Home = () => {
  return (
    <div className='max-w-5xl mx-auto py-4'>
      <Header />
      <Hero />
      <About />
      <Doctors />

    </div>
  )
}

export default Home

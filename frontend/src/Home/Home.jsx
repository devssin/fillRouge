import React from 'react'
import Header from '../components/Header'
import Hero from './Hero'
import About from './About'


const Home = () => {
  return (
    <div className='max-w-5xl mx-auto py-4'>
        <Header />
        <Hero />
        <About />

    </div>

  )
}

export default Home
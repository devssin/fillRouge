import React from 'react'
import Header from './Header'
import notfound from '../assets/img/notfound.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='max-w-5xl mx-auto py-4'>
      <Header />
      <div className='bg-white max-w-xl mx-auto p-5 my-20 border border-secondary rounded-md shadow-md'>
        <h2 className='text-center font-bold text-font'>
          404 <br /> <span className='font-medium'>Page non trouvée</span>

        </h2>
        <img src={notfound} alt='notfound' className='w-1/2 mx-auto mt-5' />

        <Link to={'/'} className='block text-center mt-5 text-secondary'>
            Retourner à l'accueil
        </Link>
      </div>
      
    </div>
  )
}

export default NotFound

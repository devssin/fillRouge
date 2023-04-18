import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      {/* <header className='flex justify-between items-center px-5'>
            <h1 className='text-3xl font-bold text-font'><Link to={'/'} >GetWell</Link></h1>
            <div className="flex space-x-4 items-center">
              <Link to={'/doctor/login'}>
                <button className='px-4 py-2 bg-secondary rounded-md hover:bg-fourth hover:text-white transition duration-100'>
                  Espace Docteur
                </button>
              </Link>
              <Link to={'/patient/login'}>
                <button className='px-4 py-2 bg-secondary rounded-md hover:bg-fourth hover:text-white transition duration-100'>
                  Espace Patient
                </button>
              </Link>
             
            </div>
        </header> */}

      <nav class=''>
        <div class='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to={'/'} class=''>
            <h1 class='text-3xl font-bold text-font'>GetWell</h1>
          </Link>

          <button
            data-collapse-toggle='navbar-default'
            type='button'
            class='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none '
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span class='sr-only'>Open main menu</span>
            <svg
              class='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </button>
          <div class='hidden w-full md:block md:w-auto' id='navbar-default'>
          <div class='font-medium flex flex-col p-4 md:p-0 mt-4     md:flex-row md:space-x-8 md:mt-0 gap-2'>
              <Link to={'/doctor/login'}>
                <button class='px-4 py-2 bg-secondary rounded-md hover:bg-fourth hover:text-white transition duration-100'>
                  Espace Docteur
                </button>
              </Link>
              <Link to={'/patient/login'}>
                <button class='px-4 py-2 bg-secondary rounded-md hover:bg-fourth hover:text-white transition duration-100'>
                  Espace Patient
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header

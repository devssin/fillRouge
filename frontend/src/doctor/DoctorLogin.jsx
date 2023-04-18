import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { DoctorContext } from '../context/DoctorContext'
import { useContext } from 'react'

const DoctorLogin = () => {
  const { handleChange, handleLogin } = useContext(DoctorContext)
  return (
    <div className='max-w-5xl mx-auto py-4'>
      <Header />
      <div className='bg-white max-w-xl mx-auto p-5 my-20 border border-secondary rounded-md shadow-md'>
        <h2 className='text-center font-bold text-font'>
          Espace Docteur <br /> <span className='font-medium'>Connexion</span>
        </h2>
        <form method='post' onSubmit={handleLogin}>
          <div className='mt-6'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
              onChange={handleChange}
            />
          </div>
          <div className='mt-6'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Mot de passe
            </label>
            <input
              type='password'
              name='password'
              className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
              onChange={handleChange}
            />
          </div>
          <div className='mt-6'>
            <button
              type='submit'
              className='  py-2 px-4 shadow-sm text-sm font-medium rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              Se connecter
            </button>
          </div>
        </form>
        <div className='mt-6'>
          <p className='text-center text-sm font-semibold text-font'>
            Vous n'avez pas de compte ?{' '}
            <Link to='/doctor/register' className='text-secondary'>
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorLogin

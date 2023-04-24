import React, { useContext } from 'react'
import Header from '../components/Header'

import { cities } from 'list-of-moroccan-cities'
import data from '../specialities_list.json'

import { DoctorContext } from '../context/DoctorContext'

import { Link } from 'react-router-dom'

const DoctorRegister = () => {
  const { specialities } = data
  const { handleRegister, handleChange } = useContext(DoctorContext)

  return (
    <div className='max-w-5xl mx-auto py-4 px-5'>
      <Header />
      <div className='bg-white max-w-3xl mx-auto p-5 my-20 border border-secondary rounded-md shadow-md'>
        <h2 className='text-center font-bold text-font'>
          Espace Docteur <br /> <span className='font-medium'>Inscription</span>
        </h2>
        <p className='text-center mt-4 text-sm font-semibold px-6 text-font'>
          Pour que votre profil soit visible sur GetWell , Vous devez Créez
          votre profil GetWell , apres un membre de l’équipe GetWell vous
          contactera pour confirmer votre compte et compléter votre abonnement.
        </p>
        <form action='' method='POST' onSubmit={handleRegister}>
          <div className='grid sm:grid-cols-2 mt-6 gap-x-10'>
            <div className='col-span-1'>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium text-gray-700'
              >
                Prénom
              </label>
              <input
                type='text'
                name='firstName'
                className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='col-span-1'>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium text-gray-700'
              >
                Nom
              </label>
              <input
                type='text'
                name='lastName'
                className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                onChange={handleChange}
              />
            </div>
          </div>
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
          <div className='grid sm:grid-cols-2 mt-6 gap-x-10'>
            <div className='col-span-1'>
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
            <div className='col-span-1'>
              <label
                htmlFor='password_confirmation'
                className='block text-sm font-medium text-gray-700'
              >
                Confirmer le mot de passe
              </label>
              <input
                type='password'
                name='password_confirmation'
                className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='grid sm:grid-cols-2 mt-6 gap-x-10'>
            <div className='col-span-1'>
              <label
                htmlFor='phoneNumber'
                className='block text-sm font-medium text-gray-700'
              >
                Numero de téléphone
              </label>
              <input
                type='text'
                name='phoneNumber'
                className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                onChange={handleChange}
              />
            </div>
            <div className='col-span-1'>
              <label
                htmlFor='officePhoneNumber'
                className='block text-sm font-medium text-gray-700'
              >
                Numero de téléphone de l'office
              </label>
              <input
                type='text'
                name='officePhoneNumber'
                className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='grid sm:grid-cols-2 mt-6 gap-x-10'>
            <div className='col-span-1'>
              <label
                htmlFor='city'
                className='block text-sm font-medium text-gray-700'
              >
                Ville
              </label>
              <select
                name='city'
                onChange={handleChange}
                className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
              >
                <option value='0'>__Choisir Ville__</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-span-1'>
              <label
                htmlFor='speciality'
                className='block text-sm font-medium text-gray-700'
              >
                Specialité
              </label>
              <select
                name='speciality'
                onChange={handleChange}
                className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
              >
                <option value='0'>__Choisir Specialite__</option>
                {specialities.map((speciality) => (
                  <option key={speciality.id} value={speciality.name}>
                    {speciality.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='mt-6'>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-gray-700'
            >
              Adresse
            </label>
            <textarea
              name='officeAddress'
              onChange={handleChange}
              className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
            ></textarea>
          </div>

          <div className='mt-6'>
            <input
              type='submit'
              value='Inscrir'
              className='bg-primary text-font px-5 py-2 rounded-md  hover:bg-secondary transition duration-150'
            />
          </div>
        </form>

        <div className='mt-6'>
          <p className='text-font text-sm '>
            Vous avez déjà un compte ?
            <Link to='/doctor/login' className='text-secondary mx-2'>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorRegister

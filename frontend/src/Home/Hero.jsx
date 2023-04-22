import {useContext} from 'react'
import { cities } from 'list-of-moroccan-cities'
import specialities from '../specialities'
import { PublicContext } from '../context/PublicContext'

const Hero = () => {
  const {handleSearch, handleChange} = useContext(PublicContext)
  return (
    <div className='my-10 px-4  h-[70vh] grid place-content-center'>
      <h2 className='text-3xl text-font font-semibold'>
        Prenez rendez-vous avec des professionnels de la santé qualifiés et
        certifiés en ligne, en toute sécurité et en toute simplicité.
      </h2>
      <div className='w-full  bg-white p-5 mt-5 rounded-lg shadow-md border border-3 border-secondary'>
        <form action='' onSubmit={handleSearch}>
          <div className='grid md:grid-cols-3 gap-3'>
            <div className='col-span-1'>
              <label
                htmlFor='speciality'
                className='block text-sm font-medium text-gray-700'
              >
                Spécialité
              </label>
              <select
                id='speciality'
                name='speciality'
                onChange={handleChange}
                className='mt-1 block w-full py-2 px-3 border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
              >
                <option value="0">___Choisir une Specialite___</option>
                {specialities.map((speciality) => (
                  <option key={speciality.id} value={speciality.name}>{speciality.name}</option>
                ))}
              </select>
            </div>
            <div className='col-span-1'>
              <label
                htmlFor='City'
                className='block text-sm font-medium text-gray-700'
              >
                Ville
              </label>
              <select
                id='city'
                name='city'
                onChange={handleChange}
                className='mt-1 block w-full py-2 px-3 border border-secondary bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
              >
                <option value="0">--Choisir une ville--</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>{city.name}</option>  
                ))}
              </select>
            </div>
            <div className='col-span-1 flex items-end'>
              <button className=' bg-primary block w-full py-2 rounded-md hover:bg-secondary hover:text-white transition duration-150'> 
                Rechercher
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Hero

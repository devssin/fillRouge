import { useContext } from 'react'
import { PublicContext } from '../context/PublicContext'
import Header from '../components/Header'
import Booking from '../components/Booking'
import Avatar from '../assets/img/avatar.png'
import { Link } from 'react-router-dom'

const Doctors = () => {
  const { searchResults } = useContext(PublicContext)
  console.log(searchResults)
  return (
    <div className='max-w-5xl mx-auto py-4'>
      <Header />

      <div className='mt-20 px-5'>
        <h2 className='text-center text-2xl font-bold text-font'>
          {searchResults.length > 0
            ? `Résultats de la recherche:`
            : 'Aucun médecin trouvé'}
        </h2>

        {searchResults.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
            {searchResults.map((doctor) => (
              <div
                key={doctor.id}
                className='bg-white p-5 rounded-md shadow-md'
              >
                <div className="flex justify-between items-center ">
                <div className='flex space-x-2 items-center'>
                  <img src={doctor.image ? doctor.image : Avatar} alt='' className='w-12 h-12 rounded-full' />
                  <div>
                    <h3 className=' font-bold text-font'>
                      {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className='text-sm text-gray-500'>{doctor.speciality}</p>

                  </div>

                </div>
                <Link to={`/doctor/${doctor.id}`} className='bg-secondary hover:bg-fourth px-2 py-1 text-sm rounded transistion duration-150'> 
                  Profile
                </Link>
                </div>

                <div className="mt-5">
                    <Booking doctor_id={doctor.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors

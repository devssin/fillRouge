import { useContext } from 'react'
import { PublicContext } from '../context/PublicContext'
import Header from '../components/Header'
import Booking from '../components/Booking'

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
                {doctor.firstName} {doctor.lastName}

                <div className="">
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

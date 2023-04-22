import React, { useContext, useEffect } from 'react'
import avatar from '../assets/img/avatar.png'
import { Link } from 'react-router-dom'
import { PublicContext } from '../context/PublicContext'

const Doctors = () => {
  const { latestDoctors, getLatestDoctors, latestDoctorsLoaded } =
    useContext(PublicContext)

  useEffect(() => {
    getLatestDoctors()
  }, [])

  console.log(latestDoctors)

  return (
    <div className='px-4 mt-10'>
      <h2 className='text-center font-bold text-font text-2xl uppercase'>
        les médecins les plus récents
      </h2>
      {latestDoctorsLoaded ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {latestDoctors.map((doctor) => (
            <div
              className='flex flex-col items-center justify-center hover:bg-white hover:rounded-md hover:shadow-md transistion duration-150 p-4'
              key={doctor.id}
            >
              <img
                src={doctor.profilePicture ? doctor.profilePicture : avatar}
                alt='doctor'
                className='w-20 h-20 rounded-full'
              />

              <div className='mt-2'>
                <h3 className='text-center font-bold text-font'>
                  Dr. {doctor.firstName} {doctor.lastName}
                </h3>
                <p className='text-center text-gray-500 mt-2'>
                  {doctor.speciality} à <br /> {doctor.city}
                </p>
              </div>
              <Link
                to='/doctor/1'
                className='bg-secondary text-white px-4 py-2 rounded-md mt-4 hover:bg-fourth transition duration-150'
              >
                Voir le profil
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Doctors loading</p>
      )}
    </div>
  )
}

export default Doctors

import React, { useEffect, useContext } from 'react'
import SideBar from './SideBar'
import { useParams } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { cities } from 'list-of-moroccan-cities'
import data from '../specialities_list.json'
const DoctorProfile = () => {
  const {specialities} = data
  const {
    checkIfDoctorIsLoggedIn,
    getDoctor,
    doctor,
    handleChange,
    doctorLoaded,
  } = useContext(DoctorContext)

  const { doctor_id } = useParams()
  console.log(doctor_id)



  useEffect(() => {
    checkIfDoctorIsLoggedIn(doctor_id)
    getDoctor(doctor_id)
  }, [])

  return (
    <>
      <SideBar />
      <div className='p-4 sm:ml-64'>
        <h1 className='text-2xl font-bold text-font '> My Profile</h1>
        <div className='bg-white max-w-3xl mx-auto p-5 my-20 border border-secondary rounded-md shadow-md'>
          <h2 className='text-center font-bold text-font'>
            Espace Docteur <br />
            <span className='font-medium'>Modifier les informations</span>
          </h2>
          {doctorLoaded ? (
            <form
              action=''
              method='POST'
              //  onSubmit={handleRegister}
            >
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
                    value={doctor.firstName}
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
                    value={doctor.lastName}
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
                  value={doctor.email}
                  onChange={handleChange}
                />
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
                    value={doctor.phoneNumber}
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
                    value={doctor.officePhoneNumber}
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
                      <option
                        key={city.id}
                        value={city.name}
                        selected={city.name === doctor.city}
                      >
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
                      <option
                        key={speciality.id}
                        value={speciality.name}
                        selected={
                          speciality.name === doctor.speciality
                        }
                      >
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
                  value={doctor.officeAddress}
                ></textarea>
              </div>

              <div className='mt-6'>
                <input
                  type='submit'
                  value='Enregistrer'
                  className='bg-primary text-font px-5 py-2 rounded-md  hover:bg-secondary transition duration-150'
                />
              </div>
            </form>
          ) : (
            <div className='text-center'>Loading...</div>
          )}
        </div>
      </div>
    </>
  )
}

export default DoctorProfile

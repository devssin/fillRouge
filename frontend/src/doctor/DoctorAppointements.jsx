import React from 'react'
import SideBar from './SideBar'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import {
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { Spinner } from 'flowbite-react'

const DoctorAppointements = () => {
  const navigate = useNavigate()
  const { doctor_id } = useParams()
  const checkIfLoggedIn = () => {
    const doctorToken = localStorage.getItem('doctor-token')
    const doctor = JSON.parse(localStorage.getItem('doctor')).id
    console.log(doctorToken, doctor)
    if (!doctorToken ) {
      navigate('/doctor/login')
      return
    }
    if (doctor_id != doctor) {
        navigate('/doctor/login')
        return
    }

  }

  const [appointements, setAppointements] = useState([])
  const [appointementsLoaded, setAppointementsLoaded] = useState(false)
  const getAppointements = async () => {
    setAppointementsLoaded(false)
    try {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:8000/api/doctors/${doctor_id}/appointements`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('doctor-token')}`,
        },
      })
      setAppointements(response.data.appointements)
      setAppointementsLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfLoggedIn()
    getAppointements()
  }, [])


  return (
    <>
      <SideBar />
      <div className='p-4 sm:ml-64'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-gray-900'>
                Appoinetems
              </h1>
            </div>
          </div>
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                  {appointementsLoaded ? (
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                          >
                            Patient
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Patient Phone
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Date & Time
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Status
                          </th>
                          <th
                            scope='col'
                            className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white'>
                        {appointements.map((appointement) => (
                          <tr key={appointement.id}>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='flex items-center'>
                                <div className='ml-4'>
                                  <div className='font-medium text-gray-900'>
                                    {appointement.patientLastName.toUpperCase()}{' '}
                                    <span className='capitalize'>
                                      {appointement.patientFirstName}
                                    </span>
                                  </div>
                                  <div className='text-gray-500'>
                                    {appointement.patientEmail}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              <div className='text-gray-900 flex items-center'>
                                <PhoneIcon className='h-5 w-5 text-gray-400 mr-2' />
                                {appointement.patientPhoneNumber}
                              </div>
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {appointement.date} {appointement.hour}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              <span
                                className={`${
                                  appointement.status === 'accepted'
                                    ? 'bg-green-100 text-green-800'
                                    : appointement.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                                } inline-flex rounded-full  px-2 text-xs font-semibold leading-5`}
                              >
                                {appointement.status}
                              </span>
                            </td>
                            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 '>
                              <div className='flex space-x-2 items-center'>
                                {appointement.status !== 'accepted' && (
                                  <button
                                    className='bg-secondary px-3 py-1 text-xs rounded-md flex items-center text-white hover:bg-fourth transition duration-150'
                                    onClick={() => {
                                      //   activateAccount(appointements.id)
                                    }}
                                  >
                                    <CheckCircleIcon className='h-5 w-5 mr-1' />
                                    Activer
                                  </button>
                                )}
                                <button
                                  className='bg-red-600 px-3 py-1 text-xs rounded-md flex items-center text-white hover:bg-red-800 transition duration-150'
                                  //   onClick={() => desactivateAccount(doctor.id)}
                                >
                                  <XCircleIcon className='h-5 w-5 mr-1' />
                                  Desactiver
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className='w-full h-[50vh] grid place-content-center'>
                      <Spinner />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorAppointements

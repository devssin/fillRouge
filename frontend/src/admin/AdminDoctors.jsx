import React, { useEffect } from 'react'
import SideBar from './SideBar'
import { AdminContext } from '../context/AdminContext'
import { useContext } from 'react'
import Avatar from '../assets/img/avatar.png'

import {
  PhoneIcon,
  OfficeBuildingIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline'

const AdminDoctors = () => {
  const {
    doctors,
    activateAccount,
    checkIfAdminIsLoggedIn,
    getDoctors,
    desactivateAccount,
  } = useContext(AdminContext)
  useEffect(() => {
    checkIfAdminIsLoggedIn()
    getDoctors()
  }, [])

  return (
    <>
      <SideBar />
      <div className='p-4 sm:ml-64'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-gray-900'>Doctors</h1>
            </div>
          </div>
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                        >
                          Name
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Phone Numbers
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Status
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Address
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
                      {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
                            <div className='flex items-center'>
                              <div className='h-10 w-10 flex-shrink-0'>
                                <img
                                  className='h-10 w-10 rounded-full'
                                  src={
                                    doctor.profilePicture
                                      ? doctor.profilePicture
                                      : Avatar
                                  }
                                  alt=''
                                />
                              </div>
                              <div className='ml-4'>
                                <div className='font-medium text-gray-900'>
                                  {doctor.lastName.toUpperCase()}{' '}
                                  <span className='capitalize'>
                                    {doctor.firstName}
                                  </span>
                                </div>
                                <div className='text-gray-500'>
                                  {doctor.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <div className='text-gray-900 flex items-center'>
                              <PhoneIcon className='h-5 w-5 text-gray-400 mr-2' />
                              {doctor.phoneNumber}
                            </div>
                            <div className='text-gray-500 flex items-center'>
                              <OfficeBuildingIcon className='h-5 w-5 text-gray-400 mr-2' />
                              {doctor.officePhoneNumber}
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <span
                              className={`${
                                doctor.status === 'accepted'
                                  ? 'bg-green-100 text-green-800'
                                  : doctor.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              } inline-flex rounded-full  px-2 text-xs font-semibold leading-5`}
                            >
                              {doctor.status}
                            </span>
                          </td>
                          <td
                            className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                            title={doctor.officeAddress}
                          >
                            {doctor.officeAddress.slice(0, 20)} ...
                          </td>
                          <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 '>
                            <div className='flex space-x-2 items-center'>
                              {doctor.status !== 'accepted' && (
                                <button
                                  className='bg-secondary px-3 py-1 text-xs rounded-md flex items-center text-white hover:bg-fourth transition duration-150'
                                  onClick={() => {
                                    activateAccount(doctor.id)
                                  }}
                                >
                                  <CheckCircleIcon className='h-5 w-5 mr-1' />
                                  Activer
                                </button>
                              )}
                              <button
                                className='bg-red-600 px-3 py-1 text-xs rounded-md flex items-center text-white hover:bg-red-800 transition duration-150'
                                onClick={() => desactivateAccount(doctor.id)}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDoctors

import React, { useEffect, useContext } from 'react'
import SideBar from './SideBar'
import { AdminContext } from '../context/AdminContext'

import {
    PhoneIcon,
    OfficeBuildingIcon,
    CheckCircleIcon,
    XCircleIcon,
  } from '@heroicons/react/outline'

const AdminAppoinetements = () => {
  const { getAppointements, appointments } = useContext(AdminContext)
    useContext(AdminContext)
  useEffect(() => {
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
                Appointements
              </h1>
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
                          Patient
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Doctor
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
                          Date Time
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {appointments.map((appointement) => (
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
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='font-medium text-gray-900'>
                                  {appointement.doctorFirstName.toUpperCase()}{' '}
                                  <span className='capitalize'>
                                    {appointement.doctorLastName}
                                  </span>
                                </div>
                              </div>
                            </div>
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
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {appointement.date} {appointement.time}
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

export default AdminAppoinetements

import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import avatar from '../assets/img/avatar.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const [doctorLoggedIn, setDoctorLoggedIn] = useState(false)
  const [patientLoggedIn, setPatientLoggedIn] = useState(false)
  const [doctor, setDoctor] = useState({})
  const [patient, setPatient] = useState({})

  const checkIfDoctorIsLoggedIn = () => {
    if (localStorage.getItem('doctor-token')) {
      setDoctorLoggedIn(true)
      setDoctor(JSON.parse(localStorage.getItem('doctor')))
    } else {
      setDoctorLoggedIn(false)
    }
  }

  const checkIfPatientIsLoggedIn = () => {
    if (localStorage.getItem('patient-token')) {
      setPatientLoggedIn(true)
      setPatient(JSON.parse(localStorage.getItem('patient')))
    } else {
      setPatientLoggedIn(false)
    }
  }

  useEffect(() => {
    checkIfDoctorIsLoggedIn()
    checkIfPatientIsLoggedIn()
  }, [])

  return (
    <>
      <header className='flex justify-between items-center px-5'>
        <h1 className='text-3xl font-bold text-font'>
          <Link to={'/'}>GetWell</Link>
        </h1>
        <div className='flex space-x-4 items-center'>
          {doctorLoggedIn ? (
            <>
              <Menu as='div' className='ml-3 relative'>
                <div>
                  <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-2 py-1'>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src={
                        doctor.profilePicture ? doctor.profilePicture : avatar
                      }
                      alt=''
                    />
                    <p className='pl-2'>
                      {doctor.firstName} {doctor.lastName}
                    </p>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={'/doctor/profile'}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`/doctor/${doctor.id}/appointments`}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block w-full px-4 py-2 text-left text-sm text-gray-700'
                          )}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          ) : patientLoggedIn ? (
            <>
              <Menu as='div' className='ml-3 relative'>
                <div>
                  <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-2 py-1'>
                    <span className='sr-only'>Open user menu</span>
                    
                    <p className='pl-2'>
                      {patient.firstName} {patient.lastName}
                    </p>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={'/patient/reservations'}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Mes rendez-vous
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block w-full px-4 py-2 text-left text-sm text-gray-700'
                          )}
                        >
                          Deconxtion
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          ) : (
            <>
              <Link to={'/doctor/login'}>
                <button class='px-4 py-2 bg-secondary rounded-md hover:bg-fourth hover:text-white transition duration-100'>
                  Espace Docteur
                </button>
              </Link>
              <Link to={'/patient/login'}>
                <button class='px-4 py-2 bg-secondary rounded-md hover:bg-fourth hover:text-white transition duration-100'>
                  Espace Patient
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  )
}

export default Header

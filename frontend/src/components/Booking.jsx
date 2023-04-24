import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/outline'
import Swal from 'sweetalert2'
import Spinner from './Spinner'

const Booking = ({ doctor_id }) => {
  const navigate = useNavigate()
  const [currentDay, setCurrentDay] = useState(0)
  const [hours, setHours] = useState([])
  const [days, setDays] = useState([])
  const [daysLoaded, setDaysLoaded] = useState(false)
  const [hoursLoaded, setHoursLoaded] = useState(false)

  useEffect(() => {
    // annonyme function that invokes the async function
    (async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/days`)
        setDays(response.data.days)
        setDaysLoaded(true)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleNext = () => {
    setCurrentDay(currentDay + 1)
  }
  const handlePrevious = () => {
    setCurrentDay(currentDay - 1)
  }

  const getHours = async () => {
    setHoursLoaded(false)
    try {
      const response = await axios.get(
        `http://localhost:8000/api/doctors/${doctor_id}/hours/${currentDay + 1}`
      )
      setHours(response.data.hours)
      setHoursLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getHours()
  }, [currentDay])

  const handleBooking = async (hour_id) => {
    const patientToken = localStorage.getItem('patient-token')

    if (!patientToken) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login first!',
      }).then(() => {
        navigate('/patient/login')
      })

      return
    }

    const patient = JSON.parse(localStorage.getItem('patient'))
    const patient_id = patient.id
    const booking = {
      patient_id,
      hour_id,
      doctor_id,
      date: days[currentDay].date,
    }
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8000/api/appointements/create',
        data: booking,
        headers: {
          Authorization: `Bearer ${patientToken}`,
        },
      })

      if (response.data.status === 200) {
        Swal.fire(response.data.message, '', 'success').then(() => {
          getHours()
        })
      }
    } catch (error) {
      Swal.fire(error.response.data.message, '', 'error')
    }
  }

  return (
    <div>
      <div className=''>
        {daysLoaded ? (
          <>
            <div className='flex justify-between items-center'>
              <button disabled={currentDay === 0} onClick={handlePrevious}>
                <ChevronDoubleLeftIcon
                  className={`h-5 w-5 ${
                    currentDay == 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-secondary'
                  }`}
                />
              </button>

              <h2 className='text-center'>
                Booking for <br />
                <span className='text-font font-bold'>
                  {days[currentDay].name} {days[currentDay].date}
                </span>
              </h2>

              <button className='' onClick={handleNext}>
                <ChevronDoubleRightIcon className='h-6 w-6 text-secondary' />
              </button>
            </div>
            {hoursLoaded ? (
              <div className='grid grid-cols-4 gap-3 mt-6'>
                {hours.map((hour) => (
                  <button
                    className={` px-2 py-1 rounded-md ${
                      hour.is_available != 0
                        ? 'bg-primary hover:bg-secondary '
                        : 'bg-red-400 hover:bg-red-700 cursor-not-allowed'
                    }`}
                    onClick={() => handleBooking(hour.id)}
                  >
                    {hour.name}
                  </button>
                ))}
              </div>
            ) : (
              <div className='grid place-content-center mt-10'>
                <Spinner />
              </div>
            )}
          </>
        ) : (
            <div className='grid place-content-center mt-10'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  )
}

export default Booking

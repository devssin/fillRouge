import axios from 'axios'
import React, { createContext, useState } from 'react'
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'

export const DoctorContext = createContext()
export const DoctorProvider = ({ children }) => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: '',
    phoneNumber: '',
    officePhoneNumber: '',
    officeAddress: '',
    city: '',
    speciality: '',
  })

  const [doctor, setDoctor] = useState({})
  const [doctorLoaded, setDoctorLoaded] = useState(false)

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    console.log(data)
    if (
      data.firstName === '' ||
      data.lastName === '' ||
      data.email === '' ||
      data.password === '' ||
      data.password_confirmation === '' ||
      data.phoneNumber === '' ||
      data.officePhoneNumber === '' ||
      data.officeAddress === '' ||
      data.city === '0' ||
      data.speciality === '0'
    ) {
      Swal.fire('Veuillez remplir tous les champs', '', 'error')
      return
    }
    if (data.password !== data.password_confirmation) {
      Swal.fire('Les mots de passe ne sont pas identiques', '', 'error')
      return
    }

    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8000/api/doctors/register',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
          phoneNumber: data.phoneNumber,
          officePhoneNumber: data.officePhoneNumber,
          officeAddress: data.officeAddress,
          city: data.city,
          speciality: data.speciality,
        },
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      console.log(response.data)
      Swal.fire(
        'Votre compte a été crée avec succès. Veuilez attendre que notre equipe de support vous contactera pour activer votre compte ',
        '',
        'success'
      ).then(() => {
        navigate('/')
      })
    } catch (error) {
      Swal.fire('Une erreur est survenue', '', 'error')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (data.email === '') {
      Swal.fire('Veuillez remplir le champ email', '', 'error')
      return
    }
    if (data.password === '') {
      Swal.fire('Veuillez remplir le champ mot de passe', '', 'error')
      return
    }
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8000/api/doctors/login',
        data: {
          email: data.email,
          password: data.password,
        },
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      const doctor = response.data.doctor
      if (doctor.status === 'pending') {
        Swal.fire(
          'Votre compte est en attente de validation par notre equipe de support',
          '',
          'warning'
        ).then(() => {
          navigate('/')
        })
        return
      }
      if (doctor.status === 'rejected') {
        Swal.fire(
          'Votre compte a été rejeté par notre equipe de support',
          '',
          'error'
        ).then(() => {
          navigate('/')
        })
        return
      }
      localStorage.setItem('doctor', JSON.stringify(doctor))
      const token = response.data.token
      localStorage.setItem('doctor-token', token)
      Swal.fire('Vous êtes connecté', '', 'success').then(() => {
        navigate('/')
      })
    } catch (error) {
      Swal.fire('Incorrect email ou mot de passe', '', 'error')
      console.error(error.message)
    }
  }

  const getDoctor = async  (id) => {
    setDoctorLoaded(false)
    console.log(`http://localhost:8000/api/doctors/${id}`)
    try {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:8000/api/doctors/${id}`,
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      setDoctor(response.data.doctor)
      setDoctorLoaded(true)
    } catch (error) {
      console.log(error.message)
    }
  }

  const checkIfDoctorIsLoggedIn = (id) => {
    console.log(id)

    const doctorToken = localStorage.getItem('doctor-token')
    const doctor_id = JSON.parse(localStorage.getItem('doctor'))?.id
    console.log(doctorToken, doctor_id)

    if (!doctorToken) {
      navigate('/doctor/login')
      return
    }
    if (id != doctor_id) {
      navigate('/doctor/login')
      return
    }
  }
  return (
    <DoctorContext.Provider
      value={{
        handleRegister,
        handleChange,
        handleLogin,
        checkIfDoctorIsLoggedIn, 
        getDoctor, 
        doctor,
        doctorLoaded
      }}
    >
      {children}
    </DoctorContext.Provider>
  )
}

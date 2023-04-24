import { useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const PatientContext = createContext()

export const PatientProvider = ({ children }) => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: '',
    phoneNumber: '',
  })

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
      data.phoneNumber === ''
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
        url: 'http://localhost:8000/api/patients/register',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
          phoneNumber: data.phoneNumber,
        },
      })
      console.log(response)
      Swal.fire('Inscription réussie', '', 'success').then(() => {
        localStorage.setItem('patient', JSON.stringify(response.data.patient))
        localStorage.setItem('patient-token', response.data.token)
        navigate(-2)
      })
    } catch (error) {
      console.log(error)
      Swal.fire('Erreur', '', 'error')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (data.email === '' || data.password === '') {
      Swal.fire('Veuillez remplir tous les champs', '', 'error')
      return
    }
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:8000/api/patients/login',
        data: {
          email: data.email,
          password: data.password,
        },
      })
      console.log(response)
      Swal.fire('Connexion réussie', '', 'success').then(() => {
        localStorage.setItem('patient', JSON.stringify(response.data.patient))
        localStorage.setItem('patient-token', response.data.token)
        navigate(-2)
      })
    } catch (error) {
      console.log(error)
      Swal.fire('Erreur', '', 'error')
    }
  }
          



  const handleLogout = () => {
    localStorage.removeItem('patient')
    localStorage.removeItem('patient-token')
    navigate('/')
  }
  return (
    <PatientContext.Provider
      value={{
        handleChange,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}

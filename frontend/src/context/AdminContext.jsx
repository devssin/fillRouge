import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { createContext } from 'react'

export const AdminContext = createContext()
export const AdminProvider = ({ children }) => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [doctors, setDoctors] = useState([])
  const getDoctors = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/doctors',
      })
      console.log(response.data.doctors)
      setDoctors(response.data.doctors)
    } catch (error) {
      console.log(error)
    }
    console.log(doctors)
  }

  const activateAccount = async (id) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: `http://localhost:8000/api/doctors/${id}/activate`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin-token')}`,
        },
      })
      if (response.data.status === 200) {
        Swal.fire(response.data.message, '', 'success').then(() => getDoctors())
      } else {
        Swal.fire(response.data.message, '', 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const desactivateAccount = async (id) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: `http://localhost:8000/api/doctors/${id}/desactivate`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin-token')}`,
        },
      })
      if (response.data.status === 200) {
        Swal.fire(response.data.message, '', 'success').then(() => getDoctors())
      } else {
        Swal.fire(response.data.message, '', 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfAdminIsLoggedIn = () => {
    if (localStorage.getItem('admin-token') === null) {
      navigate('/admin/login')
    }
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
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
        url: 'http://localhost:8000/api/admin/login',
        data: {
          email: data.email,
          password: data.password,
        },
      })
      localStorage.setItem('admin-token', response.data.token)
      localStorage.setItem('admin', JSON.stringify(response.data.admin))
      navigate('/admin/dashboard')
    } catch (error) {
      Swal.fire('Email ou mot de passe incorrect', '', 'error')
    }
  }

  return (
    <AdminContext.Provider
      value={{
        handleChange,
        handleLogin,
        doctors,
        activateAccount,
        checkIfAdminIsLoggedIn,
        getDoctors,
        desactivateAccount,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

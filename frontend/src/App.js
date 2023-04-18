import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from './Home/Home'
import DoctorLogin from './doctor/DoctorLogin'
import PatientLogin from './patient/PatientLogin'
import DoctorRegister from './doctor/DoctorRegister'
import { DoctorProvider } from './context/DoctorContext'
import NotFound from './components/NotFound'
import AdminLogin from './admin/AdminLogin'
import { AdminProvider } from './context/AdminContext'
import AdminDashboard from './admin/AdminDashboard'
import AdminDoctors from './admin/AdminDoctors'

function App() {
  

  return (
    <div className='min-h-screen bg-gradient-to-b from-primary to-third '>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/doctor/login'
            element={
              <DoctorProvider>
                {' '}
                <DoctorLogin />{' '}
              </DoctorProvider>
            }
          />
          <Route
            path='/doctor/register'
            element={
              <DoctorProvider>
                {' '}
                <DoctorRegister />{' '}
              </DoctorProvider>
            }
          />
          <Route path='/patient/login' element={<PatientLogin />} />
          <Route
            path='/admin/login'
            element={
              <AdminProvider>
                {' '}
                <AdminLogin />{' '}
              </AdminProvider>
            }
          />
          <Route
            path='/admin/dashboard'
            element={
              <AdminProvider>
                {' '}
                <AdminDashboard />{' '}
              </AdminProvider>
            }
          />
          <Route
            path='/admin/doctors'
            element={
              <AdminProvider>
                {' '}
                <AdminDoctors />{' '}
              </AdminProvider>
            }
          />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

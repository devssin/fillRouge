import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { PatientProvider } from './context/PatientContext'
import PatientRegister from './patient/PatientRegister'
import { PublicProvider } from './context/PublicContext'
import Doctors from './doctor/Doctors'
import DoctorAppointements from './doctor/DoctorAppointements'
import AdminAppoinetements from './admin/AdminAppoinetements'
import AdminPatients from './admin/AdminPatients'
import DoctorProfile from './doctor/DoctorProfile'

function App() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-primary to-third '>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PublicProvider>
                <Home />
              </PublicProvider>
            }
          />
          <Route
            path='/doctor/login'
            element={
              <DoctorProvider>
                <DoctorLogin />
              </DoctorProvider>
            }
          />
          <Route
            path='/doctor/register'
            element={
              <DoctorProvider>
                <DoctorRegister />
              </DoctorProvider>
            }
          />
          <Route path='/doctors' element={
            <PublicProvider>
              <Doctors />
            </PublicProvider>
          } />

          <Route path='/doctor/:doctor_id/appointments' element={ <DoctorAppointements />} />
          <Route
            path='/patient/login'
            element={
              <PatientProvider>
                <PatientLogin />
              </PatientProvider>
            }
          />

          <Route path='/doctor/:doctor_id/profile' element={<DoctorProvider><DoctorProfile /></DoctorProvider>} />
          <Route
            path='/patient/register'
            element={
              <PatientProvider>
                <PatientRegister />
              </PatientProvider>
            }
          />
          <Route
            path='/admin/login'
            element={
              <AdminProvider>
                <AdminLogin />
              </AdminProvider>
            }
          />
          <Route
            path='/admin/dashboard'
            element={
              <AdminProvider>
                <AdminDashboard />
              </AdminProvider>
            }
          />
          <Route
            path='/admin/doctors'
            element={
              <AdminProvider>
                <AdminDoctors />
              </AdminProvider>
            }
          />
          <Route path="/admin/patients" element={<AdminProvider ><AdminPatients /></AdminProvider>} />
          <Route path="/admin/appointements" element={<AdminProvider><AdminAppoinetements /></AdminProvider>} />

          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

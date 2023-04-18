import SideBar from './SideBar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'

const AdminDashboard = () => {
    const {checkIfAdminIsLoggedIn} = useContext(AdminContext)
    const navigate = useNavigate()

    useEffect(() => {
        checkIfAdminIsLoggedIn()
    }, [])
  return (
    <>
      <SideBar />
      <div className='p-4 sm:ml-64'>
        Admin Dashboard
      </div>
    </>
  )
}

export default AdminDashboard

import SideBar from './SideBar'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'

const AdminDashboard = () => {
    const {checkIfAdminIsLoggedIn} = useContext(AdminContext)

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

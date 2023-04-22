import {useState, createContext} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const PublicContext = createContext()

export const PublicProvider = ({children}) => {
    const navigate = useNavigate()
    const [doctors , setDoctors] = useState([])
    const [doctor, setDoctor] = useState({})
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [latestDoctors, setLatestDoctors] = useState([]);
    const [latestDoctorsLoaded, setLatestDoctorsLoaded] = useState(false);

    const [searchData, setSearchData] = useState({
        speciality : 0,
        city : 0,
    })
    const [searchResults, setSearchResults] = useState([])

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name] : e.target.value
        })
    }

    const handleSearch = async (e) => {
        
        e.preventDefault()
        console.log(searchData)
        try {
            console.log(`http://localhost:8000/api/doctors/${searchData.speciality}/${searchData.city}`)
            const response = await axios({
                method : 'GET',
                url : `http://localhost:8000/api/doctors/${searchData.speciality}/${searchData.city}`,
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            setSearchResults(response.data.doctors)
            navigate('/doctors')

        } catch (error) {
            console.log(error)
        }

    }

    const getDoctors = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:8000/api/doctors',
            })
            setDoctors(response.data.doctors)

        } catch (error) {
            console.log(error)
        }
    }

    const getDoctor = async (id) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `http://localhost:8000/api/doctors/${id}`,
            })
            setDoctor(response.data.doctor)
        } catch (error) {
            console.log(error)
        }
    }

    const getDays = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:8000/api/days',
            })
            setDays(response.data.days)
        } catch (error) {
            console.log(error)
        }
    }

    const getHours = async (doctor_id, day_id) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `http://localhost:8000/api/doctors/${doctor_id}/hours/${day_id}`,
            })
            setHours(response.data.hours)
        } catch (error) {
            console.log(error)
        }
    }


    const getLatestDoctors = async () => {
        setLatestDoctorsLoaded(false)

        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:8000/api/doctors/latest',
            })
            setLatestDoctors(response.data.doctors)
            setLatestDoctorsLoaded(true)
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <PublicContext.Provider

            value={{
                doctors,
                getDoctors,
                doctor,
                getDoctor,
                days,
                getDays,
                hours,
                getHours,
                latestDoctors,
                getLatestDoctors,
                handleChange,
                handleSearch,
                searchResults,
                latestDoctorsLoaded
                
            }}
        >
            {children}
        </PublicContext.Provider>
    )
}
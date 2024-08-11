import React,{ useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'



function useGetAllusers() {

    const [allUser, setAllUser] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getusers = async( ) => {
            setLoading(true)
            try {
                const token = Cookies.get('jwt') 
                console.log(token);
                
                const response = await axios.get('/api/user/allUsers', {
                    withCredentials: true, 
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAllUser(response.data)
                setLoading(false)

            } catch (error) {
                console.log(error)
            }

        }
        getusers()
    }, [])


    return [allUser, loading]

}


export default useGetAllusers
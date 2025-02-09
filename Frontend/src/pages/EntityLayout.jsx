import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addAccessToken, addUser } from '../store/userSlice'

const EntityLayout = ({children, title}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("accessToken");
        const user = localStorage.getItem("user");
        if (token) {
            // dispatch(addUser(user))
            if(user){
                console.log("The user is present",JSON.parse(user));
            }
            dispatch(addUser(JSON.parse(user)))
            dispatch(addAccessToken(token));
            navigate("/dashboard");
        }
        else{
            navigate("/");
        }
    },[navigate])

    
  return (
    <div className='w-full h-screen'>
        {
            title !== "Login" && 
        <NavBar title={title}/>
        }
      {children}
    </div>
  )
}

export default EntityLayout

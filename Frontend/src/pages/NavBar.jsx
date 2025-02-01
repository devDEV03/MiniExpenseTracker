import React, { useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { removeAcessToken, removeUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const NavBar = ({title}) => {

    const [theme,setTheme] = useState("light");
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.user);
    const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const logout = () => {
    dispatch(removeUser());
    dispatch(removeAcessToken());
    navigate("/");
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("light"); // default theme
    }
  }, []);

//   useEffect(() => {
//     if (theme === "dark") {
//       document.body.classList.add("dark");
//       localStorage.setItem("theme", "dark"); // Save theme to localStorage
//     } else {
//       document.body.classList.remove("dark");
//       localStorage.setItem("theme", "light"); // Save theme to localStorage
//     }
//   }, [theme]);


  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
    
  }
  return (
    <div className='w-full sticky bg-gray-100 p-6 top-0 z-10 shadow-xl flex justify-between'>
      <p className='font-semibold text-xl'>{title}</p>
      <div className='flex gap-4 relative'>
        <p className='rounded-full p-2 bg-gray-200 w-[40px] h-[40px] text-center my-auto '
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >{user?.firstName[0].toUpperCase()}</p>
      <LogoutIcon className='hover:text-red-500 cursor-pointer my-auto'onClick={logout}/>
      {isHovered && (
        <div className="absolute top-full right-10 mt-2 w-56 bg-white text-gray-700 text-sm p-3 rounded-lg shadow-lg border border-gray-300 transition-opacity duration-300">
          <p>{user?.firstName + " " + user?.lastName}</p>
          <p>{user?.email}</p>
        </div>
      )}

      {/* <button className='bg-green-100 dark:bg-yellow-200' onClick={handleThemeSwitch}>Dark Mode</button>
       */}
       {/* <ToggleButtonGroup
       color="primary"
       value={theme}
       exclusive
       onChange={handleThemeSwitch}
       aria-label="Platform"
       className='shadow-xl border border-white dark:bg-white dark:text-white'
       >
            <ToggleButton   className='bg-black text-white dark:bg-black dark:text-white w-full h-full' value={"dark"}>
                <BedtimeIcon />
            </ToggleButton>
            
            <ToggleButton className='bg-white text-white dark:bg-white dark:text-white w-full h-full' value={"light"}>
            <WbSunnyIcon />
            </ToggleButton>
       </ToggleButtonGroup> */}
      </div>
    </div>
  )
}

export default NavBar

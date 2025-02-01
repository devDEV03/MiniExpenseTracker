import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { TextField, IconButton, InputAdornment, Button, FormControlLabel, Checkbox } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAccessToken, addUser } from '../store/userSlice';
import axiosInstance from '../tokenManagement/axiosInstance';

const LoginPage = () => {


    const { control, watch, register, setValue, handleSubmit, reset,
        formState: { errors }, clearErrors } = useForm()
    const [loginForm, setLoginForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const token = useSelector((store) => store.user.accessToken);
    const user = useSelector((store) => store.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async () => {
        let payload;

        if (loginForm) {
            payload = {
                "email": watch("email"),
                "password": watch("password")
            }
        }
        else {
            payload = {
                "firstName": watch("firstName"),
                "lastName": watch("lastName"),
                "email": watch("email"),
                "password": watch("password"),
            }
        }

        try {
            console.log(payload);

            const response = await axiosInstance.post(`/user/${loginForm ? "login" : "register"}`, payload);
            const data = await response.data;
            console.log(data);

            const { accesstoken, message, user } = data;

            if (accesstoken) {
                dispatch(addAccessToken(accesstoken));
                dispatch(addUser(user));
                navigate("/dashboard");
            }
            console.log(accessToken);
            setMessage(message);
            console.log(message);

        } catch (error) {
            console.log(error);
            setMessage(error.message);
        }

    }

    useEffect(() => {
        console.log("Access Token", token);
        console.log("The user", user);

        if (token) {
            navigate("/dashboard");
        }
    }, [])

    return (
        <div className='h-screen p-20 bg-gradient-to-r from-blue-500 to-green-500 '>
            <div className='shadow-2xl md:w-3/10 sm:w-9/10  bg-white text-black rounded-4xl p-8 mx-auto'>
                <div className='text-center w-full p-1'>
                    <h1 className='text-3xl font-bold'>{loginForm ? "Login" : "Register"}</h1>
                </div>

                {
                    !loginForm &&

                    <div>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" {...register("firstName", {
                            required: "First Name is required"
                        })}
                            fullWidth
                            margin="normal"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />

                        <TextField id="outlined-basic" label="Last Name" variant="outlined" {...register("lastName", {
                            required: "Last Name is required"
                        })}
                            fullWidth
                            margin="normal"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />

                    </div>

                }


                <TextField id="outlined-basic" label="Email" variant="outlined" {...register("email", {
                    required: "Email is required"

                })}
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                <TextField id="outlined-basic" label="Password" variant="outlined"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                        required: "Password is required"
                    })}
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}

                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showPassword}
                            onChange={() => setShowPassword((prev) => !prev)}
                        />
                    }
                    label="Show Password"
                />

                {
                    message && <p className={message.startsWith("User") ? "text-green-500" : "text-red-500"}>{message.startsWith("User") ? "User Logged In" : "Incorrect Email or Password"}</p>

                }

                <div className='text-start w-full flex gap-1 my-2'>
                    {loginForm ? "If not registered?" : "Already Registered?"}<p className="text-blue-500 cursor-pointer underline" onClick={() => {
                        setLoginForm((prev) => !prev);
                        reset();
                        setMessage(null);
                        console.log("Reset");
                    }}>{loginForm ? "Register here" : "Login"}</p>
                </div>

                <div className='text-center my-4'>
                    {/* <button className='bg-red-400 text-white py-2 px-6 rounded-lg'>{loginForm ? "Login" : "Register"}</button> */}
                    <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default LoginPage

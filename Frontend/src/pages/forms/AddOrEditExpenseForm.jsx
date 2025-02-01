import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../tokenManagement/axiosInstance';

const AddOrEditExpenseForm = ({ user, onClose, accessToken }) => {
    const { control, watch, register, setValue, handleSubmit, reset,
        formState: { errors }, clearErrors } = useForm({
            defaultValues: {
                amount: user?.amount,
                category: user?.category,
                date: user?.date.split("T")[0],
                description: user?.description
            }
        });

    const onSubmit = async () => {
        const payload = {
            "amount": watch("amount"),
            "category": watch("category"),
            "date": watch("date"),
            "description": `${watch("description") ? watch("description") : ""}`
        };

        

        try {
            let response;
            if(user){
                response = await axiosInstance.put(`/expense/${user._id}`, payload);
            }
            else{
                response = await axiosInstance.post(`/expense`, payload);

            }
            if (response.status === 200) {
                console.log(user ? "Expense edited successfully" : "Expense added successfully");
                onClose();
            } else {
                console.error("Failed to add Expense");
            }

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='bg-white w-1/2 shadow-md rounded-md border border-gray-300 m-10 overflow-y-auto max-h-screen'>
            <div className="p-3 bg-purple-50 rounded-md sticky top-0 z-100 text-center">
                <h2 className="text-lg mb-2 text-black">{user ? "Edit Expense" : "Add Expense"}</h2>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4 text-start justify-between p-6">

                <div className='col-span-1'>
                    
                <FormControl fullWidth>
                    <TextField
                        id="outlined-basic" label="Amount" variant="outlined"
                        type='text'
                        className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                        {...register("amount", {
                            required: "Amount is required",
                            pattern: { value: /^\d+$/, message: "Only numbers are allowed" }
                        })}


                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                    </FormControl>
                </div>

                <div className='col-span-1'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select

                            id="outlined-basic" labelId="category-label" label="Category" variant="outlined"
                            className="w-full  border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...register("category", {
                                required: "Category is required"
                            })}
                            error={!!errors.category}
                            helperText={errors.category?.message}
                            value={watch("category")}
                        >
                            <MenuItem value="" disabled>
                                Select
                            </MenuItem>
                            <MenuItem value={"Food"}>Food</MenuItem>
                            <MenuItem value={"Travel"}>Travel</MenuItem>
                            <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                            <MenuItem value={"Bill"}>Bill</MenuItem>
                            <MenuItem value={"Bill"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className='col-span-1'>
                    <FormControl fullWidth>
                    <TextField
                        id="outlined-basic" label="Date" variant="outlined"
                        type='date'
                        className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                        {...register("date", {
                            required: "Date is required"
                        })}

                        error={!!errors.date}
                        helperText={errors.date?.message}
                        InputLabelProps={{ shrink: true }}
                    />
                    </FormControl>
                </div>

                <div className='col-span-3'>
                        <FormControl fullWidth>
                    <TextField
                        id="outlined-basic" label="Description" variant="outlined"
                        type='text'
                        className="w-full min-h-1/2 p-1 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                        {...register("description")}
                        multiline
                        minRows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}

                    />
                    </FormControl>
                </div>
            </div>

            <div className='flex justify-end w-full items-center space-x-4 p-6 border-t border-t-gray-300'>
                <div className="flex gap-x-4">
                    <Button variant="outlined" color="error" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>
                        Submit
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default AddOrEditExpenseForm;

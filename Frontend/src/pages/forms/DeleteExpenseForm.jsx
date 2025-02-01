import { Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../tokenManagement/axiosInstance';

const DeleteExpenseForm = ({onClose,user,accessToken}) => {

    
        const { control, watch, register, setValue, handleSubmit, reset,
            formState: { errors }, clearErrors } = useForm();


    const onSubmit = async () => {
        try {

            
            const response = await axiosInstance.delete(`/expense/${user._id}`);

            if (response.status === 200) {
                console.log("Expense deleted successfully");
                onClose();
            } else {
                console.error("Failed to delete Expense");
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div  className='bg-white w-1/2 shadow-md rounded-md border border-gray-300 m-10 overflow-y-auto max-h-screen'>
            <div className="p-3 bg-purple-50 rounded-md sticky top-0 z-100 text-center">
                <h2 className="text-lg mb-2 text-black">Delete Expense</h2>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4 text-start justify-between p-6">
            <h1 className='col-span-3 text-lg font-semibold'>Are you sure you want to delete this Expense?</h1>
            </div>
            <div className='flex justify-end w-full items-center space-x-4 p-6 border-t border-t-gray-300'>
                <div className="flex gap-x-4">
                    <Button variant="outlined" color="success" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button variant="contained" color="error" onClick={handleSubmit(onSubmit)}>
                        Delete
                    </Button>
                </div>
            </div>
    </div>
  )
}

export default DeleteExpenseForm

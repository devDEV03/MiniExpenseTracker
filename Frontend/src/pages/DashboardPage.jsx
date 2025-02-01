import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, TablePagination, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteExpenseForm from './forms/DeleteExpenseForm';
import { DatePicker } from 'antd';
import InsightsSection from './InsightsSection';
import InsightsIcon from '@mui/icons-material/Insights';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useSelector } from 'react-redux';
import axiosInstance from '../tokenManagement/axiosInstance';
import AddOrEditExpenseForm from './forms/AddOrEditExpenseForm';

const DashboardPage = () => {

    const {RangePicker} = DatePicker;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [expenseData, setExpenseData] = useState([]);
    const [editFormIndex, setEditFormIndex] = useState(null);
    const [deleteFormIndex, setDeleteFormIndex] = useState(null);
    const accessToken = useSelector((store) => store.user.accessToken);
    const user = useSelector((store) => store.user.user);

    const [showAddForm, setShowAddForm] = useState("");
    const [showEditForm, setShowEditForm] = useState("");
    const [showDeleteForm, setShowDeleteForm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedDate,setSelectedDate] = useState([]);


    const getClientData = async () => {
        console.log(accessToken);
        console.log(user);
        
        try {
            
            const response = await axiosInstance.get("/expense");
            if (response.status !== 200) {
                throw new Error("Couldnt get data");
            }

            const data = await response.data
            console.log(data);
            setExpenseData(data.expenses);
        } catch (error) {
            console.error("Error fetching client data:", error);
        }
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openEditForm = (index) => {
        setEditFormIndex(index);
        setShowEditForm(true);
    }

    const openDeleteForm = (index) => {
        setDeleteFormIndex(index);
        setShowDeleteForm(true);
    }
    useEffect(() => {
        console.log("Access Token", accessToken);
        
        getClientData();
    }, [showAddForm,showEditForm,showDeleteForm])

    const filteredData = expenseData.filter((row) => {
        let expenseDate = new Date(row?.date); 
    
        if (!selectedType.includes("All") && !row.category.includes(selectedType)) {
            return false;
        }
    
        if (selectedDate.length === 2) {
            const startDate = new Date(selectedDate[0]);
            const endDate = new Date(selectedDate[1]); 
    
            endDate.setHours(23, 59, 59, 999);
    
            return expenseDate >= startDate && expenseDate <= endDate;
        }
    
        return true;
    });

    const handleDateChange = (values) => {
        if (values) {
          setSelectedDate(values.map((item) => item.format("YYYY-MM-DD")));
        } else {
          setSelectedDate([]); // Reset if no dates are selected
        }
      };
    return (
        <div className='p-5 bg-white w-full'>
                <div className='flex text-2xl gap-2 font-bold mb-10 mt-4 align-middle'>
                    <BackupTableIcon className='my-auto'/>
                    <p className='my-auto'>Expenses Table</p>
                </div>

            <div className='bg-[#f6f4fd] w-full rounded-xl'>
                <div className='flex items-center justify-between p-4 border-b-1 shadow-lg'>
                    <h2 className="text-lg font-normal">View Expenses</h2>
                    <div className='flex justify-between md:w-1/2 w-3/4 align-middle'>
                        <Select
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value)
                            }}
                            size="small"
                            displayEmpty
                            renderValue={(value) => value}
                            className='bg-white w-[180px] h-[35px] rounded-lg'
                            defaultValue='All'
                        >
                            <MenuItem value={"All"}>All</MenuItem>
                            <MenuItem value={"Food"}>Food</MenuItem>
                            <MenuItem value={"Travel"}>Travel</MenuItem>
                            <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                            <MenuItem value={"Bill"}>Bill</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>

                            <RangePicker onChange={handleDateChange}/>
                        <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => setShowAddForm(true)}>
                            ADD EXPENSE
                        </Button>
                    </div>
                </div>
                {
                    showAddForm && (
                        <div className="fixed pt-10 z-[1000] inset-0 bg-black bg-opacity-100 flex items-center justify-center overflow-y-auto ">
                            <AddOrEditExpenseForm onClose={() => setShowAddForm(false)} accessToken={accessToken} />
                        </div>
                    )
                }

                {
                    showEditForm && (
                        <div className="fixed pt-10 z-[1000] inset-0 bg-black bg-opacity-100 flex items-center justify-center overflow-y-auto ">
                            <AddOrEditExpenseForm onClose={() => { setShowEditForm(false); setEditFormIndex(null) }} user={expenseData[editFormIndex]}  accessToken={accessToken}/>
                        </div>
                    )
                }

                {
                    showDeleteForm && (
                        <div className="fixed pt-10 z-[1000] inset-0 bg-black bg-opacity-100 flex items-center justify-center overflow-y-auto ">
                            <DeleteExpenseForm onClose={() => { setShowDeleteForm(false); setDeleteFormIndex(null) }} user={expenseData[deleteFormIndex]}  accessToken={accessToken}/>
                        </div>
                    )
                }

                <div className='p-10'>
                    <TableContainer className='overflow-x-auto border border-black'>
                        <Table className="table-fixed">
                            <TableHead>
                                <TableRow className="bg-[#D7D1F3]">
                                    <TableCell className="font-semibold border-r border-gray-400 w-[200px]">
                                        Category
                                    </TableCell>
                                    <TableCell className="font-semibold border-r border-gray-400 w-[200px]">
                                        Amount
                                    </TableCell>
                                    <TableCell className="font-semibold border-r border-gray-400 w-[200px]">
                                        Date
                                    </TableCell>

                                    <TableCell className="font-semibold border-r border-gray-400 w-[200px]">
                                        Description
                                    </TableCell>
                                    <TableCell className="font-semibold border-r border-gray-400 w-[200px]">
                                        Action
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    filteredData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((expense, index) => (
                                            <TableRow key={index} className='hover:bg-gray-50 bg-white '>
                                                <TableCell className="border border-black w-[200px]">
                                                    {expense?.category}
                                                </TableCell>
                                                <TableCell className="border border-black w-[200px]">
                                                    {expense?.amount}
                                                </TableCell>
                                                <TableCell className="border border-black w-[200px]">
                                                    {expense?.date.split("T")[0]}
                                                </TableCell>
                                                <TableCell className="border border-black w-[200px]">
                                                    {expense?.description}
                                                </TableCell>
                                                <TableCell
                                                    className="border border-black w-[400px]"
                                                >
                                                    <div className='flex justify-between'>
                                                        <Button variant="contained" startIcon={<EditIcon />} onClick={() => openEditForm(index)}>
                                                            Edit
                                                        </Button>
                                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => openDeleteForm(index)}>
                                                            Delete
                                                        </Button>
                                                    </div>

                                                </TableCell>
                                            </TableRow>
                                        ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <TablePagination
                    component="div"
                    count={expenseData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="border-t"
                />
            </div>

            <hr className="my-12"/>

                <div className='flex text-2xl gap-2 font-bold align-middle'>
                    <InsightsIcon className='my-auto'/>
                    <p>Spending Insights</p>
                </div>
            <div className="grid grid-cols-1 gap-6 mt-10 bg-white">
                <InsightsSection accessToken={accessToken} showAddForm={showAddForm} showEditForm={showEditForm} showDeleteForm={showDeleteForm}/>
            </div>
        </div>
    )
}

export default DashboardPage

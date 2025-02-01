const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");

const getAllExpenses = asyncHandler(async (req, res) => {
  console.log(req.user);
  
  const expenses = await Expense.find({user_id : req.user.id});
  res.status(200).json({ expenses, message: "Getting All the Expenses" });
});

const getExpenseById = asyncHandler(async (req,res) => {
    const expense = await Expense.findById(req.params.id);

    if(!expense){
    res.status(404);
    throw new Error("Expense not found");
    }

    if(expense.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("Not authroized to access this expense");
    }

    res.status(200).json({expense, message : "Getting the Expense"})
});


const createExpense = asyncHandler(async (req,res) => {
    const { amount,category,date, description } = req.body;
  if (!amount || !category) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const expense = await Expense.create({
    user_id : req.user.id,
    amount,
    category,
    date,
    description
  });

  if(expense){
    res.status(200).json({expense, message : `Expense Created with ID : ${expense.id}`});
  }
  else{
    res.status(400);
    throw new Error("User data is not valid");
  }
});


const editExpense = asyncHandler(async (req,res) => {
  console.log("Editing expense");
  
    const expense = await Expense.findById(req.params.id);

    if(!expense){
        res.status(404);
        throw new Error("Expense not found");
    }
    
    if(expense.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("Not authroized to access this expense");
      }

    const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
      req.body,
      {new : true}
    )

    res.status(200).json({updatedExpense, message: `Updating Expense with ID : ${req.params.id}` });

});


const deleteExpense = asyncHandler(async (req,res) => {
    const expense = await Expense.findById(req.params.id);

    if(!expense){
        res.status(404);
        throw new Error("Expense not found");
    }

    if(expense.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("Not authroized to access this expense");
      }

    await Expense.deleteOne({_id : req.params.id});

    
  res.status(200).json({ deletedExpense : expense, message: `Deleting Expense with ID : ${req.params.id}` });
});

const getStats = asyncHandler(async (req,res) => {
    const expenses = await Expense.find({user_id : req.user.id});

    let categoryStats = {};
    let grandTotal = 0;

    expenses.forEach(({ category, amount }) => {
      categoryStats[category] = (categoryStats[category] || 0) + amount;
      grandTotal += amount;
    });

    const stats = Object.entries(categoryStats).map(([category, totalAmount]) => ({
      name : category,
      value : totalAmount,
      percentage: ((totalAmount / grandTotal) * 100).toFixed(2) + "%",
    }));

    res.json({ grandTotal, categoryStats: stats });
})


module.exports = {getAllExpenses, getExpenseById, createExpense, editExpense, deleteExpense,getStats};
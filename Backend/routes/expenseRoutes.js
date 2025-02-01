const express = require("express");
const { getExpenseById, getAllExpenses, createExpense, editExpense, deleteExpense, getStats } = require("../controller/expenseController");
const validateToken = require("../middleware/validateToken");


const router = express.Router();

router.use(validateToken);
router.route("/").get(getAllExpenses).post(createExpense);
router.route("/stats").get(getStats)
router.route("/:id").get(getExpenseById).put(editExpense).delete(deleteExpense);

module.exports = router;
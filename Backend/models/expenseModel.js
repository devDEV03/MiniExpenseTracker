const { default: mongoose } = require("mongoose");

const expenseSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Food", "Travel", "Entertainment", "Bills", "Other"]
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    },
},
    {
        timestamps : true
    }
);

module.exports = mongoose.model("Expense", expenseSchema);

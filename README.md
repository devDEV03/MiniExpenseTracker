 **Mini Expense Tracker**

Mini Expense Tracker is a comprehensive expense management application that allows users to track their expenses, manage spending habits, and gain insights through detailed analytics.  

The project is built using **Node.js, Express, MongoDB for the backend**, and **React for the frontend**. It provides features such as **user authentication, expense management, filtering, pagination, and interactive charts**.

---

Table of Contents:
- Features
- Folder Structure
- Backend
  - Description
  - Routes
  - Environment Variables
  - Setup
- Frontend
  - Description
  - Pages and Components
  - Environment Variables
  - Setup
- Contribution
- License
- Contact

---

 Features:
 **User Authentication** (Sign Up, Login, Logout with JWT)  
 **Dashboard Navigation** (View Expenses, Add/Edit/Delete Expenses, Insights)  
 **Expense Management** (CRUD operations for expenses)  
**Filtering & Pagination** (Sort by date, category, and paginated results)  
 **Spending Insights** (Pie charts & bar graphs for expense categories)  
 **Responsive Design** (Optimized for desktop & mobile)  

---

 Folder Structure

MiniExpenseTracker/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env
│   ├── index.js
│   ├── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   ├── public/
│   ├── .env
│   ├── package.json
├── .gitignore
├── README.md



Explanation:

backend/: Contains the server-side code.

controllers/: Houses functions that handle requests and responses.
middleware/: Contains middleware functions for tasks like authentication.
models/: Defines the data schemas, likely using Mongoose for MongoDB.
routes/: Defines the API endpoints and associates them with controller functions.
config/: Contains configuration files, possibly for database connections.
.env: Environment variables for the backend.
index.js: The main entry point for the backend application.
package.json: Lists backend dependencies and scripts.
frontend/: Contains the client-side code.

src/: Main source code directory.
components/: Reusable React components.
pages/: React components representing different pages.
services/: Modules for handling tasks like API calls.
App.js: Main application component.
index.js: Entry point for the React application.
public/: Static assets like images and the main HTML file.
.env: Environment variables for the frontend.
package.json: Lists frontend dependencies and scripts.
.gitignore: Specifies files and directories to be ignored by Git.

README.md: Provides an overview and documentation of the project.

This structure separates the backend and frontend components, promoting modularity and maintainability.





---

 Backend

### ** Description**
The **backend** is built using **Node.js, Express.js, and MongoDB**. It handles **user authentication, expense management, analytics, and database operations**.

### ** Routes**
#### **Authentication Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Authenticate user & return JWT token |
| **POST** | `/api/auth/logout` | Logout user (invalidate JWT) |
| **GET** | `/api/auth/user` | Get current user details |

#### **Expense Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/expenses` | Fetch all expenses (paginated) |
| **POST** | `/api/expenses` | Add a new expense |
| **GET** | `/api/expenses/:id` | Get a single expense |
| **PUT** | `/api/expenses/:id` | Update an expense |
| **DELETE** | `/api/expenses/:id` | Delete an expense |

#### **Insights & Analytics**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/insights/category-wise` | Get total spending per category |
| **GET** | `/api/insights/percentage-distribution` | Get percentage distribution of expenses |
| **GET** | `/api/insights/monthly-summary` | Get monthly spending summary |

 Environment Variables:
Create a `.env` file in the `backend/` directory with the following:
PORT=5000 MONGO_URI=your-mongodb-connection-string JWT_SECRET=your-secret-key FRONTEND_URL=http://localhost:3000



 Backend Setup
 Clone the repository.
Navigate to the `backend` directory.
Install dependencies:
   npm install
Create a .env file and add the necessary environment variables.
Start the server:
npm start
The backend should now be running on http://localhost:5000/.




frontend:
 Description
The frontend is built using React.js. It provides a user-friendly interface for managing expenses and visualizing insights.


Pages and Components:
Home Page
Contains a welcome message and navigation options.
Login/Sign up options
Dashboard
Displays a list of expenses with pagination & filters.
Shows spending insights (charts).
My Expenses
Lists all recorded expenses.
Options to view, edit, delete expenses.
Add/Edit Expense
A form to create or update an expense.
Insights Page
Pie charts & bar graphs showing spending patterns.

Environment Variables:
Create a .env file in the frontend/ directory with the following:
REACT_APP_BACKEND_URL=http://localhost:5000



Frontend Setup:

Clone the repository.
Navigate to the frontend directory.
Install dependencies:
npm install
Create a .env file and add the necessary environment variables.
Start the frontend:
npm start
Open http://localhost:3000/ in your browser.


License:
This project is licensed under the MIT License.

Contact:

For any questions or inquiries, please contact:
Email: 
GitHub: MiniExpenseTracker

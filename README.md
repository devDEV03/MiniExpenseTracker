 **Mini Expense Tracker**

Mini Expense Tracker is a comprehensive expense management application that allows users to track their expenses, manage spending habits, and gain insights through detailed analytics.  

The project is built using **Node.js, Express, MongoDB for the backend**, and **React for the frontend**. It provides features such as **user authentication, expense management, filtering, pagination, and interactive charts**.


Frontend Setup:

Clone the repository.
Navigate to the frontend directory.
Install dependencies:
npm install
Create a .env file and add the necessary environment variables.
Start the frontend:
npm run dev
Open http://localhost:3000/ in your browser.

 Backend Setup
 Clone the repository.
Navigate to the `backend` directory.
Install dependencies:
npm install
Create a .env file and add the necessary environment variables.
Start the server:
nodemon server.js
The backend should now be running on http://localhost:5000/.



---



 Features:
 **User Authentication** (Sign Up, Login, Logout with JWT)  
 **Dashboard Navigation** (View Expenses, Add/Edit/Delete Expenses, Insights)  
 **Expense Management** (CRUD operations for expenses)  
**Filtering & Pagination** (Sort by date, category, and paginated results)  
 **Spending Insights** (Pie charts for expense categories)  

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


---

#### **Authentication Routes**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/user/register` | Register a new user & return JWT token & Refresh Token |
| **POST** | `/api/user/login` | Authenticate user & return JWT token & Refresh Token |
| **GET** | `/api/user/refresh-token` | Verifying Refresh Token & return JWT token |

#### **Expense Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/expense` | Fetch all expenses (paginated) |
| **POST** | `/api/expense` | Add a new expense |
| **GET** | `/api/expense/:id` | Get a single expense |
| **PUT** | `/api/expense/:id` | Update an expense |
| **DELETE** | `/api/expense/:id` | Delete an expense |
| **DELETE** | `/api/expense/stats` | For getting Spending Insights |


 Environment Variables:
Create a `.env` file in the `backend/` directory with the following:
PORT=5000 MONGO_URI=your-mongodb-connection-string JWT_SECRET=your-secret-key FRONTEND_URL=http://localhost:3000


---

Approach :

To build a mini expense tracker, the backend will use Node.js with Express.js and MongoDB (or PostgreSQL) for storage, while the frontend will be in React.js with Axios for API requests and React Router for navigation. Authentication will be handled using JWT tokens where, upon registering or logging in, the server will generate an access token (short-lived, e.g., 15 min) and a refresh token (longer-lived, e.g., 7 days) stored in an HTTP-only cookie. The access token is used for making API requests, while the refresh token allows the user to get a new access token through an Axios interceptor when the current one expires. A middleware (validateToken.js) will extract and verify the JWT access token from request headers, decode the user ID, and attach it to req.user before allowing access to protected routes. If the token is invalid or expired, the user must get a new one using the refresh token. CRUD operations for expenses (POST /expenses, GET /expenses, PUT /expenses/:id, DELETE /expenses/:id) will be secured with validateToken, ensuring that expenses are modified only for the authenticated user. A /stats endpoint will also be protected using validateToken, aggregating expenses and returning statistics for the logged-in user. The frontend will feature login, registration, and a dashboard displaying expenses, categorized statistics, and the ability to add, edit, and delete expenses. The Axios instance with an interceptor will automatically refresh the access token when expired, ensuring smooth user experience without frequent re-authentication. This approach ensures secure authentication, efficient state management, and a seamless user experience while keeping the implementation scalable and maintainable.

Contact:

For any questions or inquiries, please contact:
Email: singhaldev26@gmail.com
GitHub: devDEV03

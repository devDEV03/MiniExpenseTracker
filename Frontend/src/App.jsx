import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import EntityLayout from './pages/EntityLayout'

function App() {

  const browserRouter = createBrowserRouter([
    {
      path : "/",
      element : <EntityLayout title={"Login"}><LoginPage /></EntityLayout>
    },
    {
      path : "/dashboard",
      element : <EntityLayout title={"Dashboard"}><DashboardPage /></EntityLayout>
    },
  ])
  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App

import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './modules/SharedModules/components/AuthLayout/AuthLayout';
import Notfound from './modules/SharedModules/components/Notfound/Notfound';
import MasterLayout from './modules/SharedModules/components/MasterLayout/MasterLayout';
import Login from './modules/AuthenticationModule/components/login/Login';
import Register from './modules/AuthenticationModule/components/register/Register';
import ForgetPass from './modules/AuthenticationModule/components/forgetpass/ForgetPass';
import ResetPass from './modules/AuthenticationModule/components/resetpass/ResetPass';
import Dashboard from './modules/HomeModules/components/Dashboard/Dashboard';
import RecipesList from './modules/RecipesModule/components/RecipesList/RecipesList';
import CategoriesList from './modules/CategoriesModule/components/CategoriesList/CategoriesList';
import UsersList from './modules/UsersModules/components/userslist/UsersList';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './modules/SharedModules/components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipesData from './modules/RecipesModule/components/RecipesData/RecipesData';

function App() {

  let [loginDate, setLoginData] = useState(null);
  let saveLoginData = () => {
    let encodedToken = localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      saveLoginData()
    }
  }, [])

  let routes = createBrowserRouter([
    {
      path: "dashboard",
      element:(
        <ProtectedRoute loginDate={loginDate} setLoginData={setLoginData} >
          <MasterLayout loginDate={loginDate} />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "home", element: <Dashboard /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipesData", element: <RecipesData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { path: "", element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "resetpass", element: <ResetPass /> },
      ],
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}>
        <ToastContainer />
      </RouterProvider>
    </>  
  )
}

export default App

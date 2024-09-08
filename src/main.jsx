import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <h1>Opps there seem to be an error</h1>,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>
      },
      {
        path: '/tasks',
        element: <Dashboard></Dashboard>
      },
      {
        path: '/register',
        element: (
          <PrivateRoute>
            <Register></Register>
          </PrivateRoute>
        )
      },
      {
        path: '/login',
        element: (
          <PrivateRoute>
            <Login></Login>
          </PrivateRoute>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

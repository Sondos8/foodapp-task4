import React, { Children, useEffect } from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ loginDate , children, setLoginData  }) {


    let saveLoginData = () => {
      let encodedToken = localStorage.getItem('token');
      if (encodedToken) {
        try {
          let decodedToken = jwtDecode(encodedToken);
          setLoginData(decodedToken);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }

  if(localStorage.getItem('token') || loginDate) return children;

  return <Navigate to="/login" />
}

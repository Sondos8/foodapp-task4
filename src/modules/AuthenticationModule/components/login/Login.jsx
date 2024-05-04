import React from 'react'
import logo from '../../../../assets/images/4 4.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Login({ saveLoginData }) {

  const navigate = useNavigate();

  let { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data)
      localStorage.setItem('token',response.data.token);
      console.log(response.data.token);
      saveLoginData()
      //TODO:toast.success(login);
      navigate('/dashboard')
    }
    catch(error) {
      toast.error(error.response.data.message);
    }
  }



  return (
    <>
    <div className="auth-container">
      <div className="container-fluid vh-100 overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white p-4 rounded-3">
            <div className='text-center'>
              <img src={logo} alt="" className='w-25' />
            </div>
            <div className="form-content pe-4 ps-4">
              <h3>Log In</h3>
              <p className='font'>Welcome Back! Please enter your details</p>
              <form onSubmit={ handleSubmit(onSubmit) }>
              <div className="input-group mb-3 mt-4">
                <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-mobile-screen color"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control color" 
                  placeholder="Enter your E-mail"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9_%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
                      message: "Invalid mail"
                    }
                  })}
                />
              </div>
              {errors.email && <p className='alert alert-success'>{errors.email.message}</p>}
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock color"></i>
                </span>
                <input
                  type="password" 
                  className="form-control color" 
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /[A-Z0-9_%+-]{2,}/,
                      message: "Invalid mail"
                    }
                  })}
                />
              </div>
              {errors.password && <p className='alert alert-success'>{errors.password.message}</p>}
              <div className="links d-flex justify-content-between mb-4">
                <a>Register Now?</a>
                <a className='color-2' href='forgetpass'>Forgot Password?</a>
              </div>
              <button className='border-0 p-2 rounded-3 bg-btn w-100'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  )
}

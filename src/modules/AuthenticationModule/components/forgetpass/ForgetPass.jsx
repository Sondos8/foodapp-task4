import React from 'react'
import logo from '../../../../assets/images/4 4.svg'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ForgetPass() {

  const navigate = useNavigate();

  let { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data)
      // console.log(response);
      toast.success('Your request is being processed, please check your email');
      navigate('/resetpass')
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
              <h3>Forgot Your Password?</h3>
              <p className='font'>No worries! Please enter your email and we will send a password reset link </p>
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

              <button className='border-0 p-2 rounded-3 bg-btn w-100 mt-3'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

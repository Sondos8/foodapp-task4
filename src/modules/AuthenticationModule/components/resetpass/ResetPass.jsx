import React from 'react'
import logo from '../../../../assets/images/4 4.svg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function ResetPass() {

  let { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data)
      navigate('/login')
    }
    catch(error) {
      toast.error(error.response.data.message);
    }
    // console.log(data);
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
              <h3> Reset  Password</h3>
              <p className='font'>Please Enter Your Otp  or Check Your Inbox</p>
              <form onSubmit={ handleSubmit(onSubmit) }>
              <div className="input-group mb-3 mt-4">
                <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-mobile-screen color"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control color" 
                  placeholder="Email"
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
                  type="text" 
                  className="form-control color" 
                  placeholder="OTP"
                  {...register("seed", {
                    required: "Invalid OTP",
                  })}
                />
              </div>
              {errors.seed && <p className='alert alert-success'>{errors.seed.message}</p>}
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock color"></i>
                </span>
                <input
                  type="text" 
                  className="form-control color" 
                  placeholder="New Password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /[A-Z0-9_%+-]{2,}/,
                      message: "Invalid Password"
                    }
                  })}
                />
              </div>
              {errors.password && <p className='alert alert-success'>{errors.password.message}</p>}
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock color"></i>
                </span>
                <input
                  type="text" 
                  className="form-control color" 
                  placeholder="Confirm New Password"
                  {...register("confirmPassword", {  
                    required: "rePassword is required",
                    pattern: {
                      value: /[A-Z0-9_%+-]{2,}/,
                      message: "Invalid rePassword"
                    }
                  })}
                />
              </div>
              {errors.confirmPassword && <p className='alert alert-success'>{errors.confirmPassword.message}</p>}
              <button className='border-0 p-2 rounded-3 bg-btn mt-4 w-100'>Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  )
}

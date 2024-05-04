import React from 'react'
import logo from '../../../../assets/images/4 4.svg'
import notfound from '../../../../assets/images/not-found-bg.png'
import { useNavigate } from 'react-router-dom';

export default function Notfound() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/dashboard')
  }

  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="img mt-3">
            <img src={ logo } alt="" />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="content mt-5 ms-5">
            <h3 className='mt-5'>Oops.</h3>
            <h4 className='color-2'>Page not found</h4>
            <p>This Page doesn’t exist or was removed! We suggest you  back to home.</p>
            <button onClick={handleBack} className='border-0 p-2 rounded-3 w-100 btn btn-success'><i className="fa-solid fa-arrow-left me-5"></i> Back To Home</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="img">
            <img src={notfound} alt="" className='w-100' />
          </div>
        </div>
      </div>
    </div>


    </>
  )
}

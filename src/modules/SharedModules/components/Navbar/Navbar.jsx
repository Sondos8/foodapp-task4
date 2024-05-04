import React from 'react'
import img from '../../../../assets/images/avatar.png'

export default function Navbar({ loginDate }) {
  // console.log(loginDate);
  return (
    <>
  <div className=' background p-2 my-3 m-auto '> 
    <div className="row">
    <div className="col-md-8">  
    <div className="search">
      <input type="text" placeholder='Search' className='form-control ms-3'/>
    </div>
    </div>
    <div className="col-md-4">
      <div className="username text-end me-3">
        <img src={img} alt=""  className='me-2'/>
        {loginDate?.userName} 
        <span className='ms-4'><i className="fa-solid fa-angle-down"></i></span>
        <span className='ms-4'><i className="fa-solid fa-bell"></i></span>
      </div>
    </div>
    </div>
  </div>

    </>
  )
}

import React from 'react'
import header from '../../../../assets/images/header.png'

export default function Header({ title, description, imgUrl }) {  
  return (
    <>
    <div className="m-1 header-container rounded-2">
      <div className="row d-flex align-items-center">
        <div className="col-md-8">
          <div className="content ms-5">
            <h2>{ title }</h2>
            <p>{ description }</p>
          </div>
        </div>
        <div className="col-md-4">
            <div className="img text-center">
              <img src={ imgUrl } alt="" className='w-50' />
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

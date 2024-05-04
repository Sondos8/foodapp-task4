import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/SideBar'

export default function MasterLayout({ loginDate }) {
  return (
    <>
      <div className='overflow-hidden'>
        <div className='d-flex'>
          <div>
            <SideBar />
          </div>
          <div className="w-100">
            <Navbar loginDate={loginDate} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

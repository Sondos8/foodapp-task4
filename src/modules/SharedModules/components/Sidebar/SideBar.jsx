import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import toggler from '../../../../assets/images/3.png'

export default function SideBar() {

  const [isCollapse, setIsCollapse] = useState(false)
  const togglerCollapse = () => {
    setIsCollapse(!isCollapse)
  } 
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token');
  }

  return (
    <div className='sidebar-container'>
        <Sidebar collapsed={isCollapse}>
          <Menu>
            <MenuItem onClick={togglerCollapse} icon={<img src={toggler} alt=""/>} className='mt-4 mb-5 ms-5' > </MenuItem>
            <MenuItem icon={<i className='fa fa-home' aria-hidden='true'></i>} component={<Link to="/dashboard"/>}> Home </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="/dashboard/users"/>}> Users </MenuItem>
            <MenuItem icon={<i className="fa-solid fa-boxes-stacked"></i>} component={<Link to="/dashboard/recipes"/>}> Recipes </MenuItem>
            <MenuItem icon={<i className="fa-regular fa-calendar-days"></i>} component={<Link to="/dashboard/categories"/>}> Categories </MenuItem>
            <MenuItem onClick={logout}  icon={<i className="fa-solid fa-right-from-bracket"></i>} component={<Link to="/login"/>} className='mt-4'> Layout </MenuItem>
          </Menu>
        </Sidebar>
      {/* <button onClick={logout} className='btn btn-success'>logout</button> */}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/components/Header/Header'
import header from '../../../../assets/images/header.png'
import nodata from '../../../../assets/images/no-data.png'
import axios from 'axios';
import DeleteData from '../../../SharedModules/components/DeleteData/DeleteData';
import Modal from 'react-bootstrap/Modal';
import NoData from '../../../SharedModules/components/NoData/NoData';

export default function UsersList() {

  const [usersList, setUsersList] = useState([]);
  const [catId, setCatId] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [countryValue, setCountryValue] = useState('');
  const [groupsValue, setGroupsValue] = useState('');
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const [showDelelte, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => { 
    setCatId(id)
    setShowDelete(true); 
  }

  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Users/${catId}`,
        {
          headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
        }
      );
      handleDeleteClose()
      getUsersList()
      // console.log(response);
    }
    catch(error) {
      console.log(error);
    }
  };

  const getUsersList = async (userName, email, country, groups, pageSize, pageNumber) => {
    try {
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {
        headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` },
        params: {
          userName: userName,
          email: email,
          country: country,
          groups: groups,
        }
      }
      );
    setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1) );
    // console.log(response.data);
    setUsersList(response.data.data)
    }
    catch(error) {
      console.log(error);
    }
  }; 

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getUsersList(input.target.value, emailValue, countryValue, groupsValue, 50, 1);
  };

  const getEmailValue = (input) => {
    setEmailValue(input.target.value);
    getUsersList(nameValue, input.target.value, countryValue, groupsValue, 50, 1);
  }; 

  const getCountryValue = (input) => {
    setCountryValue(input.target.value);
    getUsersList(nameValue, emailValue, input.target.value, groupsValue, 50, 1);
  }; 

  const getGroupValue = (select) => {
    setGroupsValue(select.target.value);
    getUsersList(nameValue, emailValue, countryValue,select.target.value, 50, 1)
    // console.log(select.target.value);
  }

  useEffect(() => {
    getUsersList("", "", "", "", 50, 1);
  }, []);

  return (
    <>
    <Header 
      title={'Users List!'}
      description={'You can now add your items that any user can order it from the Application and you can edit'} 
      imgUrl={header} 
    /> 

    <Modal show={showDelelte} onHide={handleDeleteClose}>
      <Modal.Header closeButton>
          <h3>Delete User</h3>
      </Modal.Header>
      <Modal.Body>
        <DeleteData deleteItem={'User'} />
        </Modal.Body>
        <div className='d-flex justify-content-end m-3'>
          <button className='btn btn-danger p-2' onClick={onDeleteSubmit}>
            Delete this item
          </button>
        </div>
    </Modal>

    <div className='m-4 p-1'>
      <div className="row">
        <div className='col-md-12'>
          <h4>Users Table Details</h4>
          <p>You can check all details</p>
        </div>
      </div>
      <div className='filteration my-3'>
        <div className="row">
          <div className="col-md-3">
            <input 
            type="text" 
            className='form-control'
            placeholder='Search by name..'
            onChange={getNameValue} 
           />
          </div>
          <div className="col-md-3">
            <input 
            type="text" 
            className='form-control'
            placeholder='Search by email..'
            onChange={getEmailValue} 
           />
          </div>
          <div className="col-md-3">
            <input 
            type="text" 
            className='form-control'
            placeholder='Search by country..'
            onChange={getCountryValue} 
           />
          </div>
          <div className="col-md-3">
          <select className='form-control' onChange={getGroupValue}>
          <option>Search by group</option>
            <option value='1'>Admin</option>
            <option value='2'>Users</option>
          </select>
          </div>
        </div>
      </div>
      <table className="table table-borderless color-3 table-striped rounded-5">
        <thead className='rounded-3'>
            <tr className='rounded-3'>
              <th className='bg-secondary-subtle p-3 rounded-start-4'>Name</th>
              <th className='bg-secondary-subtle p-3'>Image</th>
              <th className='bg-secondary-subtle p-3'>Email</th>
              <th className='bg-secondary-subtle p-3'>Country</th>
              <th className='bg-secondary-subtle p-3'>PhoneNumber</th>
              <th className='bg-secondary-subtle p-3'>Group</th>
              <th className='bg-secondary-subtle p-3 rounded-end-4 text-end'>Actions</th>
            </tr>
          </thead>
        <tbody>
          {usersList?.length > 0 ?  usersList.map((item) => (
            <tr className='color-3' key={item.id}>
              <td className='w-25'>{item.userName}</td>
              <td>
                {item.imagePath ? 
                <div className='w-50'>
                  <img src={"https://upskilling-egypt.com:3006/" + item.imagePath} alt='' className='w-25 rounded-2' />
                </div>
                : 
                <div className='w-50'>
                  <img src={nodata} alt='no image' className='w-25 rounded-2' />
                </div>
              }
              </td>
              <td>{item.email}</td>
              <td>{item.country}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.group?.name}</td>
              <td className='text-end d'>
                <i
                  onClick={() => handleDeleteShow(item.id)} 
                  className='fa fa-trash color-2 me-1 mouse'
                  aria-hidden="true"
                  ></i>
              </td>
            </tr>
            )) : <NoData />}
        </tbody>
      </table> 
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {arrayOfPages.map((pageNo) => 
            <li key={pageNo} className="page-item" onClick={() => getUsersList(userName, email, country, groups, 50,pageNo)}>
              <a className="page-link">
                {pageNo}
              </a>
            </li>
          )}
          <li className="page-item">
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

    </div>
    </>
  )
}

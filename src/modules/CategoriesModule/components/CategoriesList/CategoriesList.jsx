import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/components/Header/Header'
import header from '../../../../assets/images/header.png'
import axios from 'axios'
import NoData from '../../../SharedModules/components/NoData/NoData'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import DeleteData from '../../../SharedModules/components/DeleteData/DeleteData'

export default function CategoriesList() {

  const [categoriesList, setCategoriesList] = useState([]);
  const [catId, setCatId] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [arrayOfPages, setArrayOfPages] = useState([]);

 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelelte, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => { 
    setCatId(id)
    setShowDelete(true); 
  }

  const [addCategory, setAddCategory] = useState('');

  const handelClear = () => {
    addCategory()
    setAddCategory('')
  }

  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
        {
          headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
        }
      );
      handleDeleteClose()
      getCategoriesList()
      // console.log(response);
    }
    catch(error) {
      console.log(error);
    }
  }

  let { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Category',
        data,
        {
          headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
        }
      );
      handleClose()
      getCategoriesList()
      handelClear()
      // console.log(response);
    }
    catch(error) {
      console.log(error);
    }
   
  }

  const getCategoriesList = async (name, pageSize, pageNumber) => {
    try {
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {
        headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` },
        params: { name: name},
      }
    );
    setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1) );
    setCategoriesList(response.data.data);
    }
    catch(error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    getCategoriesList("", 20, 1);
  }, [])

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getCategoriesList(input.target.value, 20, 1);
  };

  return (
    <>
    <Header 
      title={'Categories Item'}
      description={'You can now add your items that any user can order it from the Application and you can edit'} 
      imgUrl={header} 
    /> 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Add Category</h3>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={ handleSubmit(onSubmit) }>
              <div className="input-group mb-3 mt-4 rounded-3">
                <input 
                  type="text" 
                  className="form-control color p-2 bg-body-secondary" 
                  placeholder="Category Name"
                  name="addCategory"
                  onChange={(e) => setAddCategory(e.target.value)}
                  {...register("name", {
                    required: "name is required",
                  })}
                />
              </div>
              {errors.name && <p className='alert alert-success'>{errors.name.message}</p>}
              <button className='border-0 p-2 rounded-3 btn-c w-100 mt-3'>Save</button>
              </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelelte} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Category</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={'Category'} />
        </Modal.Body>
        <div className='d-flex justify-content-end m-3'>
          <button className='btn btn-danger p-2' onClick={onDeleteSubmit}>
            Delete this item
          </button>
        </div>
      </Modal>

    <div className="m-4 p-1">
      <div className="row">
        <div className="col-md-6">
          <h3>Categories Table Details</h3>
          <span className='color-3'>You can check all details</span>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button onClick={handleShow} className='btn-c border-0 rounded-3'>Add New Category</button>
        </div>
      </div>
      <div className="filteration my-3">
        <div className="row">
          <div className="col-md-12">
            <input 
            type="text" 
            className='form-control'
            placeholder='Search by name category here..'
            onChange={getNameValue}
            />
          </div>
        </div>
      </div>
      <table className="table table-borderless color-3 table-striped rounded-5">
      <thead className='rounded-3'>
            <tr className='rounded-3'>
              <th className='bg-secondary-subtle p-3 rounded-start-4'>Name</th>
              <th className='bg-secondary-subtle p-3'></th>
              <th className='bg-secondary-subtle p-3 d-flex justify-content-end rounded-end-4'>Actions</th>
            </tr>
          </thead>
        <tbody>
          {categoriesList.length > 0 ?  categoriesList.map((item , index) => (
            <tr className='color-3' key={item.id}>
              <td>{item.name}</td>
              <td className='text-center'>{item.creationDate}</td>
              <td  className='text-end'>
                <i
                  className='fa fa-edit color-2 me-3 mouse'
                  aria-hidden="true"
                  ></i>
                <i
                  onClick={() => handleDeleteShow(item.id)} 
                  className='fa fa-trash color-2 mouse me-2'
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
            <li key={pageNo.id} className="page-item" onClick={() => getCategoriesList(nameValue, 20,pageNo)}>
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

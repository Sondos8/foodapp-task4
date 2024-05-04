import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/components/Header/Header'
import header from '../../../../assets/images/header.png'
import axios from 'axios';
import NoData from '../../../SharedModules/components/NoData/NoData';
import nodata from '../../../../assets/images/no-data.png'
import DeleteData from '../../../SharedModules/components/DeleteData/DeleteData';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function RecipesList() {
  const navigate = useNavigate();
  const [recipesList, setRecipesListList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [catId, setCatId] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [catValue, setCatValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const [showDelelte, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => { 
    setCatId(id)
    setShowDelete(true); 
  };

  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${catId}`,
        {
          headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
        }
      );
      handleDeleteClose()
      getRecipesList()
      // console.log(response);
    }
    catch(error) {
      console.log(error);
    }
  };

  const getRecipesList = async (name, tagId, catId, pageSize, pageNumber) => {
    try {
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {
        headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` },
        params: {
          name: name,
          tagId: tagId,
          categoryId: catId,
        },
      }
    );
    setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1) );
    // console.log(arrayOfPages);
    // console.log(response.data.totalNumberOfPages);
    setRecipesListList(response.data.data);
    }
    catch(error) {
      console.log(error);
    }
  }; 

  const getCategoriesList = async () => {
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
      {
        headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
      }
    );
    setCategoriesList(response.data.data);
    }
    catch(error) {
      console.log(error);
    }
  };

  const getTagsList = async () => {
      try {
        let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/tag',
        {
          headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
        }
      );
      // console.log(response.data);
      setTagList(response.data);
      }
      catch(error) {
        console.log(error);
      }
  };

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(input.target.value, tagValue, catValue, 3, 1);
  };

  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipesList(nameValue, tagValue,input.target.value, 3, 1);
  };

  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(nameValue,input.target.value, catValue, 3, 1);
  };

  const doToRecipeData = () => {
    navigate('/dashboard/recipesData')
  };

  useEffect(() => {
    getRecipesList();
    getCategoriesList();
    getTagsList();
  }, []);

  return (
    <>
    <Header 
      title={'Recipe Itmes!'}
      description={'You can now add your items that any user can order it from the Application and you can edit'} 
      imgUrl={header} 
    /> 

    <Modal show={showDelelte} onHide={handleDeleteClose}>
      <Modal.Header closeButton>
          <h3>Delete Category</h3>
      </Modal.Header>
      <Modal.Body>
        <DeleteData deleteItem={'Recipe'} />
        </Modal.Body>
        <div className='d-flex justify-content-end m-3'>
          <button className='btn btn-danger p-2' onClick={onDeleteSubmit}>
            Delete this item
          </button>
        </div>
    </Modal>

<div className="m-4 p-1 vh-100">
      <div className="row">
        <div className="col-md-6">
          <h3>Recipe Table Details</h3>
          <span className='color-3'>You can check all details</span>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button onClick={doToRecipeData} className='btn-c border-0 rounded-3'>Add New Item</button>
        </div>
      </div>
      <div className="filteration my-3">
        <div className="row">
          <div className="col-md-6">
            <input 
            type="text" 
            className='form-control'
            placeholder='Search here..'
            onChange={getNameValue} 
            />
          </div>
          <div className="col-md-3">
            <select className='form-control' onChange={getTagValue}>
              <option value="">Search by tag</option>
              {tagList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                    {tag.name}
                </option>
               ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className='form-control' onChange={getCatValue}>
              <option value="">Search by category</option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                      {cat.name}
                  </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <table className="table table-borderless color-3 table-striped rounded-5">
        <thead className='rounded-3'>
            <tr className='rounded-3'>
              <th className='bg-secondary-subtle p-3 rounded-start-4'>Name</th>
              <th className='bg-secondary-subtle p-3'>Image</th>
              <th className='bg-secondary-subtle p-3'>Price</th>
              <th className='bg-secondary-subtle p-3'>Description</th>
              <th className='bg-secondary-subtle p-3'>tag</th>
              <th className='bg-secondary-subtle p-3'>Category</th>
              <th className='bg-secondary-subtle p-3 rounded-end-4 text-end'>Actions</th>
            </tr>
          </thead>
        <tbody>
          {recipesList?.length > 0 ?  recipesList.map((item) => (
            <tr className='color-3' key={item.id}>
              <td className='w-25'>{item.name}</td>
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
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.tag.name}</td>
              <td>{item.category[0]?.name}</td>
              <td className='text-end d'>
                <i
                  className='fa fa-edit color-2 me-3 mouse'
                  aria-hidden="true"
                  ></i>
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
            <li key={pageNo} className="page-item" onClick={() => getRecipesList(nameValue,tagValue,catValue,3,pageNo)}>
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

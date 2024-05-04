import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RecipesListHeader from '../../../SharedModules/components/RecipesListHeader/RecipesListHeader';

export default function RecipesData() {

    const [categoriesList, setCategoriesList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const navigate = useNavigate();

    let { 
        register, 
        handleSubmit, 
        formState: { errors }, 
      } = useForm();

      const appendToFormData = (data) => {
        const formData = new FormData();
        formData.append("name",data.name); 
        formData.append("price",data.price); 
        formData.append("description",data.description); 
        formData.append("categoriesIds",data.categoriesIds); 
        formData.append("tagId",data.tagId); 
        formData.append("recipeImage",data.recipeImage[0]); 
        return formData;
      }


    const onSubmit = async (data) => {
        let recipeFormData = appendToFormData(data);
        try {
          let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Recipe',
          recipeFormData,
          {
            headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
          }
        );
        toast.success('The Recipe created successfully')
        navigate('/dashboard/recipes')
        }
        catch(error) {
          toast.error(error.response.data.message);
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

    useEffect(() => {
      getCategoriesList();
      getTagsList();
    }, []);

  return (
    <>
    <RecipesListHeader />
    <div className='p-5 w-75 m-auto'>
    <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="input-group mb-3 mt-4">
            <input 
              type="text" 
              className="form-control color bg-secondary-subtle" 
              placeholder="Recipe Name"
              {...register("name", {
                required: "name is required"
              })}
            />
        </div>
            {errors.name && <p className='alert alert-success p-2'>{errors.name.message}</p>}
        <div className="input-group mb-3">
              <select
               className="form-control bg-secondary-subtle"
               {...register("tagId", {
                required: "tagId is required",
              })}>
                <option value="">tag</option>
                {tagList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                    {tag.name}
                </option>
            ))}
              </select>
        </div>
            {errors.tagId && <p className='alert alert-success p-2'>{errors.tagId.message}</p>}    
        <div className="input-group mb-3">
            <input
              type="number" 
              className="form-control bg-secondary-subtle" 
              placeholder="Price"
              {...register("price", {
                required: "price is required",
              })}
            />
        </div>
            {errors.price && <p className='alert alert-success p-2'>{errors.price.message}</p>}
        <div className="input-group mb-3">
              <select
               className="form-control"
               {...register("categoriesIds", {
                required: "categoriesIds is required",
              })}>
                <option value="">Categ</option>
                {categoriesList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.name}
                </option>
            ))}
              </select>
        </div>
            {errors.categoriesIds && <p className='alert alert-success p-2'>{errors.categoriesIds.message}</p>}
        <div className="input-group mb-3">
            <textarea 
            className="form-control bg-secondary-subtle"
            placeholder="Description *" 
            {...register("description", {
                required: "description is required",
              })}
            cols="2" rows="3"></textarea>
        </div>
            {errors.description && <p className='alert alert-success p-2'>{errors.description.message}</p>}
        <div className="input-group mb-3 mt-4">
            <input 
              type="file" 
              className="form-control" 
              {...register("recipeImage", {
                required: "recipeImage is required"
              })}
            />
        </div>
            {errors.recipeImage && <p className='alert alert-success p-2'>{errors.recipeImage.message}</p>}
        <div className='text-end'>
            <button className='border-0 p-2 rounded-3 bg-listData'>Save</button>
        </div>
    </form>   
    </div>
    </>
  )
}

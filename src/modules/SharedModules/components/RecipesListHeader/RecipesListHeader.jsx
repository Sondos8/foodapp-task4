import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecipesListHeader() {

    const navigate = useNavigate()

    const goToRecipeList = () => {
        navigate('/dashboard/recipes')
    }

  return (
    <div className='bg-listHeader p-5 m-4'>
        <div className='row'>
            <div className="col-md-6">
                <div>
                    <h4>Fill the <span className='color-list'>Recipes</span> !</h4>
                    <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
                </div>
            </div>
            <div className="col-md-6 text-end my-4">
                <div>
                    <button onClick={goToRecipeList} className='border-0 rounded-3 p-2 bg-list'>
                        All Recipes <i className='fa fa-arrow-right ms-2' aria-hidden='true'></i> 
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

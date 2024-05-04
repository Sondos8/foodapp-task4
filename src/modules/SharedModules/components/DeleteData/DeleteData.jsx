import React from 'react'
import nodata from '../../../../assets/images/no-data.png'

export default function DeleteData({ deleteItem }) {
  return (
    <>
      <div className='text-center'>
        <img src={nodata} alt=""/>
        <h5 className='mt-3'>Delete this {deleteItem} !</h5>
      <p className='mt-3'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
      </div>
    </>
  )
}

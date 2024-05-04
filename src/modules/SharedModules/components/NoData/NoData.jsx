import React from 'react'
import nodata from '../../../../assets/images/no-data.png'

export default function NoData() {
  return (
    <div className='text-center mt-5'>
        <img src={nodata} alt=""/>
        <h4>No Data !</h4>
        <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}

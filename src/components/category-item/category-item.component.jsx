import React from 'react'
import './category-item.styles.scss'



function categoryItem({ category }) {

    const { title, imageUrl } = category; 

  return (

        <div className='category-container'>
          <div 
            className='background-image' 
            style={{
              background: `url(${imageUrl})`
            }} 
          />
          <div className='category-body-container'>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div> 
        </div>

  )
}

export default categoryItem

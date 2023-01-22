import React from 'react'
import CategoryItem from '../category-item/category-item.component'

import './directory.styles.scss'



export default function directoryComponent({ categories }) {

  return (

    <div className='directory-container'>
      {categories && categories.map((category) => (
        <CategoryItem 
          key={category.id} 
          category={category} 
        />
      ))}
    </div>

  )
}

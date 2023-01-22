import React from 'react'
import DirectoryComponent from '../../components/directory/directory.component'

import { Outlet } from 'react-router-dom'


function HomeComponent() {

    const categories = [
        {
          "id": 1,
          "title": "hats",
          "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
        },
        {
          "id": 2,
          "title": "jackets",
          "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
        },
        {
          "id": 3,
          "title": "sneakers",
          "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
        },
        {
          "id": 4,
          "title": "womens",
          "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
        },
        {
          "id": 5,
          "title": "mens",
          "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
        }
      ]

    return (

        <div>
            <Outlet />
            <DirectoryComponent categories={categories} />
        </div>

    )
}

export default HomeComponent

// Note: 
    // "Outlet" specifies where the child will render on the page, 
    // here it will render above "Directory" if child route matches.
    // If we move the "Outlet" below the directory it will render below..
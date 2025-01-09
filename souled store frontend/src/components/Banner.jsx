import React from 'react'
import Item2Image from '../images/banner.webp';
const Banner = () => {
  return (
    <div>
        <div className="max-w-full"> 
    <img src={Item2Image} alt="Item 2" className="mb-2  h-auto object-cover rounded" />
    </div>
    </div>
  )
}

export default Banner
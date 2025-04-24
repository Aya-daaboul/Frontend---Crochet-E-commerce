import React from 'react'
import '../css/productsec.css'
import { Link } from 'react-router-dom'
import keychain from '../assets/keychain.png'
import amigurumi from '../assets/amigurumi.png'
import flower from '../assets/flower.png'
import coaster from '../assets/coaster.png'
import bag from '../assets/bag.png'
const ProductsSec = () => {
  return (
    <div className='products-sec-container'>
            <p className='title-center pin'>Our Products</p>
        
        <div className='products-wrapper'>
        <div className='product-category-section'>
            <img src={bag}></img>
            <div className='category_type_white_dash'>
            Bags & Pouches
            </div>
        </div>

        <div className='product-category-section'>
            <img src={keychain}></img>
            <div className='category_type_white_dash'>
                Key Chains
            </div>
        </div>

        <div className='product-category-section'>
            <img src={amigurumi}></img>
            <div className='category_type_white_dash'>
                Amigurumi
            </div>
        </div>

        <div className='product-category-section'>
            <img src={flower}></img>
            <div className='category_type_white_dash'>
                Bouquet
            </div>
        </div>

        <div className='product-category-section'>
            <img src={coaster}></img>
            <div className='category_type_white_dash'>
                Mug Coasters
            </div>
        </div>
        </div>

        <button className='button-pink'>
        <Link to='/Signup'>
          Explore More &nbsp; &#8594;
        </Link>
      </button>
    </div>

  )
}

export default ProductsSec

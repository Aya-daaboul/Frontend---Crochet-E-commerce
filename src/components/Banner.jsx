import React from 'react'
import '../css/banner.css'
import { Link } from 'react-router-dom'
import rat from '../assets/ratmain.png'

const Banner = () => {
  return (
    <div className='banner-container'>

        <div className='banner-content-text'>

            <p className='first-title pin'>
                Crocheted Masterpieces 
            </p>

            <p className='pin great-vibes--wild'>
                That Click!
            </p>

            <p className='last-title-cta'>
             Made by hand, felt by heart.
            </p>

            <button className='button-filled-pink'>

                <Link to='/Signup'>
                Sign Up Now!
                </Link>

            </button>

        </div>

        <div className='banner-content-image'>
            <img src={rat} alt='crocheted-mosieur-rat'></img>
        </div>
      
    </div>
  )
}

export default Banner

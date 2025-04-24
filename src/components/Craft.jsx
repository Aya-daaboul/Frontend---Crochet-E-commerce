import React from 'react'
import { Link } from 'react-router-dom'
import yarn from '../assets/heavenly_yarn.png'
import '../css/craft.css'

const craft = () => {
  return (
    <div className='final_main_section'>

        <div className='left_final_sec'>
            <img src={yarn}></img>
        </div>

        <div className='right_final_sec'>
            <p className='pin craft_cta'>Crafted with care, stitched with style</p>

            <button className='button-pink'>
                <Link to='/Signup'>Discover our Creation &nbsp; &#8594;</Link>
            </button>

        </div>

      
    </div>
  )
}

export default craft

import React from 'react';
import '../css/servicessec.css'
import hat from '../assets/hat.png';
import yarn from '../assets/yarnhook.png';
import hook from'../assets/twohooks.png'
const ServicesSec = () => {
  return (
    <div className='services-sec-container'>
      <p className='services-title'>
        Our <span className='great-vibes--huge pin'>Services</span>
      </p>

      <div className='services-sec-wrapper'>
        <div className='services-card'>
          <img src={hat}></img>
          <p> Handmade Crochet Goods</p>
        </div>

        <div className='services-card'>
          <img src={yarn}></img>
          <p> Custom Crochet Creations</p>
        </div>

        <div className='services-card'>
          <img src={hook}></img>
          <p> 1-1 Crochet Sessions</p>
        </div>

      </div>

      <button className='button-pink'>Explore Services&nbsp; &#8594;</button>
    </div>
  );
};

export default ServicesSec;

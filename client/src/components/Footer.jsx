import React from 'react'
import Logo from '../images/Logo.png'


const Footer = () => {
  return (
    <div className='footer'>
      <img style={{
        width: "150px",
        height: "65px"
      }} src={Logo} alt="" />
      <span>Copy Right Reserved 2023</span>
    </div>
  )
}

export default Footer

import React from 'react'
import { NavLink } from 'react-router-dom'

import { Logo } from '../assets/img/index'
import { FaCrown } from 'react-icons/fa'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'

const Header = () => {
  return (
    <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
      <NavLink to={"/"}>
         <img src={Logo} alt="logo" className='w-16' />
      </NavLink>

      <ul className='flex items-center justify-center ml-7'>
        <li className='mx-5 text-lg'><NavLink to={'/home'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
        <li className='mx-5 text-lg'><NavLink to={'/music'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles} >Musics</NavLink></li>
        <li className='mx-5 text-lg'><NavLink to={'/premium'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Premium</NavLink></li>
        <li className='mx-5 text-lg'><NavLink to={'/contact'} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles} >Contact Us</NavLink></li>
      </ul>


      <div className='flex items-center ml-auto cursor-pointer gap-2 relative'>
        <img src="" alt="image" className='w-12 min-w-[44px] object-cover rounded-full shadow-lg ' />
        <div className='flex flex-col'>
          <p className='text-textColor text-lg hover:text-headingColor fonts-semibold'>Username</p>
          <p className='flex items-center gap-2 text-xs text-grey-500 font-normal'>Premium Member. <FaCrown className='text-sm -ml-1 text-yellow-500'/></p>
        </div>
      </div>


    </header>
  )
}

export default Header
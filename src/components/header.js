import React, { useState } from 'react'

import { BiChevronLeft } from 'react-icons/bi';
import rigthImg from '../assests/images/admin-nav-ri.png'
import userDummy from '../assests/images/user-dummy.png'

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
   
  return (
    <header className='d-flex justify-content-between align-items-center border-bottom-1'>

          <div className='d-flex align-items-center'>
            <BiChevronLeft size={40} />
            <div className='d-flex align-items-center'>
              <img src={userDummy} width="60" height={60} />
              <h5 className='px-2'>{user.name}</h5>
            </div>

          </div>
          <div >
            <img src={rigthImg} />

          </div>
        </header>
  )
}

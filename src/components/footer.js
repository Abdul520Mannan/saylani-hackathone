import React from 'react'
import homeImage from '../assests/images/home-icon.png'
import addItemIcon from '../assests/images/add-item-icon.png'
import userPersonIcon from '../assests/images/user-person.png'

export default function ({handleChangePage}) {
    
    return (
        <footer>
            <div className='footer-wrapper'>
                <div className='footer-column' onClick={(e) => handleChangePage('/')}>
                    <img src={homeImage}></img>
                    <p>Home</p>
                </div>
                <div>
                    <div className='footer-column' onClick={(e) => handleChangePage('/admin/product')}>
                        <img src={addItemIcon}></img>
                        <p>Add Item</p>
                    </div>
                </div>
                <div>
                    <div className='footer-column' onClick={(e) => handleChangePage('/admin/setting')}>
                        <img src={userPersonIcon}></img>
                        <p>Account</p>
                    </div>
                </div>
                <div className='footer-column' onClick={(e) => handleChangePage('/admin/orders')}>
                    <img src={homeImage}></img>
                    <p>Orders</p>
                </div>
            </div>
        </footer>
    )
}

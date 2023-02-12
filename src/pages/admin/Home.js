import React, {  } from 'react'
import { Container } from 'react-bootstrap';
import appleImage from '../../assests/images/apple.png'


export default function AdminHome({ products }) {

  return (

    <>
      <Container >
        <h5 className='title'>All Products</h5>
        <div className='list-wrapper'>
          {products.map((item) => {
            return (
              <div className='list d-flex justify-content-between align-items-center'>
                <div className='list-left d-flex align-items-center'>
                  <img src={appleImage} className='list-image' />
                  <div className='list-title'>
                    <h6>{item.title}</h6>
                    <p>{item.weight}</p>
                  </div>
                </div>
                <div className='list-right'>
                  <div className='list-price'>{item.price}</div>
                </div>
              </div>
            );
          })
          }

        </div>
      </Container>
    </>
  );
}

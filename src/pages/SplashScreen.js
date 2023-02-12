import React from 'react'
import { Card, Container } from 'react-bootstrap'
import  Button  from 'react-bootstrap/Button'
import logo from '../assests/images/logo.png';
export default function SplashScreen() {
  return (
    <Container className='p-5'>
        <div className='wrapper-card'>
        <div className=''>
          <img src={logo} />
          <h3>SAYLANI WELFARE</h3>
          <p>ONLINE DISCOUNT STORE</p>
        </div>
        <Button variant='success' href='/login'>GET STARTED</Button>
        </div> 
    </Container>
  )
}

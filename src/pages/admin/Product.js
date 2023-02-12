import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import camIcon from '../../assests/images/cam-icon.png'
import { db, storage } from '../../firebase/firestore';
// import { Form } from 'react-router-dom'

export default function Product() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [weight, setWeight] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [validated, setValidated ] = useState();
  const handleImageInput = (event) => {
    // event.target
    // console.log();
    let imageUrl = URL.createObjectURL(event.target.files[0]);
    setImagePreview(imageUrl);
    setImage(event.target.files[0])
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      alert('Please Fill all inputs')
      return;
    }
    if(!image){
      alert("Please Chosse image First.");
      return;
    }
    const storageRef = ref(storage, `/files/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update progress
        // setPercent(percent);
      },
      (err) => console.log(err),
      async () => {
        try {
          const newItem = await addDoc(collection(db, 'products'), {
            title: name,
            description: description,
            weight: weight,
            price: price,
            image_url: ""
          });
          alert("Product is added");
          window.location.reload();
          // onClose()
        } catch (err) {
          alert(err)
        }
      }
    );
  }
  return (
    <Container >
      <h5 className='title'>Add New Item</h5>
      <Form method='POST' validated={validated} className='text-center pt-5' onSubmit={handleSubmit}>
        <Form.Group className='add-image-wrapper'>
          {
            imagePreview ?
              <Form.Label htmlFor='image-input' className='image-label'>
                <div className='image-icon'>
                  <img src={imagePreview} />
                </div>
                <div className='user-image'></div>
              </Form.Label>
              : <Form.Label htmlFor='image-input' className='image-label'>
                <div className='image-icon'>
                  <img src={camIcon} />
                </div>
                <div className='user-image'></div>
              </Form.Label>
          }

          <input type="file" onChange={handleImageInput} className='d-none' id="image-input" />
        </Form.Group>
        <Form.Group className='py-3 input-form'>
          <Form.Control type='text' name='title' onChange={(e) => setName(e.target.value)} placeholder='Product Title' />
        </Form.Group>
        <Form.Group className='product-description'>
          <Form.Control as='textarea' onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Product Description" />
        </Form.Group>
        <Form.Group className='py-3 input-form'>
          <Form.Control type='text' onChange={(e) => setWeight(e.target.value)} name='weight' placeholder='product weight with unit' />
        </Form.Group>
        <Form.Group className='py-3 input-form'>
          <Form.Control type='text' name='price' onChange={(e) => setPrice(e.target.value)} placeholder='product price with currency' />
        </Form.Group>
        <Button type='submit' variant='success'>Add Product</Button>
      </Form>
    </Container>
  )
}

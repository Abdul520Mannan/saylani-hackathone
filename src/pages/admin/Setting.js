import React, { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { BsCheck2 } from 'react-icons/bs'
import dummyImage from '../../assests/images/user-dummy.png'
import appleImage from '../../assests/images/apple.png';
import camIcon from '../../assests/images/cam-icon.png'
import { db, storage } from '../../firebase/firestore'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, doc, getDocs, orderBy, updateDoc } from 'firebase/firestore'

export default function Setting() {
  const [categoryName, setCategoryName] = useState();
  const [categories, setCategories] = useState();
  const [adminName, setAdminName] = useState();

  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [catImagePreview, setcatImagePreview] = useState();
  const [catImage, setCatImage] = useState();
  const [validated, setValidated] = useState();

  const handleAdminProfileImage = (event) => {
    let imageUrl = URL.createObjectURL(event.target.files[0]);
    setImagePreview(imageUrl);
    setImage(event.target.files[0]);
  }
  const user = JSON.parse(localStorage.getItem('user'));
  const handleUpdateName = async (event) => {
    // console.log(adminName != null);
    const taskDocRef = doc(db, 'users', user.id)
    if(!adminName){
      alert("Please fill name input")
      return;
    }
    if (user.data.name != adminName && adminName != null) {
      // console.log("ffe")
      try {
        await updateDoc(taskDocRef, {
          name: adminName,
        });
        // alert("update")
        // onClose()
      } catch (err) {
        alert(err)
      }
    }
  }

  const handleCategory = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      // setValidated(true);
      alert('Please Fill all inputs')
      return;
    }
    if (!catImage) {
      alert("Please Choose image First.");
      return;
    }
    const catstorageRef = ref(storage, `/files/${catImage.name}`);

    const uploadTask = uploadBytesResumable(catstorageRef, image);
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
          const newItem = await addDoc(collection(db, 'category'), {
            title: categoryName,
            // description: description,
            // weight: weight,
            // price: price,
            // image_url: ""
          });
          alert("category is added");
          window.location.reload();
          // onClose()
        } catch (err) {
          alert(err)
        }
      }
    );
  }

  const handleCatImageInput = (event) => {

    let imageUrl = URL.createObjectURL(event.target.files[0]);
    setcatImagePreview(imageUrl);
    setCatImage(event.target.files[0]);

  }

  const getCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "category"), orderBy('created', 'desc'));
    let data = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      data.push(doc.data())
    });
    // console.log(data);
    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, [])
  return (
    <Container>

      <div>
        <div className='admin-profile'>
          <h4 className='py-5'>Settings</h4>
          <Form.Label htmlFor='admin-profile-image'>
            {
              imagePreview ? <img src={imagePreview} className="profile-image" /> :
                <img src={dummyImage} className="profile-image" />
            }

          </Form.Label>
          <input type='file' onChange={handleAdminProfileImage} id="admin-profile-image" className='d-none' />
          <InputGroup className="mb-2 profile-name">
            <Form.Control defaultValue={adminName} id="user-update-name" onChange={(e) => setAdminName(e.target.value)} placeholder="Update User Name" />
            <Button variant='text' onClick={handleUpdateName}><BsCheck2 color='green' size={30} /></Button>
          </InputGroup>
        </div>
        <div>
          <Form method='POST' validated={validated} className='text-center pt-5' onSubmit={handleCategory}>
            <Form.Group className='add-image-wrapper'>
              {
                catImagePreview ?
                  <Form.Label htmlFor='image-input' className='image-label'>
                    <div className='image-icon'>
                      <img src={catImagePreview} />
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

              <input type="file" onChange={handleCatImageInput} className='d-none' id="image-input" />
            </Form.Group>
            <Form.Group className='category-image-input'>
              <Form.Control type='text' onChange={(e) => setCategoryName(e.target.value)} />
              <Button type='submit' variant='success'>ADD</Button>
            </Form.Group>
          </Form>
        </div>
        <div className='category-list-container'>
          <h5 className='title'>All Categories</h5>
          <div className='category-lists-wrapper'>
            {
              !categories ? <></> :
                categories.map((item) => {
                  return (
                    <div className='category-list'>
                      <img src={appleImage} className="category-list-image" />
                      <h5>{item.title}</h5>
                    </div>
                  );
                })
            }

          </div>
        </div>
      </div>
    </Container>
  )
}

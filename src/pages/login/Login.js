
import { Button, Card, Col, Form, Row } from "react-bootstrap";
// import img from "./../assets/images/BGImage2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { auth } from "../fire";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from "../../firebase/firestore";
import { collection, doc, where, query, onSnapshot, getDocs } from "@firebase/firestore";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [validated, setValidated] = useState(false);
    // const [errorMsg, ssetErrorMsg] = useState("");
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        // const userCollectionRef = collection(db, 'users');
        const getUss = async () => {
            const q = query(collection(db, "users"), where("email", "==", email));
            
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            // onSnapshot(querySnapshot, (doc)=>{
            //     console.log(doc)
            // })
            let user = '';
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                user = {"id": doc.id, "data": doc.data()};
            });
            localStorage.setItem("user",JSON.stringify(user));
            // console.log(user.role)
            if(user.data.role === 'admin'){
                navigate('/admin/home');
            }else{
                navigate('/user/home')
            }
            
        }

        signInWithEmailAndPassword(auth, email, password).then((user) => {
            if (user) {
                getUss();
            }
        }).catch((error) => alert("user Not found"));

    }

    return (

        <div className="container login-container">
            <Row className="align-items-center justify-content-center">
                <Col md={12}>
                    <Card className="text-center m-auto">
                        <Card.Header className="border-0">
                            <Card.Title as='h5'>SAYLANI WELFARE</Card.Title>
                            <Card.Subtitle>ONLINE DISCOUNT STORE</Card.Subtitle>
                        </Card.Header>

                        <Card.Body>
                            <Form id='loginForm'
                                noValidate
                                validated={validated}
                                className="text-start"
                                onSubmit={onSubmitHandler}>
                                <Form.Group className="mb-3 ">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setEmail(e.target.value)}
                                        name='email'
                                        type='email'
                                        placeholder='Enter email'
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter User Name.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3 ">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setPassword(e.target.value)}
                                        name='password'
                                        type="password"
                                        placeholder="Enter Password"
                                        required />

                                    <div className='my-2' ></div>

                                    <div className="d-flex justify-content-start links">
                                        <a href="javascript:void(0)">Forgot your password?</a>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex justify-content-center" >
                                    <Button variant="success"
                                        // disabled={buttonDisabled} 
                                        type="submit" className="btn-submit">Login</Button>
                                </Form.Group>
                                {/* <Form.Group className="mb-3 text-center socails-login-button">
                                    <button type="button" onClick={handleFacebookLogin}><GrFacebook style={{ color: 'white' }} /></button>
                                    <button type="button" onClick={handleGoogleLogin}><FcGoogle /></button>
                                </Form.Group> */}
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-center border-0">
                            <div className="">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account? <Link to={'/signup'} className="ml-2"> Sign Up</Link>
                                </div>
                            </div>
                        </Card.Footer>

                    </Card>
                </Col>
            </Row>

        </div>
    );
}

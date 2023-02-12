import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../../firebase/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const [validated, setValidated] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    // const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setButtonDisabled(true);
        if (form.checkValidity() === false) {

            event.stopPropagation();
            setButtonDisabled(false);
            setValidated(true);
            return;
        }
        // auth.currentUser.
        createUserWithEmailAndPassword(auth, email, password).then(async () => {
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    name: name,
                    email: email,
                    password: password,
                    role: "user",
                });
                navigator('/login');
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }

        }).catch((error)=>{
            
            console.log(error.message);
            setValidated(false);
        });

    }
    return (
        <div className="container signup-container">
            <Row className="justify-content-center align-items-center">
                <Col md={12}>
                    <Card className="text-center m-auto">
                        <Card.Header className="border-0">
                            <Card.Title as='h5'>Sign up</Card.Title>
                        </Card.Header>

                        <Card.Body>
                            <Form id='signupForm' noValidate
                                validated={validated} className="text-start" onSubmit={onSubmitHandler}>
                                <Form.Group className="mb-3 ">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setName(e.target.value)}
                                        name='name'
                                        type='text'
                                        placeholder='Enter Full Name'
                                        required />
                                </Form.Group>

                                <Form.Group className="mb-3 ">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setEmail(e.target.value)}
                                        name='email' type="email" placeholder="Enter email" required />

                                    <div className='my-2' />
                                    <Form.Control.Feedback type="invalid">
                                        email already in use
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <Form.Group className="mb-3 ">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={(e) => setPassword(e.target.value)}
                                        name='email' type="password" placeholder="Enter Password" required />

                                    <div className='my-2' />

                                </Form.Group>
                                <Form.Group className="mb-3 ">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                        name='email' type="password" placeholder="Enter Password Again" required />

                                    <div className='my-2' />

                                </Form.Group>
                                <Form.Group className="mb-3 d-flex justify-content-center" >
                                    <Button type="submit" variant="success" name="button" className="btn-submit">Sign Up</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-center border-0">
                            <div className="">
                                <div className="d-flex justify-content-center links">
                                    Already have an account? <Link to={'/login'} className="ml-2"> Login</Link>
                                </div>
                            </div>
                        </Card.Footer>

                    </Card>
                </Col>
            </Row>

        </div>
    );

}
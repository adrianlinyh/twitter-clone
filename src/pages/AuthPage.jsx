import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
// import axios from 'axios';
// import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";


export default function AuthPage() {
    const loginImage = 'https://sig1.co/img-twitter-1';
    // const url = 'https://49dd66e9-a7f0-43cb-a5f8-f677c48cb07e-00-nx2gszn39zn3.riker.replit.dev'
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow('SignUp');
    const handleShowLogin = () => setModalShow('Login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [authToken, setAuthToken] = useLocalStorage('authToken', '');

    const navigate = useNavigate();

    const auth = getAuth();
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate('/profile');
        
    }, [currentUser, navigate]);


    const handleSignUp = async (e) => {
        // console.log(username)
        // console.log(password)
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
        } catch (error) {
            console.error(error);
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async(e) => {
        e.preventDefault();
        try{
            await signInWithPopup(auth, provider);
        } catch(error) {
            console.error(error);
        }
    }

    const handleClose=() => setModalShow(null);

    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className='p-4'>
                <i className='bi bi-twitter' style={{ fontSize:50, color: 'dodgerblue' }}></i>

                <p className='mt-5' style={{ fontSize: 64 }}>Happening Now</p>
                <h2 className='my-5' style={{ fontSize: 31 }}>Join Twitter Today.</h2>

                <Col sm={5} className='d-grid gap-2'>
                    <Button className='rounded-pill' variant='outline-dark' onClick={handleGoogleLogin}>
                        <i className='bi bi-google'></i> Sign up with Google
                    </Button>
                    <Button className='rounded-pill' variant='outline-dark'>
                        <i className='bi bi-apple'></i> Sign up with Apple
                    </Button>
                    <Button className='rounded-pill' variant='outline-dark'>
                        <i className='bi bi-facebook'></i> Sign up with Facebook
                    </Button>
                    <p style= {{ textAlign: 'center' }}>or</p>
                    <Button className='rounded-pill' onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{fontSize: '12px'}}>
                        By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use
                    </p>

                    <p className='mt-5' style= {{ fontWeight: 'bold' }}>
                        Already have an account?
                    </p>
                    <Button className='rounded-pill' variant='outline-primary' onClick={handleShowLogin}>Sign In</Button>
                </Col>
                <Modal 
                show={modalShow !== null}
                onHide={handleClose} 
                animation={false}
                centered
                >
                    <Modal.Body>
                        <h2 className='mb-4' style={{ fontWeight: 'bold' }}>
                            {modalShow === 'SignUp'
                            ? 'Create An Account'
                            : 'Log In'}
                        </h2>
                        <Form 
                        className = 'd-grid gap-2 px-5' 
                        onSubmit={modalShow === 'SignUp' ? handleSignUp : handleLogin}
                        >
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Control 
                                onChange={(e) => setUsername(e.target.value)}
                                type='email'
                                placeholder='Enter Username'
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Control 
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                placeholder='Password'
                                />
                            </Form.Group>
                            <p style={{ fontSize: '12px' }}>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. 
                            </p>

                            <Button className='rounded-pill' type='submit'>
                                {modalShow === 'SignUp' ? 'Sign Up' : 'Log In'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </Col>
        </Row>
    );
}
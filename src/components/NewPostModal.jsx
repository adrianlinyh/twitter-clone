// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { savePost } from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";

export default function NewPostModal({show, handleClose}) {
     const [postContent, setPostContent] = useState('');
     const [file, setFile] = useState(null);
     const dispatch = useDispatch();
     const {currentUser} = useContext(AuthContext);
     const userId = currentUser.uid;

     const handleSave = () => {
    //     //get stored jwt token
    //     const token = localStorage.getItem('authToken');

    //     // decode token to fetch user id
    //     const decode = jwtDecode(token);
    //     const userId = decode.id // changes depending on how server encodes token

    //     const data = {
    //         title: 'Post Title', // add functionality to set this properly
    //         content: postContent,
    //         user_id: userId,
    //     };

    //     // make API call here
    //     axios
    //     .post('https://7a372e95-dd91-4720-a5cc-8876034a1357-00-p6njqpldbln2.spock.replit.dev/posts', data)
    //     .then((response) => {
    //         console.log('Success:', response.data);
    //         handleClose();
    //     })
    //     .catch((error) => {
    //         console.error('Error', error);
    //     });
    //  }


    dispatch(savePost({userId, postContent, file}));
    handleClose();
    setPostContent('');
    setFile(null);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

     return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId='postContent'>
                        <Form.Control
                            placeholder = 'What is happening?'
                            as='textarea'
                            rows={3}
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                        <br />
                        <Form.Control type = 'file' onChange = {handleFileChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' className='rounded-pill' onClick={handleSave}>Tweet</Button>
            </Modal.Footer>
        </Modal>
        </>
     )
}
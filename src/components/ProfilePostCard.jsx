import { useContext, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import { useDispatch } from "react-redux";
import { deletePost, likePost, removeLikeFromPost } from "../features/posts/postsSlice";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({post}) {
    const [likes, setLikes] = useState(post.likes || []);
    const { content, id:postId, imageUrl } = post;
    const dispatch = useDispatch();
    const {currentUser} = useContext(AuthContext);
    const userId = currentUser.uid;

    const isLiked = likes.includes(userId)
    const pic='https://avatars.githubusercontent.com/u/171110461?v=4';

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    // useEffect(() => {
    //     // fetch(
    //     //     `https://7a372e95-dd91-4720-a5cc-8876034a1357-00-p6njqpldbln2.spock.replit.dev/likes/post/${postId}`
    //     // )
    //     fetch(
    //         `${BASE_URL}/likes/post/${postId}`
    //     )
    //     .then((response) => response.json())
    //     .then((data) => setLikes(data))
    //     .catch((error) => console.error('Error:', error));
    // }, [postId]);
    
    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

    const addToLikes = () => {
        setLikes([...likes, userId]);
        dispatch(likePost({ userId, postId }));
    };

    const removeFromLikes = () => {
       setLikes(likes.filter((id) => id !== userId ));
       dispatch(removeLikeFromPost({userId, postId}));
    };

    const handleDelete = () => {
        dispatch(deletePost({ userId, postId }));
    };

    return(
        <Row
        className='p-3'
        style={{
            borderTop: '1px solid #D3D3D3',
            borderBottom: '1px solid #D3D3D3'
        }}
        >
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Adrian Lin</strong>
                <span>@a.lin  ·  Jul 14</span>
                <p>{content}</p>
                <Image src = {imageUrl} style={{ width : 150 }} />
                <div className = 'd-flex justify-content-between'>
                    <Button variant='light'>
                        <i className='bi bi-chat'></i>
                    </Button>
                    <Button variant='light'>
                        <i className='bi bi-repeat'></i>
                    </Button>
                    <Button variant='light' onClick={handleLike}>
                        {isLiked ? (
                        <i className='bi bi-heart-fill text-danger'> </i>
                        ) : (
                            <i className='bi bi-heart'> </i>
                        )}
                         {likes.length}
                    </Button>
                    <Button variant='light'>
                        <i className='bi bi-graph-up'></i>
                    </Button>
                    <Button variant='light'>
                        <i className='bi bi-upload'></i>
                    </Button>
                    <Button variant= 'light'>
                        <i className ='bi bi-pencil-square' onClick={handleShowUpdateModal}></i>
                    </Button>
                    <Button variant = 'light'>
                        <i className= 'bi bi-trash' onClick= {handleDelete}></i>
                    </Button>
                    <UpdatePostModal show={showUpdateModal} handleClose={handleCloseUpdateModal} postId={postId} originalPostContent={content} />
                </div>
            </Col>
        </Row>
    )
}
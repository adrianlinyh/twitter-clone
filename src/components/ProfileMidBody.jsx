import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
// import { jwtDecode } from "jwt-decode";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { fetchPostsByUser } from "../features/posts/postsSlice";
// import { fetchPostsByUser } from "../features/posts/postsSlice";

export default function ProfileMidBody(){
    // const [posts, setPosts] = useState([]);
    const url = 'https://rerouting.ca/wp-content/uploads/2021/03/Simple-Technology-LinkedIn-Banner.png';
    const pic = 'https://avatars.githubusercontent.com/u/171110461?v=4';

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.loading);
    const {currentUser} = useContext(AuthContext);

    //fetch post based on user id

    // const fetchPosts = (userId) => {
    //     fetch(
    //         `https://7a372e95-dd91-4720-a5cc-8876034a1357-00-p6njqpldbln2.spock.replit.dev/posts/user/${userId}`
    //     )

    //     .then((response) => response.json())
    //     .then((data) => setPosts(data))
    //     .catch((error) => console.error('Error:', error));
    // };

    useEffect(() => {
        dispatch(fetchPostsByUser(currentUser.uid));
    }, [dispatch, currentUser]);

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         const userId = decodedToken.id;
    //         dispatch(fetchPostsByUser(userId));
    //     }
    // }, [dispatch]);
    //         fetchPosts(userId);
    //     }
    // }, []);
    
    return(
        <Col sm={6} className='bg-light' style={{border: '1px solid lightgrey'}}>
            <Image src={url} fluid />
            <br />
            <br />

            <Image
            src={pic}
            roundedCircle
            style={{
                width: 150,
                position: 'absolute',
                top: '140px',
                border: '4px solid #F8F9FA',
                marginLeft: 15,
            }}
            />
            <br />
           

            <Row className = 'justify-content-end'>
                <Col xs='auto'>
                    <Button className='rounded-pill mt-2' variant='outline-secondary'>
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p className='mt-5' style={{ margin: 0, fontWeight: 'bold', fontSize: '15px' }}>
                Adrian Lin
            </p>

            <p style={{ marginBottom: '2px' }}>@a.lin</p>

            <p>Enhancing my life one code at a time.</p>

            <p>Aspiring Software Developer</p>

            <p>
                <strong>271</strong> Following <strong>610</strong> Followers
            </p>

            <Nav variant = 'underline' defaultactivekeys='/home' justify>
                <Nav.Item>
                    <Nav.Link eventKey='/home'>Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='link-1'>Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='link-2'>Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='link-3'>Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='link-4'>Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {loading && (
                <Spinner animation = 'border' className='ms-3 mt-3' variant='primary' />
            )}

            {posts.map((post) => (
                <ProfilePostCard key={post.id} post = {post} />

            ))}
            
        </Col>
    )
}
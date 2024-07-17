import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import useLocalStorage from "use-local-storage";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";

export default function ProfilePage() {
   const auth = getAuth();
   const navigate = useNavigate();
   const {currentUser} = useContext(AuthContext);

   if (!currentUser) {
    navigate('/login');
   }

   const handleLogout = () => {
    auth.signOut();
   }

  return (
    <>
    <Container>
      <Row>
        <ProfileSideBar handleLogout={handleLogout} />
        <ProfileMidBody />
      </Row>
    </Container>
      {/* <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">
            <i
              className="bi bi-twitter"
              style={{ fontSize: 30, color: "dodgerblue" }}
            ></i>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <h2>Your profile</h2>
      </Container> */}
    </>
  );
}
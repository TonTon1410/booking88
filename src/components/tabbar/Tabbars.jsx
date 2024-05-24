import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from '../login/login';
import '../tabbar/Tabbar.css';
import LOGO from "../../assets/logo.jpg";

  function Tabbars() {
    return (
      <>
        <header className="header">
          <img src={LOGO} className="logo" />
          <nav className="navbar">
            <Link to="/login" className="login">Home</Link>
            <Link to="/login" className="login">About</Link>
            <Link to="/login" className="login">Portfolio</Link>
            <Link to="/login" className="login">Services</Link>
            <Link to="/login" className="login">Contact</Link>
            <Link to="/login" className="login">Login</Link>
            {/* <a.Link to="/login">Login</a.Link> */}
          </nav>
        </header>
      </>

    )
  }


// <Navbar expand="lg" className="bg-body-tertiary">
//   <Container fluid>
//     <Navbar.Brand href="#">BOOKING88</Navbar.Brand>
//     <Navbar.Toggle aria-controls="navbarScroll" />
//     <Navbar.Collapse id="navbarScroll">
//       <Nav
//         className="me-auto my-2 my-lg-0"
//         style={{ maxHeight: '100px' }}
//         navbarScroll
//       >
//         <Nav variant="tabs" defaultActiveKey="/">
//           <Nav.Link><Link to="/">Home</Link></Nav.Link>
//           <Nav.Link href="#action1">Home</Nav.Link>
//           <Nav.Link href="#action2">Link</Nav.Link>
//           <NavDropdown title="List" id="navbarScrollingDropdown">
//             <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//             <NavDropdown.Item href="#action4">
//               Another action
//             </NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item href="#action5">
//               Something else here
//             </NavDropdown.Item>
//           </NavDropdown>
//           <Nav.Link>
//             <Link to="/login" > Login</Link>               
//           </Nav.Link>
//         </Nav>
//       </Nav>
//       <Form className="d-flex">
//         <Form.Control
//           type="search"
//           placeholder="Search"
//           className="me-2"
//           aria-label="Search"
//         />
//         <Button variant="outline-success">Search</Button>
//       </Form>
//     </Navbar.Collapse>
//   </Container>
// </Navbar>


export default Tabbars;
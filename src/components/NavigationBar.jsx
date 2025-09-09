import { Container, Nav, Navbar } from "react-bootstrap"; // Keep React Bootstrap Navbar import
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/image.png";

function NavigationBar() {
  const navItems = ["Dashboard", "Contributions", "Goals"];

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      {/* <Container> */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            alt="NissMart Logo"
            className="d-inline-block align-center"
            width="50"
            height="50"
          />
          NisSavings
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " >
          <Nav className="me-auto justify-content-end">
            {navItems.map((item, index) => (
              <Nav.Link
                as={Link}
                key={index}
                to={item.toLowerCase()}
                className={({ isActive }) =>
                  `${isActive ? `font-bold` : `font-normal`}`
                }
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default NavigationBar;

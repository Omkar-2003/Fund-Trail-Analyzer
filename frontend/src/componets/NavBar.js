import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/img/logomain.png";
import Contact from "../componets/Contact";
export const NavBar = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  const [activelink, setActivelink] = useState("banner");
  const [scrolled, seScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        seScrolled(true);
      } else {
        seScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActivelink(value);
  };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#banner">
          <img
            src={logo}
            alt="logo"
            style={{
              position: "relative",
              top: "22px",
              height: "50px",
              width: "50px",
              left: "0px",
            }}
          />
          <p
            style={{
              position: "relative",
              color: "#000",
              top: "-32px",
              fontWeight: "900",
              fontSize: "15px",
              left: "90px",
            }}
          >
            KuberNetra
          </p>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            href="#Dashboard"
            className={
              activelink === "skills" ? "active navbar-link" : "navbar-link"
            }
            onClick={() => handleClick("/home")}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            href="#about"
            className={
              activelink === "about" ? "active navbar-link" : "navbar-link"
            }
            onClick={() => handleClick("./about")}
          >
            About us{" "}
          </Nav.Link>
          <Nav.Link
            href="#contact"
            className={
              activelink === "contact" ? "active navbar-link" : "navbar-link"
            }
            onClick={() => handleClick("./contact")}
          >
            Contact Us{" "}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

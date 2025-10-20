import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const NavbarTop = () => {
    const navigate = useNavigate();

    function navigateLogOut () {
        navigate("/login");
    }

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container fluid>
                <Navbar.Brand className="navbar-title">Admin Dashboard</Navbar.Brand>
                <Button variant="outline-danger" onClick={navigateLogOut}>Log Out</Button>
            </Container>
        </Navbar>
    );
};

export default NavbarTop;

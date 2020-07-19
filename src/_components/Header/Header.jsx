import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import  './Header.scss';

export default class Header extends React.Component{

    constructor(props){
        super(props)
    }


    render(){
        const username = "Hello " + this.props.username;
        return (
            <Navbar expand="lg" className="justify-content-between navbar-bg">
            <Navbar.Brand href="#home">WeightTracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Weights" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#addWeight/3.1">Add</NavDropdown.Item>
                    <NavDropdown.Item href="#editWeight/3.2">Edit</NavDropdown.Item>
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                </NavDropdown>
                </Nav>
                <Nav>
                <NavDropdown title={username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#profile">
                    <AccountCircleIcon/>
                </Nav.Link>
                </Nav>
                </Navbar.Collapse>

            </Navbar>
        )
    }
}

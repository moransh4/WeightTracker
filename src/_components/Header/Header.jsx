import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import  './Header.scss';
import {AddWeights} from '../AddWeights/AddWeights';
import {Welcome} from '../Welcome/Welcome';
import { history } from '../../_helpers';
import { Route, Redirect, Switch, Router, Link, useRouteMatch  } from 'react-router-dom';

export default class Header extends React.Component{
    constructor(props){
        super(props)     
        // const {url, path} =  useRouteMatch();
        // this.setState = {
        //     url : url
        // }
    }  

    render(){
        const name = this.props.username;
        const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
        const hello = "Hello " + nameCapitalized;
        const url = this.state.url;
        debugger
        return (
            <Navbar expand="lg" className="justify-content-between navbar-bg">
            <Navbar.Brand href="#home">WeightTracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Weights" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/addWeight">Add</NavDropdown.Item>
                    <NavDropdown.Item href="/editWeight">Edit</NavDropdown.Item>
                    {/* <Link to={`${this.state.url}/addWeight`}>addWeight</Link>
                    <Link to="/editWeight">editWeight</Link> */}
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                </NavDropdown>
                </Nav>
                <Nav>
                <NavDropdown title={hello} id="basic-nav-dropdown">
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

import { Divider } from '@mui/material';
import React, { useEffect }  from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/actionCreators/authActionCreator';

function NavComp() {
    const dispatch = useDispatch();
    const histroy = useNavigate();   
    const pathname = window.location.pathname 

    const { isLoggedIn, user } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            user:state.auth.user,
    }), shallowEqual);
    
    const logout = (e) =>{
        e.preventDefault();
        dispatch(logoutUser());
        histroy("../", {replace:true});
    }
    
    return (
        <Navbar expand="lg" bg="white" style={{padding:0,zIndex:100, position:"fixed", top:0, right:0, left:0, color:"#000", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} >
            <Container fluid>
                 <Navbar.Brand href="/"><img style={{width:"90px", marginLeft:"3em"}} src="https://testbucketuta.s3.us-east-2.amazonaws.com/uta.jpeg"/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" variant='pills'>
                    { 
                        isLoggedIn 
                        &&
                        <>  
                            {
                                user.admin
                                &&
                                <>
                                    <Nav.Link href="/admin/checkout" className="navHover mx-4">Checkout</Nav.Link>
                                    <Divider className="my-3"/>
                                    <Nav.Link href="/admin/report" className="navHover mx-4">Report</Nav.Link>
                                    <Divider className="my-3"/>
                                    <Nav.Link href="/admin/data" className="navHover mx-4">Data Management</Nav.Link>
                                    <Divider className="my-3"/>
                                </>
                            }
                            <Nav.Link href="/profile" className="navHover mx-4">Profile</Nav.Link>
                            <Divider className="my-3"/>  
                            <Nav.Link href="/inventory" className="navHover mx-4">Inventory</Nav.Link>
                            <Divider className="my-3"/>
                            <Nav.Link href="/about" className="navHover mx-4">About</Nav.Link>
                            <Divider className="my-3"/>
                        </>
                    }
                </Nav>
                {
                    isLoggedIn
                    ?
                        <>
                            <Button type="submit" onClick={logout}  className="navHover mx-4" variant='ghost'>Logout</Button>
                            <Divider className="my-3"/>
                        </>
                    :
                        <>
                        {
                            pathname.includes("login") || pathname === "/"
                            ?
                                <>
                                    <Nav.Link href="/register" className="navHover mx-4">Register</Nav.Link>
                                    <Divider className="my-3"/>
                                </>
                            :
                                <>
                                    <Nav.Link href="/login" className="navHover mx-4">Login</Nav.Link>
                                    <Divider className="my-3"/>
                                </>
                        }
                        </>
                }
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavComp;
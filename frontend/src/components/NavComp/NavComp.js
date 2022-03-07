import { Divider } from '@mui/material';
import React, { useEffect }  from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, checkUser } from '../../redux/actionCreators/authActionCreator';
import uta from "./uta.jpeg"

function NavComp() {
    const dispatch = useDispatch();
    const histroy = useNavigate();    

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
        <Navbar expand={false} style={{padding: "5px",color:"#fff", borderRight:0}} >
        
             <Container fluid>
                 <Navbar.Brand href="/"><img style={{width:"85px"}} src="https://testbucketuta.s3.us-east-2.amazonaws.com/uta.jpeg"/></Navbar.Brand>
                        {   
                            isLoggedIn
                            ?
                                <Navbar.Toggle aria-controls="offcanvasNavbar" style={{border:0}}>{user.username}</Navbar.Toggle>
                            :
                                <Navbar.Toggle aria-controls="offcanvasNavbar" style={{border:0}}>Options</Navbar.Toggle>
                        }
                     <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">UTA CSE Lab</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        { 
                            isLoggedIn 
                            ?
                            <>  
                                {
                                    user.is_superuser
                                    ?
                                    <>
                                        <Nav.Item  style={{marginLeft:"15px"}}>
                                            <Nav.Link href="/admin/checkout" style={{color:"black"}}>Checkout</Nav.Link>
                                        </Nav.Item>
                                        <Divider style={{margin:"1rem"}}/>
                                        <Nav.Item  style={{marginLeft:"15px"}}>
                                            <Nav.Link href="/admin/report" style={{color:"black"}}>Report</Nav.Link>
                                        </Nav.Item>
                                        <Divider style={{margin:"1rem"}}/>
                                        <Nav.Item  style={{marginLeft:"1rem"}}>
                                            <Nav.Link href="/admin/add" style={{color:"black"}}>Data Management</Nav.Link>
                                        </Nav.Item>
                                        <Divider style={{margin:"1rem"}}/>
                                    </>
                                    :
                                    <></>
                                }
                                <Nav.Item  style={{marginLeft:"15px"}}>
                                    <Nav.Link href="/profile" style={{color:"black"}}>Profile</Nav.Link>
                                </Nav.Item>
                                <Divider style={{margin:"1rem"}}/>  
                                <Nav.Item  style={{marginLeft:"15px"}}>
                                    <Nav.Link href="/inventory" style={{color:"black"}}>Inventory</Nav.Link>
                                </Nav.Item>
                                <Divider style={{margin:"1rem"}}/>
                                <Nav.Item  style={{marginLeft:"1rem"}}>
                                    <Nav.Link href="/about" style={{color:"black"}}>About</Nav.Link>
                                </Nav.Item>
                                <Divider style={{margin:"1rem"}}/>  
                                <Nav.Item  style={{marginLeft:"1rem"}}>
                                    <Button type="submit" onClick={logout} variant='ghost'>Logout</Button>
                                </Nav.Item>
                            </>
                            :
                            <>
                                <Nav.Item  style={{marginLeft:"15px"}}>
                                    <Nav.Link href="/login" style={{color:"black"}}>Login</Nav.Link>
                                </Nav.Item>
                                <Divider style={{margin:"1rem"}}/>
                                <Nav.Item  style={{marginLeft:"1rem"}}>
                                    <Nav.Link href="/register" style={{color:"black"}}>Register</Nav.Link>
                                </Nav.Item>
                            </>
                        }
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default NavComp;
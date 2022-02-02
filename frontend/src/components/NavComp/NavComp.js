import { Divider } from '@mui/material';
import React, { useEffect }  from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { logoutUser, checkUser } from '../../redux/actionCreators/authActionCreator';
import uta from "./uta.jpeg"

function NavComp() {
    const dispatch = useDispatch();    

    const { isLoggedIn, user } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            user:state.auth.user,
    }), shallowEqual);

    useEffect(() => {
        if(!isLoggedIn){
            dispatch(checkUser());
        }
    }, [isLoggedIn,dispatch]);
    
    function logout(e){
        e.preventDefault();
        dispatch(logoutUser());
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
                                            <Nav.Link href="/admin/report" style={{color:"black"}}>Report</Nav.Link>
                                        </Nav.Item>
                                        <Divider style={{margin:"1rem"}}/>
                                        <Nav.Item  style={{marginLeft:"15px"}}>
                                            <Nav.Link href="/admin/manage" style={{color:"black"}}>Manage</Nav.Link>
                                        </Nav.Item>
                                        <Divider style={{margin:"1rem"}}/>
                                        <Nav.Item  style={{marginLeft:"1rem"}}>
                                            <Nav.Link href="/admin/add" style={{color:"black"}}>Add</Nav.Link>
                                        </Nav.Item>
                                        <Divider style={{margin:"1rem"}}/>
                                    </>
                                    :
                                    <></>
                                }
                                <Nav.Item  style={{marginLeft:"1rem"}}>
                                    <Nav.Item type="submit" onClick={logout}>Logout</Nav.Item>
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
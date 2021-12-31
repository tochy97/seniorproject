import React, { useEffect }  from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { logoutUser, checkUser } from '../redux/actionCreators/authActionCreator';

function NavComp(props) {
    const dispatch = useDispatch();    

    const { isLoggedIn, username } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            username:state.auth.username,
    }), shallowEqual);

    useEffect(() => {
        if(!username){
            dispatch(checkUser());
        }
    }, [username,dispatch]);
    
    function logout(e){
        console.log("logginout")
        e.preventDefault();
        dispatch(logoutUser());
    }
    return (
        <Navbar bg="light" expand={false} variant="light" style={{padding: "20px",color:"#fff", borderRight:0}} >
        <Container fluid>
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" style={{border:0}}>Options</Navbar.Toggle>
            <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            >
            <Offcanvas.Header closeButton>
                {   
                    isLoggedIn
                    ?
                        <Offcanvas.Title id="offcanvasNavbarLabel">Hello, {username}</Offcanvas.Title>
                    :
                        <Offcanvas.Title id="offcanvasNavbarLabel">Hello, guest</Offcanvas.Title>
                }
            </Offcanvas.Header>
            <Offcanvas.Body>
                { 
                    isLoggedIn 
                    ?
                    <>  
                        <Nav.Item  style={{marginLeft:"1rem"}}>
                            <Nav.Item variant="dark" type="submit" onClick={logout}>Logout</Nav.Item>
                        </Nav.Item>
                    </>
                    :
                    <></>
                }
            </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
        </Navbar>
    );
}

export default NavComp;
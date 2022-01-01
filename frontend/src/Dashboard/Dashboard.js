import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Button, Card, Container } from 'react-bootstrap';
import { checkUser } from '../redux/actionCreators/authActionCreator';
import { Link } from 'react-router-dom';

function Dashboard() {
    const dispatch = useDispatch();    
  
    const { isLoggedIn, id } = useSelector(
      (state) =>({
        isLoggedIn:state.auth.isLoggedIn, 
        id:state.auth.user_id
    }), shallowEqual);
  
    useEffect(() => {
        if(!isLoggedIn){
            dispatch(checkUser());
        }
    }, [isLoggedIn,dispatch]);

    return (
        <Container>
            <h1>You are logged in</h1>
            <Link to="/profile" className='m-5'><Button as="Nav">View Profile</Button></Link>
            <Link to="/checkout" className='m-5'><Button as="Nav">Checkout Item</Button></Link>
            <Link to="/setaccount" className='m-5'><Button as="Nav">Confirm Account</Button></Link>
        </Container>
    );
}

export default Dashboard;
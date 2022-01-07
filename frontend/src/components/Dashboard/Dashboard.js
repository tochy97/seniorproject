import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Dashboard() {
    const dispatch = useDispatch();    
  
    const { isLoggedIn, id, status } = useSelector(
      (state) =>({
        isLoggedIn:state.auth.isLoggedIn, 
        id:state.auth.user_id
    }), shallowEqual);

    return (
        <Container>
            <Card className='m-2'>
                <Link to="/checkout" className='m-5'><Button as="Nav">Checkout Item</Button></Link>
                <Link to="/profile" className='m-5'><Button as="Nav">View Profile</Button></Link>
            </Card>
        </Container>
    );
}

export default Dashboard;
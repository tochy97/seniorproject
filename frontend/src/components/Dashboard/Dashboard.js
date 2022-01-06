import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Button, Card, Container } from 'react-bootstrap';
import { checkUser } from '../../redux/actionCreators/authActionCreator';
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
            <Card className='m-2'>
            <Link to="/checkout" className='m-5'><Button as="Nav">Checkout Item</Button></Link>
            </Card>
            <Card className='m-2'>
                <Link to="/profile" className='m-5'><Button as="Nav">View Profile</Button></Link>
                <Link to="/confirmaccount" className='m-5'><Button as="Nav">Confirm Account Information</Button></Link>
            </Card>
        </Container>
    );
}

export default Dashboard;
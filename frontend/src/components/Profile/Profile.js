import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Card, Container } from 'react-bootstrap';
import { checkUser } from '../../redux/actionCreators/authActionCreator';

function Profile() {
    const dispatch = useDispatch();    

    const { isLoggedIn, user } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            user:state.auth.user,
    }), shallowEqual);

    return (
        <Container>
            <Card>
                <h1 className='text-center'>{user.username}</h1>
            </Card>
        </Container>
    );
}

export default Profile;
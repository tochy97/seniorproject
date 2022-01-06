import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Card, Container } from 'react-bootstrap';
import { checkUser } from '../../redux/actionCreators/authActionCreator';

function Profile() {
    const dispatch = useDispatch();    

    const { isLoggedIn, username } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            username:state.auth.username,
    }), shallowEqual);

    useEffect(() => {
        if(!isLoggedIn){
            dispatch(checkUser());
        }
    }, [isLoggedIn,dispatch]);

    return (
        <Container>
            <Card>
                <h1 className='text-center'>{username}</h1>
            </Card>
        </Container>
    );
}

export default Profile;
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

function Profile() {
    const dispatch = useDispatch();    

    const { isLoggedIn, user } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            user:state.auth.user,
    }), shallowEqual);

    return (
        <Container>
            <Card className='p-5'>
                <h1 className='text-center'>ID: {user.username}</h1>
                <h1 className='text-center'>First Name: {user.first_name}</h1>
                <h1 className='text-center'>Last Name: {user.last_name}</h1>
                <h1 className='text-center'>Email: {user.email}</h1>
                {
                    user.is_superuser
                    ?
                    <></>
                    :
                    <>
                        <h1 className='text-center'>Section: {user.username}</h1>
                        <h1 className='text-center'>Team: {user.username}</h1>
                        <h1 className='text-center'>Instructor: {user.username}</h1>
                    </>
                }
                <Link to="/confirmaccount" className='m-5 text-center'><Button as="Nav">Change Account Information</Button></Link> 
            </Card>
        </Container>
    );
}

export default Profile;
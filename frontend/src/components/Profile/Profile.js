import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { fetchMyInstructor } from '../../redux/actionCreators/accountActionCreators';
import Loading from '../Loading/Loading';

function Profile() {
    const dispatch = useDispatch();    

    const { isLoggedIn, user, account, myInstructor } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            user:state.auth.user,
            account:state.account.data,
            myInstructor:state.account.myInstructor
    }), shallowEqual);
    
    useEffect(() => {
        if(account){
            if(!myInstructor){
                dispatch(fetchMyInstructor(account.instructor));
            }
        }
    }, [dispatch, myInstructor, account])
    return (
        <Container>
            <Card className='p-5'>
                {
                    
                    user.first_name
                    ?
                    <>
                        <h1 className='text-center'>ID: {user.username}</h1>
                        <h1 className='text-center'>First Name: {user.first_name}</h1>
                        <h1 className='text-center'>Last Name: {user.last_name}</h1>
                        <h1 className='text-center'>Email: {user.email}</h1>
                        {
                            user.admin
                            ?
                            <></>
                            :
                            !account || !myInstructor
                            ?
                            <Loading/>
                            :
                            <>
                                <h1 className='text-center'>Class: {account.myClass}</h1>
                                <h1 className='text-center'>Section: {account.section}</h1>
                                <h1 className='text-center'>Team: {account.team}</h1>
                                <h1 className='text-center'>Instructor: {myInstructor.first_name} {myInstructor.last_name}</h1>
                            </>
                        }
                        <Link to="/set_account" className='m-5 text-center'><Button as="Nav">Change Account Information</Button></Link> 
                    </>
                    :
                    !user.first_name
                    ?
                    <Link to="/set_account" className='m-5 text-center'><Button as="Nav">Confirm Account information</Button></Link>
                    :
                    <>
                </>
                }
            </Card>
        </Container>
    );
}

export default Profile;
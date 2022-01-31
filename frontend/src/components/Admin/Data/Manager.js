import React, { useEffect } from 'react';
import { Nav, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { createInstructor, fetchAccount } from '../../../redux/actionCreators/accountActionCreators';
import Loading from '../../Loading/Loading';

function Manager(props) {
    const dispatch = useDispatch();    
  
    const { mounted, user, error, status, isSet } = useSelector(
      (state) =>({
        mounted:state.account.mounted, 
        user:state.auth.user, 
        error:state.auth.error,
        status:state.auth.status,
        isSet:state.account.set
    }), shallowEqual);

    dispatch(fetchAccount(user));

    const confirmAccount    = () => {
        console.log("here")
        dispatch(createInstructor(user.id));
    }

    return (
        <Card className="py-4" style={{border:0}}>
            <h1 className='p-5 text-center'>Manager</h1>
            {
                !isSet && mounted
                ?
                    <Button variant='dark' onClick={confirmAccount} style={{padding:"1em"}}>Complete account setup</Button>
                :
                mounted
                ?
                    <Nav fill variant="tabs" className='justify-content-centered' defaultActiveKey="sections">
                        <Nav.Item>
                            <Nav.Link eventKey="sections">Sections</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="items">Items</Nav.Link>
                        </Nav.Item>
                    </Nav>
                :
                <Loading/>
            }
        </Card>
    );
}

export default Manager;
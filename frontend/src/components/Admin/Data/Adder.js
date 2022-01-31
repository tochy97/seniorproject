import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Nav, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { createInstructor, fetchAccount } from '../../../redux/actionCreators/accountActionCreators';
import Loading from '../../Loading/Loading';
import AddItem from './AddItem';

function Adder(props) {
    const [tab,setTab] = useState("items");
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
        <Card className="p-5" style={{border:0}}>
            <h1 className='p-5 text-center'>Adder</h1>
            {
                !isSet && mounted
                ?
                    <Button variant='dark' onClick={confirmAccount} style={{padding:"1em"}}>Complete account setup</Button>
                :
                mounted
                ?
                <>
                    <Nav fill variant="tabs" className='justify-content-centered' defaultActiveKey="sections" onSelect={(selectedKey) => setTab(selectedKey)}>
                        <Nav.Item>
                            <Nav.Link eventKey="sections">Sections</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="items">Items</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {
                        tab === "sections"
                        ?
                            <></>
                        :
                            <div className='mt-5'>
                                <AddItem/>
                            </div>
                    }
                </>
                :
                <Loading/>
            }
        </Card>
    );
}

export default Adder;
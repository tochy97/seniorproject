import { Container } from '@mui/material';
import React, { useState } from 'react';
import { Nav, Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { createInstructor, fetchAccount } from '../../../redux/actionCreators/accountActionCreators';
import Loading from '../../Loading/Loading';
import AddItem from './Items/AddItem';

function Adder(props) {
    const [tab,setTab] = useState("sections");
    const [classNum,setClassNum] = useState("");
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

    function handleSubmit(){
        
    }

    return (
        <Card className="py-5" style={{border:0}}>
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
                            <Nav.Link eventKey="sections"><h5>Sections</h5></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="items"><h5>Items</h5></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {
                        tab === "items"
                        ?
                            <div className='mt-5'>
                                <AddItem/>
                            </div>
                        :
                        <Container className='mt-5'>
                            <Card className='p-5'>
                                <Card.Title>Add New Class</Card.Title>
                                <Form onSubmit={handleSubmit()}>
                                    <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                        <Form.Control type="text" placeholder="Class number" value={classNum} onChange={e=>setClassNum(e.target.value)} required></Form.Control>
                                        <Form.Label>Class number</Form.Label>
                                    </Form.Floating>
                                    <Button type='submit' variant='dark' className='mt-3 w-100'>Add Class</Button>
                                </Form>
                            </Card>
                        </Container>
                    }
                </>
                :
                <Loading/>
            }
        </Card>
    );
}

export default Adder;
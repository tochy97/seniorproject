import React, { useEffect, useState } from 'react';
import { Nav, Button, Card, Container } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Loading from '../../Loading/Loading';
import Items from './Items';
import AddItem from './Items/AddItem';
import ManageItem from './Items/ManageItem';
import AddSection from './Sections/Section';

function Adder(props) {
    const [tab,setTab] = useState("sections");
    const [classNum,setClassNum] = useState("");
    const dispatch = useDispatch();    
  
    const { mounted, user, error, status, isSet } = useSelector(
      (state) =>({
        mounted:state.section.mounted, 
        user:state.auth.user, 
        error:state.auth.error,
        status:state.auth.status,
        isSet:state.account.set
    }), shallowEqual);

    return (
        <Card className="py-5" style={{border:0}}>
            <h1 className='p-5 text-center'>Data Management</h1>
            {
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
                            <Container className='mt-5'>
                                <Items/>
                            </Container>
                        :
                            <></>
                    }
                    {   
                        tab === "sections"
                        ?
                            <Container className='mt-5'>
                                <AddSection/>
                            </Container>
                        :
                        <></>
                    }
                </>
            }
        </Card>
    );
}

export default Adder;
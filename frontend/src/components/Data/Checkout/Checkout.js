import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Card, Row, Button, Nav } from 'react-bootstrap';
import { Divider } from '@mui/material';
import { fetchItems } from '../../../redux/actionCreators/dataActionCreators';

function Checkout() {
    const dispatch = useDispatch();
    const [filt, setFilt] = useState([])

    const { isLoggedIn, isLoading, items } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            isLoading:state.data.isLoading,
            items:state.data.items
    }), shallowEqual);

    useEffect(() => {
      if(isLoading){
        dispatch(fetchItems());
      }
    }, [setFilt, isLoading, dispatch]);

    useEffect(() => {
        if(items){
            let gList = items.map((it) => it.type)
            const temp = [...new Set(gList)]
            setFilt(temp)
        }
    }, [items, setFilt])


    return (
        <Card className="py-4" style={{border:0}}>
            {
                !isLoggedIn
                ?
                <>Not Logged int</>
                :
                <Row className="px-5 my-6 gap-5">
                    {
                        !items
                        ? 
                        <></>
                        : 
                            <>
                            <Divider className='p-5'><h1>Checkout</h1></Divider>
                            <Nav variant='tabs' className="justify-content-center" defaultActiveKey="home">
                                <Nav.Item>
                                    <Nav.Link eventKey="home">All</Nav.Link>
                                </Nav.Item>
                                {
                                    filt.length > 0
                                    ?
                                    filt.map((it, index) => (
                                        <Nav.Item key={index}>
                                            <Nav.Link eventKey={it}>{it}</Nav.Link>
                                        </Nav.Item>
                                    ))
                                    :
                                    <></>
                                }
                            </Nav>
                            {
                                items.map((its, index) =>(
                                    <Card className="col-md-5 mx-auto px-0" key={index}>
                                        <Card.Header style={{padding:"2rem"}}>Title: {its.name} <br/> Description: {its.description } <br/> Available: {its.available} <br/> Out: {its.out}</Card.Header>
                                        <Card.Body className='mb-5'>
                                        {
                                        }
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button variant='dark' className='form-control'>Add to cart</Button>
                                        </Card.Footer>
                                    </Card>
                                ))
                            }
                            </>
                    }
                </Row>
            }
        </Card>
    );
}

export default Checkout;
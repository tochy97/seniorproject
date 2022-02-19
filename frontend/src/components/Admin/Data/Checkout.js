import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Loading from '../../Loading/Loading';
import { setLoading } from '../../../redux/actionCreators/itemActionCreators';
import { fetchItems } from '../../../redux/actionCreators/itemActionCreators';
import { fetchUsers, logoutUser } from '../../../redux/actionCreators/authActionCreator';
import { setError } from '../../../redux/actionCreators/authActionCreator';

import axios from 'axios';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Divider } from '@mui/material';

function Checkout(props) {

    const dispatch = useDispatch();

    // This one tracks the input to mag strip
    const [currentUser, setCurrentUser] = useState("");
    // bucket holds all the users from database
    const [bucket, setBucket] = useState([]);

    // checkout specific stuff
    const [SessionStatus, setSessionStatus ] = useState();
    const [CheckoutTo, setCheckoutTo] = useState();
    const [currentBarcode, setCurrentBarcode] = useState();
    const studentsItems = [];

    const [startCheckout, setStartCheckout] = useState(true);
    const closeStartCheckout = () => setStartCheckout(false);

    function checkScannedCard(){

        for (var i = 0; i < bucket.length; i++) {
            if (currentUser === bucket[i].username){
                setSessionStatus(true)
                setCheckoutTo(bucket[i])
                closeStartCheckout(false)
            }
        }
    };

    const { isLoggedIn, username, isLoading, items, user } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            username:state.auth.username,
            isLoading:state.item.isLoading,
            user:state.auth.user, 
            items:state.item.items,
    }), shallowEqual);

    useEffect(() => {
        if(isLoading){
            dispatch(fetchItems());

            axios.get("http://127.0.0.1:8000/users/", {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then(res => {
                const allUsers = res.data
                setBucket(allUsers)
            })
            .catch(err => {
                if(err.response.status === 401)
                {
                    const info= {
                        error:"Session expired. Refresh Page",
                        status:err.response.status
                    }
                    dispatch(setError(info))
                    dispatch(logoutUser());
                }
            })
        }

    }, [setBucket, isLoading, dispatch]);


    console.log(SessionStatus)
    console.log(CheckoutTo)

    return (
        <>
        {/* <Modal show={startCheckout} onHide={closeStartCheckout} backdrop='static' size="lg" aria-labelledby="contained-modal-title-vcenter" centered> */}
        <Modal show={false} onHide={closeStartCheckout} backdrop='static' size="lg" aria-labelledby="contained-modal-title-vcenter" centered> 
            <Modal.Body >
                <Form>
                    <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                        <Form.Label>Please Swipe MavID To Start CheckoutSession</Form.Label>
                        <Form.Control value={currentUser} onChange={e => setCurrentUser(e.target.value)} className="text-center" type="text" placeholder="Swipe MavID" />
                    </Form.Group>
                    
                </Form>
                {
                    startCheckout
                    ?
                        checkScannedCard()
                    :
                    <></>
                }
            </Modal.Body>
        </Modal>


        <Container classname='h-100 d-inline-block'>

            <Row>

                <Col md={{ span: 8, offset: 0 }}>
                    <Card classname={'justify-auto'}>
                        <Card.Header>Current Cart</Card.Header>
                        {
                            studentsItems.length === 0
                            ?
                                <Card.Body style={{ height: '18rem' }} className="text-center">
                                    <div style={{ height: '7rem' }}> </div>
                                    <div className='pt-auto'>No items have been added.</div>
                                </Card.Body>
                            :
                                <Card.Body className="text-center">
                                    {
                                        studentsItems.map((item, index) =>(
                                            <Card>
                                                <Card.Body>
                                                    {item}
                                                </Card.Body>
                                            </Card>
                                        ))
                                    } 
                                </Card.Body>
                        }
                        
                    </Card> 
                </Col>

                <Col >
                    <Card >
                        <Card.Body>
                            {
                                studentsItems.length === 0
                                ?
                                    <Card.Body style={{ height: '14rem' }} className="text-center">
                                        <div className='pt-auto'>empty.</div>
                                    </Card.Body>
                                :
                                    <Card.Body>
                                        <div>
                                            Enter somedescription here
                                        </div>
                                    </Card.Body>

                            }
                            <Divider style={{margin:"rem"}}/>

                            <div className ="w-100 py-3">
                                <Button className="btn btn-primary w-100" type="submit">Checkout</Button>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row>
                <Col md={{ span: 8, offset: 0 }}>
                    <Form>
                        <Form.Group className="text-center">
                            <Form.Label></Form.Label>
                            <Form.Control value={currentBarcode} onChange={e => setCurrentBarcode(e.target.value)} className="text-center" placeholder="Scan Barcode To Add Item" />
                        </Form.Group>
                    </Form>
                </Col>
                <Col className="text-center vertical-align">
                    <div className='bd-highlight pt-4 w-100'>
                        <Button className='w-100' type='submit' variant='danger'> Reset Session </Button>
                    </div>
                    
                </Col>
            </Row>

        </Container>
        </>

    );
}

export default Checkout;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Loading from '../../Loading/Loading';
import { setLoading } from '../../../redux/actionCreators/itemActionCreators';
import { fetchItems } from '../../../redux/actionCreators/itemActionCreators';
import { fetchUsers, logoutUser } from '../../../redux/actionCreators/authActionCreator';
import { setError } from '../../../redux/actionCreators/authActionCreator';

import axios from 'axios';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

function Checkout(props) {

    const dispatch = useDispatch();

    // This one tracks the input to mag strip
    const [currentUser, setCurrentUser] = useState("");
    // bucket holds all the users from database
    const [bucket, setBucket] = useState([]);

    // checkout specific stuff
    const [SessionStatus, setSessionStatus ] = useState();
    const [CheckoutTo, setCheckoutTo] = useState();

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
        <Modal show={startCheckout} onHide={closeStartCheckout} backdrop='static' size="lg" aria-labelledby="contained-modal-title-vcenter" centered keyboard>
            <Modal.Body >
                <Form>
                    <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                        <Form.Label>Please Swipe MavID To Start CheckoutSession</Form.Label>
                        <Form.Control value={currentUser} onChange={e => setCurrentUser(e.target.value)} required className="text-center" type="text" placeholder="Swipe MavID" />
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
        <Container>
            <Row>
                <Col md={{ span: 8, offset: 0 }}>
                    <Card classname={'justify-auto'}>
                        <Card.Header>Current Cart</Card.Header>
                        <Card.Body>Hi</Card.Body>
                    </Card> 
                </Col>
                <Col >
                    <Container>
                        <Card >
                            <Card.Body>
                                Hello
                            </Card.Body>
                        </Card>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col classname={"mt-2"} md={{ span: 8, offset: 0 }}>
                    <Form>
                        <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                            <Form.Label></Form.Label>
                            <Form.Control  required className="text-center" type="input" placeholder="Scan Barcode To Add Item" />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>

    );
}

export default Checkout;
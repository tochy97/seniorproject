import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Loading from '../../../components/Loading/Loading';
import { setLoading } from '../../../redux/actionCreators/itemActionCreators';
import { fetchItems } from '../../../redux/actionCreators/itemActionCreators';
import { fetchUsers, logoutUser } from '../../../redux/actionCreators/authActionCreator';
import { setError } from '../../../redux/actionCreators/authActionCreator';
import { fetchAccount } from '../../../redux/actionCreators/accountActionCreators';

import axios from 'axios';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap'
import { Divider } from '@mui/material';

function Checkout(props) {

    const dispatch = useDispatch();

    // This one tracks the input to mag strip
    const [currentUser, setCurrentUser] = useState("");
    // bucket holds all the users from database
    const [bucket, setBucket] = useState([]);
    const [itemsBucket, setItemsBucket] = useState([]);
    const [currentCart, setCurrentCart] = useState([]);
    const [uniqState, setUniqState] = useState([]);

    // checkout specific stuff
    const [SessionStatus, setSessionStatus ] = useState();
    const [checkoutTo, setCheckoutTo] = useState([]);
    const [currentBarcode, setCurrentBarcode] = useState("");

    const [startCheckout, setStartCheckout] = useState(true);
    const closeStartCheckout = () => setStartCheckout(false);
    const openStartCheckout = () => setStartCheckout(true);

    function checkScannedCard(){

        for (var i = 0; i < bucket.length; i++) {
            if (currentUser === bucket[i].username){
                setSessionStatus(true)
                setCheckoutTo(bucket[i])
                closeStartCheckout(false)
                dispatch(fetchAccount(bucket[i].id))
            }
        }
    };

    function checkBarcode(){
        for (var i = 0; i < itemsBucket.length; i++) {
            if (currentBarcode === itemsBucket[i].ser_no){
                // console.log(itemsBucket[i])
                currentCart.push(itemsBucket[i])
                if (!(uniqState.includes(itemsBucket[i]))){
                    uniqState.push(itemsBucket[i])
                }
                setCurrentBarcode("")
            }
        }
        console.log(currentCart)
    };

    function removeCurrentItem(id){
        // console.log(material);
        let repeatedcount = 0
        let itemCopy = null

        for (var i = 0; i < currentCart.length; i++) {
            if (currentCart[i].id === id){
                repeatedcount += 1
            }
            if (repeatedcount > 1){
                // Store a copy of the current id
                itemCopy = currentCart[i]
            }
        };
        
        const newList = currentCart.filter((it) => it.id !== id);
        for (var i = 0; i < repeatedcount-1; i++) {
            newList.push(itemCopy)
        }
        setCurrentCart(newList);

        if (repeatedcount <= 1){
            const newListTwo = uniqState.filter((it) => it.id !== id);
            setUniqState(newListTwo);
        }
        
    };

    function totalNumberItem(someItem){
        let currentSer = someItem.ser_no
        let count = 0
        for (var i = 0; i < currentCart.length; i++) {
            if (currentSer == currentCart[i].ser_no){
                count = count + 1
            }
        }
        return count
    };

    function handleReset(){
        openStartCheckout()
        setSessionStatus(false)
        setCurrentUser('')
        setUniqState([])
        setCurrentCart([])
    };

    function handleCheckout(){
        console.log(currentCart)
        console.log(account)
        let formData = new FormData()

        let tempBucket = []
        let itemsCounts = {}
        for (var i = 0; i < currentCart.length; i++) {
            tempBucket.push(currentCart[i].id)
            formData.append('items', currentCart[i].id)

            if (currentCart[i].id in itemsCounts){
                itemsCounts[currentCart[i].id] += 1
            }
            else{
                itemsCounts[currentCart[i].id] = 1
            }
            // console.log(currentCart[i].id)
        }
        console.log(itemsCounts)

        formData.append('instructor', account.instructor)

        formData.append('myClass', account.myClass)
        formData.append('section', account.section)
        formData.append('team', account.team)
        formData.append('user', account.user)

        axios.put(`http://127.0.0.1:8000/accounts/${account.user}/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then(res => {
                // Now I need to update the item counts


                
            })
                .catch(err => console.log(err))
    };

    const { isLoggedIn, username, isLoading, items, user, account } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            username:state.auth.username,
            isLoading:state.item.isLoading,
            user:state.auth.user, 
            items:state.item.items,
            account:state.account.data,
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

    }, [setItemsBucket, isLoading, dispatch]);

    useEffect(() => {
        if(items){
            let gList = items.map((it) => it)
            const temp = [...new Set(gList)]
            setItemsBucket(temp)
        }
    }, [items, setItemsBucket])


    return (
        <>
        <h1 className='pb-4 text-center'> Item Checkout</h1>
        <Modal show={startCheckout} onHide={closeStartCheckout} backdrop='static' size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        {/* <Modal show={false} onHide={closeStartCheckout} backdrop='static' size="lg" aria-labelledby="contained-modal-title-vcenter" centered>  */}
            <Modal.Body >
                <Form>
                    <Form.Group id='firstInput' className="text-center" controlId="exampleForm.ControlInput1">
                        <Form.Label>Please Swipe MavID To Start CheckoutSession</Form.Label>
                        <Form.Control ref={input => input && input.focus()} value={currentUser} onChange={e => setCurrentUser(e.target.value)} className="text-center" type="text" placeholder="Swipe MavID"/>
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


        <Container >

            <Row>

                <Col md={{ span: 8, offset: 0 }}>
                    <Card className={'justify-auto'}>
                        <Card.Header>Current Cart</Card.Header>
                        {
                            currentCart.length === 0
                            ?
                                <Card.Body style={{ height: '18rem' }} className="text-center">
                                    <div style={{ height: '7rem' }}> </div>
                                    <div className='pt-auto'>No items have been added.</div>
                                </Card.Body>
                            :
                                <Card.Body className="text-center">
                                    
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Remove</th>
                                                <th>Item Name</th>
                                                <th>Item Type</th>
                                                {/* <th>Item Description</th> */}
                                                <th>Serial Number</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                
                                                uniqState.map((it, index) =>(
                                                    <tr key={index} >
                                                        <td>
                                                            <div className="d-grid gap-2">
                                                                <Button onClick={() => removeCurrentItem(it.id)} size="sm" id={"button-"+index} title={it.id}> Remove </Button>
                                                            </div>
                                                        </td>
                                                        <td>{it.name}</td> 
                                                        <td>{it.type}</td>
                                                        {/* <td>{it.description}</td> */}
                                                        <td>{it.ser_no}</td>
                                                        <td>{totalNumberItem(it)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>

                                    </Table>
                                    
                                </Card.Body>
                        }
                        
                    </Card> 
                </Col>

                <Col >
                    <Card >
                        <Card.Body>
                            {
                                currentCart.length === 0
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
                                <Button onClick={() => handleCheckout()} className="btn btn-primary w-100" type="button">Checkout</Button>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>

            </Row>

            <Row>
                <Col md={{ span: 8, offset: 0 }}>
                    <Form>
                        <Form.Group id='secondInput'className="text-center">
                            <Form.Label></Form.Label>
                            <Form.Control type='text' value={currentBarcode} onChange={e => setCurrentBarcode(e.target.value)} className="text-center" placeholder="Scan Barcode To Add Item" />
                        </Form.Group>
                    </Form>
                    {
                        SessionStatus
                        ?
                            checkBarcode()
                        :
                            <></>
                    }
                    
                </Col>

                <Col className="text-center vertical-align">
                    <div className='bd-highlight pt-4 w-100'>
                        <Button className='w-100' onClick={() => handleReset()} variant='danger'> Reset Session </Button>
                    </div>
                    
                    
                </Col>
            </Row>
            

        </Container>
        
        </>


    );
}

export default Checkout;
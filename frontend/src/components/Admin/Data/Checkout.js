import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Loading from '../../Loading/Loading';
import { setLoading } from '../../../redux/actionCreators/itemActionCreators';
import { fetchItems } from '../../../redux/actionCreators/itemActionCreators';
import { fetchUsers, logoutUser } from '../../../redux/actionCreators/authActionCreator';
import { setError } from '../../../redux/actionCreators/authActionCreator';

import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function Checkout(props) {

    const dispatch = useDispatch();
    
    const [startCheckout, setStartCheckout] = useState(true);

    const [currentUser, setCurrentUser] = useState("")
    const [bucket, setBucket] = useState([]);

    const closeStartCheckout = () => setStartCheckout(false);

    function checkScannedCard(currentUser){
        console.log(currentUser)
        console.log(bucket)

        // if (currentUser in ){
        //     return true
        // }

    }

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

    return (
        <Modal show={startCheckout} onHide={closeStartCheckout} backdrop='static' size="lg" aria-labelledby="contained-modal-title-vcenter" centered keyboard>
            <Modal.Body >
                <Form>
                    <Form.Group className="text-center" controlId="exampleForm.ControlInput1">
                        <Form.Label>Please Swipe MavID To Start CheckoutSession</Form.Label>
                        <Form.Control value={currentUser} onChange={e => setCurrentUser(e.target.value)} required className="text-center" type="text" placeholder="Swipe MavID" />
                        {
                            checkScannedCard(currentUser)
                            ?
                                closeStartCheckout()
                            :
                            <></>
                        }
                    </Form.Group>
                </Form>
            </Modal.Body >
        </Modal>
    );
}

export default Checkout;
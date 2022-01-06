import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { Card, Row, Col, Form, Alert, Button, Modal } from 'react-bootstrap';
import { setError, loginUser } from '../../redux/actionCreators/authActionCreator';

function Login() {
    const [data,setData] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const histroy = useNavigate();
    
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setConfirm(false);
    }
    const openConfirm = () => setConfirm(true);
    const closeConfirm = () => setConfirm(false);

    console.log(password)
    const { error, status } = useSelector(
      (state) =>({
        error:state.auth.error, 
        status:state.auth.status, 
    }), shallowEqual);

    function getUsername(e){
        e.preventDefault();
        const temp = data.split(" ");
        const last = temp[temp.length -1].split("+");
        setUsername(last[last.length -1].slice(0,-1));
        openConfirm();
        setData("")
    }

    function handleSubmit(e){
        e.preventDefault();
        const info= {
            error:"",
        }
        dispatch(setError(info));
        const data = {
            username: username,
            password: password
        }
        dispatch(loginUser(data));
        setUsername(" ");
        histroy("../", {replace:true});
    }

    return (
        <Card className="py-4" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                <Divider className="font-weight-bold text-center py-4"><h1>Login</h1></Divider>
                <Alert className="font-weight-bold text-center py-4" variant="dark"><h4>Click text box then swipe your card or type in your ID</h4></Alert>
                {error && status !== 401 && <Alert variant="danger">{error}</Alert>}
                <Col lg={10}  className="mx-auto">
                    <Form onSubmit={getUsername}>
                        <Form.Floating id="username" style={{marginTop: "1rem"}} >
                            <Form.Control type="text" placeholder="Click me!" value={data} onChange={e=>setData(e.target.value)} required></Form.Control>
                            <Form.Label>Click Me!</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Login</Button>
                    </Form>
                    <h1 className='text-center mt-5'>OR</h1>
                    <Modal show={confirm} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Is this your ID?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {username}
                            </Form>
                            <Button className="w-100 mt-4" variant="dark" onClick={handleShow}>YES</Button>
                            <Button className="w-100 mt-4" variant="secondary" onClick={closeConfirm}>NO</Button>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={closeConfirm}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Click input box then swipe card</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Floating id="username" style={{marginTop: "1rem"}} >
                                    <Form.Control type="password" placeholder="Enter a password" value={password} onChange={e=>setPassword(e.target.value)} required></Form.Control>
                                    <Form.Label>Enter a password</Form.Label>
                                </Form.Floating>
                                <Button className="w-100 mt-4" variant="dark" type="submit">Login</Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Card>
    );
}

export default Login;
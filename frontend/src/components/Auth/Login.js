import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { Card, Row, Col, Form, Alert, Button, Modal } from 'react-bootstrap';
import { setError, loginUser } from '../../redux/actionCreators/authActionCreator';

function Login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const histroy = useNavigate();

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { error, status } = useSelector(
      (state) =>({
        error:state.auth.error, 
        status:state.auth.status, 
    }), shallowEqual);

    function handleSubmit(e){
        e.preventDefault();
        const info= {
            error:"",
        }
        if(username.split(" ").length>2);
        {
            const temp = username.split(" ");
            const last = temp[temp.length -1].split("+");
            setUsername(last[last.length -1].slice(0,-1));
        }
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        dispatch(loginUser(data));
        histroy("../", {replace:true});
    }

    return (
        <Card className="py-4" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                <Divider className="font-weight-bold text-center py-4"><h1>Login</h1></Divider>
                {error && status !== 401 && <Alert variant="danger">{error}</Alert>}
                <Col lg={10}  className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Floating id="username">
                            <Form.Control type="username" placeholder="ID Number" value={username} onChange={e=>setUsername(e.target.value)} required></Form.Control>
                            <Form.Label>ID Number</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="password" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Last 4 digits of ID" rvalue={password} onChange={e=>setPassword(e.target.value)} required></Form.Control>
                            <Form.Label>Last 4 digits of ID</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Login</Button>
                    </Form>
                    <h1 className='text-center mt-5'>OR</h1>
                    <Button variant="secondary" className="w-100 mt-4" onClick={handleShow}>Launch demo modal</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Please Swipe Your ID</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <input type="username" className='form-control' value={username} onChange={e=>setUsername(e.target.value)} autoFocus required></input>
                                <Button className="w-100 mt-4" variant="dark" type="submit">Login</Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Login
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Card>
    );
}

export default Login;
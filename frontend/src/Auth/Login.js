import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { Card, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { checkUser, loginUser } from '../redux/actionCreators/authActionCreator';

function Login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const histroy = useNavigate();

    const { error, status } = useSelector(
      (state) =>({
        error:state.auth.error, 
        status:state.auth.status, 
    }), shallowEqual);
    
    console.log(status)

    function handleSubmit(e){
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
                            <Form.Control type="username" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}></Form.Control>
                            <Form.Label>Username</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="password" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Password" rvalue={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
                            <Form.Label>Password</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Login</Button>
                    </Form>
                    <h1 className='text-center mt-5'>OR</h1>
                    <Button className="w-100 mt-4" variant="secondary" type="submit"> Swipe Your Card</Button>
                </Col>
            </Row>
        </Card>
    );
}

export default Login;
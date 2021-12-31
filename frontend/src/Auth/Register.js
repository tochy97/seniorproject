import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Divider from '@mui/material/Divider';
import { Card, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { loginUser, setError } from '../redux/actionCreators/authActionCreator';

function Register() {
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");
    const dispatch = useDispatch();
    
    const { error } = useSelector(
        (state) =>({
          error:state.auth.error, 
    }), shallowEqual);

    function handleSubmit(e){
        e.preventDefault();
        if(password.localeCompare(cpassword) !== 0){
            const info= {
                error:"Passwords did not match",
            }
            dispatch(setError(info))
        }
    }

    return (
        <Card className="py-4" style={{border:0}}>
            <Row className="px-5 my-6 gap-5">
                <Divider className="font-weight-bold text-center py-4"><h1>Register</h1></Divider>
                {error && <Alert variant="danger">{error}</Alert>}
                <Col lg={10}  className="mx-auto">
                    <Form onSubmit={handleSubmit}>
                        <Form.Floating id="password" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Password" rvalue={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
                            <Form.Label>Password</Form.Label>
                        </Form.Floating>
                        <Form.Floating id="cpassword" style={{marginTop: "1rem"}} >
                            <Form.Control type="password" placeholder="Confirm Password" rvalue={cpassword} onChange={e=>setCpassword(e.target.value)}></Form.Control>
                            <Form.Label>Confirm Password</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Register</Button>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}

export default Register;
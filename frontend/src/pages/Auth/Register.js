import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { Card, Row, Col, Form, Alert, Button, Modal, Container } from 'react-bootstrap';
import { createUser, setError } from '../../redux/actionCreators/authActionCreator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    for (let i = 0; i < str.length; i++) {
        if(isNaN(str[i]) && isNaN(parseFloat(str[i]))){
            return false;
        }
    }
    return true;
}

function Register() {
    const [data,setData] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [cpassword,setCpassword] = useState("");
    const [showCPassword, setShowCPassword] = useState(false)

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

    const { error, status } = useSelector(
        (state) =>({
          error:state.auth.error, 
          status:state.auth.status, 
    }), shallowEqual);

    const getUsername = (e) => {
        e.preventDefault();
        const x = data
        if(x.split(" ").length > 1)
        {
            const temp = data.split(" ");
            const last = temp[temp.length -1].split("+");
            setUsername(last[last.length -1].slice(0,-1));
            setData("");
            return openConfirm();
        }
        else{
            /*if(!isNumeric(data)){
                const info= {
                    error:"Username must be all numbers",
                    status:999
                }
                return dispatch(setError(info));
            }*/
            setUsername(data);
            setData("");
            return openConfirm();
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const info= {
            status: 101,
            error:"",
        };
        dispatch(setError(info));
        if(password !== cpassword){
            const info= {
                error:"Passwords do not match",
                status:999
            }
            return dispatch(setError(info));
        }
        const data = {
            username: username,
            password: password
        }
        dispatch(createUser(data)); 
        histroy("../", {replace:true});
    }
    
    return (
        <Container className="p-5" style={{border:0}}>
                <Divider className="font-weight-bold text-center py-4"><h1>Register</h1></Divider>
                {error && status === 999 && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={getUsername}>
                        <Form.Floating id="username" style={{marginTop: "1rem"}}>
                            <Form.Control autoFocus type="text" placeholder="Swipe Card" value={data} onChange={e=>setData(e.target.value)} required></Form.Control>
                            <Form.Label>Swipe Card</Form.Label>
                        </Form.Floating>
                        <Button className="w-100 mt-4" variant="dark" type="submit">Register</Button>
                    </Form>
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
                            {error && status !== 401 && <Alert variant="danger">{error}  <Link to="/login" style={{color:"black"}}>Login</Link></Alert>}
                                <Form.Floating id="password" style={{marginTop: "1rem"}} >
                                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required></Form.Control>
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{margin:"1em", position:"absolute", top:5, right:0}} className="hoverMe" onClick={() => setShowPassword(!showPassword)}/>
                                    <Form.Label>Enter a password</Form.Label>
                                </Form.Floating>
                                <Form.Floating id="cpassword" style={{marginTop: "1rem"}} >
                                    <Form.Control type={showCPassword ? "text" : "password"} placeholder="Confirm password" value={cpassword} onChange={e=>setCpassword(e.target.value)} required></Form.Control>
                                    <FontAwesomeIcon icon={showCPassword ? faEye : faEyeSlash} style={{margin:"1em", position:"absolute", top:5, right:0}} className="hoverMe" onClick={() => setShowCPassword(!showCPassword)}/>
                                    <Form.Label>Confirm password</Form.Label>
                                </Form.Floating>
                            <Button className="w-100 mt-4" variant="dark" type="submit">Register</Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
        </Container>
    );
}

export default Register;
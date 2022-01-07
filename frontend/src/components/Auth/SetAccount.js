import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { Card, FloatingLabel, Form, Alert, Button, Container } from 'react-bootstrap';
import { createUser, setAccount, setError } from '../../redux/actionCreators/authActionCreator';

function SetAccount() {
    const [first_name,setFirst_name] = useState("");
    const [last_name,setLast_name] = useState("");
    const [email,setEmail] = useState("");
    const [cemail,setCemail] = useState("");
    const [confirmed,setConfirmed] = useState(false);
    const [section,setSection] = useState("");
    const [team,setTeam] = useState("");
    const [instructor,setInstructor] = useState("");

    const dispatch = useDispatch();
    const histroy = useNavigate();

    const { error, status, user, isLoggedIn } = useSelector(
        (state) =>({
            error:state.auth.error, 
            status:state.auth.status, 
            user:state.auth.user, 
            isLoggedIn:state.auth.isLoggedIn, 
    }), shallowEqual);

    
    function handleSubmit(e){
        e.preventDefault();
        if(email.localeCompare(cemail) !== 0 ){
            const info= {
                error:"Emails did not match",
            }
            dispatch(setError(info));
            return;
        }
        const data = {
            first_name:first_name,
            last_name:last_name,
            email:email,
        }
        dispatch(setAccount(data, user.id));
        setConfirmed(true);
    }
    return (
        <Container>
            <Card className='p-5'>
                <Divider className="font-weight-bold text-center py-4"><h1>Set Account Information</h1></Divider>
                {error && <Alert variant="danger">{error}</Alert>}
                {
                    !user || !isLoggedIn
                    ?
                        <></>
                    :
                    confirmed
                    ?
                        <Alert variant="success">Account confirmed</Alert>
                    :
                        <Form onSubmit={handleSubmit}>
                            <Form.Floating id="first_name" style={{marginTop: "1rem"}} >
                                <Form.Control type="text" placeholder="First Name" value={first_name} onChange={e=>setFirst_name(e.target.value)} required></Form.Control>
                                <Form.Label>First Name</Form.Label>
                            </Form.Floating>
                            <Form.Floating id="last_name" style={{marginTop: "1rem"}} >
                                <Form.Control type="text" placeholder="Last Name" value={last_name} onChange={e=>setLast_name(e.target.value)} required></Form.Control>
                                <Form.Label>Last Name</Form.Label>
                            </Form.Floating>
                            <Form.Floating id="email" style={{marginTop: "1rem"}} >
                                <Form.Control type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required></Form.Control>
                                <Form.Label>Email</Form.Label>
                            </Form.Floating>
                            <Form.Floating id="cemail" style={{marginTop: "1rem"}} >
                                <Form.Control type="email" placeholder="Confirm Email" value={cemail} onChange={e=>setCemail(e.target.value)} required></Form.Control>
                                <Form.Label>Confirm Email</Form.Label>
                            </Form.Floating>
                            <FloatingLabel controlId="floatingSelect" label="Who is your instructor" style={{marginTop: "1rem"}}>
                                <Form.Select value={instructor} onChange={e=>setInstructor(e.target.value)} id="instructor" style={{marginTop: "1rem"}} >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                </Form.Select>
                            </FloatingLabel>
                            <Form.Floating id="team" style={{marginTop: "1rem"}} >
                                <Form.Control type="text" placeholder="Team name" value={team} onChange={e=>setTeam(e.target.value)} required></Form.Control>
                                <Form.Label>Team name</Form.Label>
                            </Form.Floating>
                            <FloatingLabel controlId="floatingSelect" label="Select your section" style={{marginTop: "1rem"}}>
                                <Form.Select value={section} onChange={e=>setSection(e.target.value)} id="section" style={{marginTop: "1rem"}} >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                </Form.Select>
                            </FloatingLabel>
                            <Button className="w-100 mt-4" variant="dark" type="submit">Confirm</Button>
                        </Form>
                }
            </Card>
        </Container>
    );
}

export default SetAccount;
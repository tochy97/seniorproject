import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { Card, FloatingLabel, Form, Alert, Button, Modal } from 'react-bootstrap';
import { setAccount, setError } from '../../redux/actionCreators/authActionCreator';

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    for (let i = 0; i < str.length; i++) {
        if(isNaN(str[i]) && isNaN(parseFloat(str[i]))){
            return false;
        }
    }
    return true;
}


function SetAccount(props) {
    const [first_name,setFirst_name] = useState("");
    const [last_name,setLast_name] = useState("");
    const [email,setEmail] = useState("");
    const [cemail,setCemail] = useState("");
    const [confirmed,setConfirmed] = useState(false);
    const [clas,setClas] = useState('');
    const [section,setSection] = useState('');
    const [team,setTeam] = useState("");
    const [instructor,setInstructor] = useState('');
    const [confirmedBox, setConfirmedBox] = useState(false);
    const [classList, setClassList] = useState([]);
    const [sectionList, setSectionList] = useState([]);

    const dispatch = useDispatch();
    const histroy = useNavigate();

    const { error, status, user, isLoggedIn, instructorList, fetched, mounted, classes } = useSelector(
        (state) =>({
            error:state.auth.error, 
            status:state.auth.status, 
            user:state.auth.user, 
            isLoggedIn:state.auth.isLoggedIn, 
            instructorList:state.account.instructor,
            fetched:state.account.fetched,
            mounted:state.section.mounted,
            classes:state.section.classes,
    }), shallowEqual);

    console.log(instructorList)
    useEffect(() => {
        if(classes)
        {
                    let curr;
                    let output = []
                    for (let j = 0; j < classes.length; j++){
                        output.push([])
                        if(classes[j].sections)
                        {
                            for (let i = 0; i < classes[j].sections.length; i++) {
                                curr = classes[j].sections
                                if(isNumeric(curr[i]) && curr[i] !== ' '){
                                    output[j].push(curr[i])
                                }
                            }
                        }
                    }
                    setSectionList(output);
                }
    }, [instructorList,dispatch]);
    console.log(instructor)
    const closeConfirmedBox = () => setConfirmedBox(false);
    const showConfirmedBox = () => {
        setConfirmedBox(true);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.localeCompare(cemail) !== 0 ){
            const info= {
                error:"Emails did not match",
                status:999
            }
            dispatch(setError(info));
            return;
        }
        const data = {
            first_name:first_name,
            last_name:last_name,
            email:email,
        }
        //dispatch(setAccount(data, user.id));
        setConfirmed(true);
    }

    return (
            <Card className='p-5'>
                <Divider className="font-weight-bold text-center py-4"><h1>Set Account Information</h1></Divider>
                {error && <Alert variant="danger">{error}</Alert>}
                {
                    fetched
                    ?
                        <Form onSubmit={showConfirmedBox}>
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
                            {
                                user.is_superuser
                                ?
                                <></>
                                :
                                <>
                                <FloatingLabel controlId="floatingSelect" label="Who is your instructor" style={{marginTop: "1rem"}}>
                                    <Form.Select value={instructor} onChange={e=>setInstructor(e.target.value)} id="instructor" style={{marginTop: "1rem"}} >
                                        {
                                            instructorList.map((instr) => (
                                                <option value={instr.id}>{instr.username}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingSelect" label="Select your class" style={{marginTop: "1rem"}}>
                                    <Form.Select value={clas} onChange={e=>setClas(e.target.value)} id="clas" style={{marginTop: "1rem"}} >
                                            <option value="4316">4316</option>
                                            <option value="4317">4317</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingSelect" label="Select your section" style={{marginTop: "1rem"}}>
                                    <Form.Select value={section} onChange={e=>setSection(e.target.value)} id="section" style={{marginTop: "1rem"}} >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                    </Form.Select>
                                </FloatingLabel>
                                <Form.Floating id="team" style={{marginTop: "1rem"}} >
                                    <Form.Control type="text" placeholder="Team name" value={team} onChange={e=>setTeam(e.target.value)} required></Form.Control>
                                    <Form.Label>Team name</Form.Label>
                                </Form.Floating>
                                </>
                            }
                            <Button className="w-100 mt-4" variant="dark" type="submit">Confirm</Button>
                        </Form>
                    :
                        <></>
                }
                <Modal show={confirmedBox} onHide={() => closeConfirmedBox()}>
                    <Modal.Header closeButton>
                    <Modal.Title>Please read and submit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.]
                        </p>
                        <div>
                            <Form>
                                <Form.Check
                                    type="checkbox"
                                    id="disabledFieldsetCheck"
                                    label="I have read and accept the message."
                                />
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer><Button variant='success' onClick={()=> handleSubmit()}>Submit</Button></Modal.Footer>
                </Modal>
            </Card>
    );
}

export default SetAccount;
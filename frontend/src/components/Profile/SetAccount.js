import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Card, FloatingLabel, Form, Alert, Button, Container } from 'react-bootstrap';
import { setError, updateUser } from '../../redux/actionCreators/authActionCreator';
import { fetchInstructors, updateAccount } from '../../redux/actionCreators/accountActionCreators';
import Loading from '../Loading/Loading';
import { fetchClass } from '../../redux/actionCreators/sectionActionCreators';

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    for (let i = 0; i < str.length; i++) {
        if(isNaN(str[i]) && isNaN(parseFloat(str[i]))){
            return false;
        }
    }
    return true;
}
function SetAccount() {
    const [first_name,setFirst_name] = useState("");
    const [last_name,setLast_name] = useState("");
    const [email,setEmail] = useState("");
    const [cemail,setCemail] = useState("");
    const [mySection,setMySection] = useState("");
    const [myTeam,setTeam] = useState("");
    const [myInstructor,setInstructor] = useState("");
    const [myClass,setMyClass] = useState("");
    const [sections,setSections] = useState([]);
    const [loaded,setLoaded] = useState(false);

    const dispatch = useDispatch();
    const histroy = useNavigate();

    const { error, status, user, isLoggedIn, instructors, classes } = useSelector(
        (state) =>({
            error:state.auth.error, 
            status:state.auth.status, 
            user:state.auth.user, 
            isLoggedIn:state.auth.isLoggedIn, 
            instructors:state.account.instructors,
            classes:state.section.classes,
    }), shallowEqual);

    useEffect(() => {
        if(!instructors){
            dispatch(fetchInstructors());
            if(!classes){
                dispatch(fetchClass());
                if(instructors){
                }
            }
        }
        else{
            if(!loaded)
            {
                setInstructor(instructors[0].id);
                setClassSection(classes[0].number)
                setLoaded(true);
            }
        }
    }, [instructors,setInstructor,dispatch,myInstructor,setLoaded]);
    const setClassSection = (value) => {
        setMyClass(value);
        const output = [];
        let curr;
        let currentClass = classes.filter((element) => element.number === parseInt(value))
        if(currentClass[0].sections)
        {
            for (let i = 0; i < currentClass[0].sections.length; i++) {
                curr = currentClass[0].sections
                if(isNumeric(curr[i]) && curr[i] !== ' '){
                    output.push(curr[i])
                }
            }
        }
        setSections(output)
        setMySection(output[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.localeCompare(cemail) !== 0 ){
            const info= {
                error:"Emails did not match",
            }
            dispatch(setError(info));
            return;
        }
        const userData = {
            user:user.id,
            first_name:first_name,
            last_name:last_name,
            email:email,
        }
        if(!user.is_superuser){
            const accountData = {
                user:user.id,
                section:mySection,
                instructor:myInstructor,
                team:myTeam,
                myClass:myClass,
            }
            dispatch(updateAccount(userData, user.id, accountData));
        }
        else{
            dispatch(updateUser(userData, user.id));
        }
        histroy("/profile", {replace:true});
    }

    return (
        <>
            {
                isLoggedIn
                ?
                    <Card className='p-5'>
                        <Divider className="font-weight-bold text-center py-4"><h1>Set Account Information</h1></Divider>
                        {error && status === 999 && <Alert variant="danger">{error}</Alert>}
                        {
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
                                    {
                                        user.is_superuser
                                        ?
                                            <></>
                                        :
                                        !instructors
                                        ?
                                            <Loading/>
                                        :
                                            <>
                                            <FloatingLabel controlId="floatingSelect" label="Who is your instructor" style={{marginTop: "1rem"}}>
                                                <Form.Select value={myInstructor} onChange={e=>setInstructor(e.target.value)} id="myInstructor" style={{marginTop: "1rem"}} >
                                                    {
                                                        instructors.map((instr) => (
                                                            <option value={instr.id}>{`${instr.first} ${instr.last}`}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </FloatingLabel>
                                            <Form.Floating id="myTeam" style={{marginTop: "1rem"}} >
                                                <Form.Control type="text" placeholder="Team name" value={myTeam} onChange={e=>setTeam(e.target.value)} required></Form.Control>
                                                <Form.Label>Team name</Form.Label>
                                            </Form.Floating>
                                            {
                                                myInstructor && classes
                                                ?
                                                <FloatingLabel controlId="floatingSelect" label="Select your class" style={{marginTop: "1rem"}}>
                                                    <Form.Select value={myClass} onChange={e=>setClassSection(e.target.value)} id="myClass" style={{marginTop: "1rem"}} >
                                                        {
                                                            classes.map((cla) => (
                                                                <option value={cla.number}>{cla.number}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </FloatingLabel>
                                                :
                                                !classes
                                                ?
                                                <Loading/>
                                                :
                                                <></>
                                            }
                                            {
                                                myInstructor && classes && sections && myClass
                                                ?
                                                    <FloatingLabel controlId="floatingSelect" label="Select your section" style={{marginTop: "1rem"}}>
                                                        <Form.Select value={mySection} onChange={e=>setMySection(e.target.value)} id="mySection" style={{marginTop: "1rem"}} >
                                                        {
                                                            sections.map((cla) => (
                                                                <option value={cla}>00{cla}</option>
                                                            ))
                                                        }
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                :
                                                !classes
                                                ?
                                                <Loading/>
                                                :
                                                <></>
                                            }
                                            </>
                                    }
                                    <Button className="w-100 mt-4" variant="dark" type="submit">Confirm</Button>
                                </Form>
                        }
                    </Card>
                :
                <></>
            }
        </>
    );
}

export default SetAccount;
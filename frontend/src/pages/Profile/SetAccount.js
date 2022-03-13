import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import { Card, FloatingLabel, Form, Alert, Button, Container } from 'react-bootstrap';
import { setError, updateUser } from '../../redux/actionCreators/authActionCreator';
import { fetchInstructors, updateAccount } from '../../redux/actionCreators/accountActionCreators';
import Loading from '../../components/Loading/Loading';
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
    const [myTeam,setMyTeam] = useState("");
    const [myInstructor,setMyInstructor] = useState("");
    const [myClass,setMyClass] = useState("");
    const [myClassInstructor,setMyClassInstructor] = useState("");
    const [sections,setSections] = useState([]);
    const [loaded,setLoaded] = useState(false);

    const [classRadioState, setClassRadioState] = useState(false);
    const [sectionRadioState, setSectionRadioState] = useState(false);

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
        if(!instructors || !Array.isArray(instructors)){
            dispatch(fetchInstructors());
            if(!classes){
                dispatch(fetchClass());
            }
        }
    }, [instructors,setMyInstructor,dispatch,myInstructor,setLoaded]);

    const setInstructorFields = (value) => {
        setClassRadioState(!classRadioState)
        setMyInstructor(value)
        setMyClass("")
    }

    const setClassSection = (value) => {
        setSectionRadioState(!sectionRadioState)
        setMyClassInstructor(myInstructor)
        setMyClass(value.split(",")[0]);
        setMySection("")
        const output = [];
        let curr;
        let currentClass = classes.filter((element) => element.id === parseInt(value.split(",")[1]))
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
    }
    
    const setThisSection = (value) => {
        setMySection(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.localeCompare(cemail) !== 0 ){
            const info= {
                error:"Emails did not match",
                status:999
            }
            return dispatch(setError(info));
        }
        if(!myInstructor || !myClass || !mySection){
            const info= {
                error:"All fields are required",
                status:999
            }
            return dispatch(setError(info));
            
        }
        const userData = {
            user:user.id,
            first_name:first_name,
            last_name:last_name,
            email:email,
        }
        if(!user.admin){
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
                                        user.admin
                                        ?
                                            <></>
                                        :
                                        !instructors
                                        ?
                                            <Loading/>
                                        :
                                            <>
                                            <Form.Floating id="myTeam" style={{marginTop: "1rem"}} >
                                                <Form.Control type="text" placeholder="Team name" value={myTeam} onChange={e=>setMyTeam(e.target.value)} required></Form.Control>
                                                <Form.Label>Team name</Form.Label>
                                            </Form.Floating>
                                            <div style={{marginTop:"2em"}}>
                                                <Form.Label style={{marginRight:"1em"}}>Select your instructor: </Form.Label>
                                                {
                                                    instructors.map((instr, index) => (
                                                        <Form.Check
                                                            key={index}
                                                            value={instr.id}
                                                            inline
                                                            onChange={e=>setInstructorFields(e.target.value)}
                                                            label={`${instr.first} ${instr.last}`}
                                                            name="myInstructor"
                                                            type="radio"
                                                        />
                                                    ))
                                                }
                                            </div>
                                            {
                                                myInstructor && classes
                                                ?
                                                <div style={{display:"flex" ,marginTop:"2em"}}>
                                                    <Form.Label style={{marginRight:"1em"}}>Select your class: </Form.Label>
                                                    {
                                                        classes.map((cla, index) => (
                                                            <div key={index}>
                                                            {
                                                                cla.instructor === parseInt(myInstructor)
                                                                ?
                                                                <Form.Check
                                                                    key={classRadioState}
                                                                    value={`${cla.number},${cla.id}`}
                                                                    inline
                                                                    onChange={e=>setClassSection(e.target.value)}
                                                                    label={cla.number}
                                                                    name="myClass"
                                                                    type="radio"
                                                                />
                                                                :<></>
                                                            }
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                :
                                                !classes
                                                ?
                                                <Loading/>
                                                :
                                                <></>
                                            }
                                            {
                                                myInstructor && classes && sections && myClass && myInstructor === myClassInstructor
                                                ?
                                                    <div style={{display:"flex" ,marginTop:"2em"}}>
                                                        <Form.Label style={{marginRight:"1em"}}>Select your section: </Form.Label>
                                                        {
                                                            sections.map((cla, index) => (
                                                                <div key={index}>
                                                                    {
                                                                        <Form.Check
                                                                            key={sectionRadioState}
                                                                            value={cla}
                                                                            inline
                                                                            onChange={e=>setThisSection(e.target.value)}
                                                                            label={`00${cla}`}
                                                                            name="mySection"
                                                                            type="radio"
                                                                        />
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                :
                                                !classes
                                                ?
                                                <Loading/>
                                                :
                                                <></>
                                            }
                                            </>
                                    }
                                    <Button className="w-100 mt-4" variant="dark" type="submit" disabled={(!myClass || !myInstructor || !myClass || !myTeam || !first_name || !last_name || !email || !cemail) ? true : false}>Confirm</Button>
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
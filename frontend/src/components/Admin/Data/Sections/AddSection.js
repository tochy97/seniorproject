import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Form, Stack, Alert, Row, Col, Overlay } from 'react-bootstrap';
import { Divider } from "@mui/material"
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setError } from '../../../../redux/actionCreators/authActionCreator';
import { createClass, createSection, fetchClass } from '../../../../redux/actionCreators/sectionActionCreators';

function AddSection(props) {
    const [classNumber,setClassNumber] = useState("");
    const [sectionNumber, setSectionNumber] =  useState("");
    const [cSectionNumber, setCSectionNumber] =  useState("");
    const [classID, setClassID] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [sectionList, setSectionList] = useState([]);
    const [classKey, setClassKey] = useState("");

    const [adding, setAdding] = useState(false);

    const closeAdding = () => setAdding(false);
    const showAdding = () => setAdding(true);

    const [editing, setEditing] = useState(false);

    const closeEditing = () => setEditing(false);
    function openEditBox(c,s){
        setSelectedSection(s)
        setSelectedClass(c)
        setEditing(true)
    }

    const dispatch = useDispatch();    
  
    const { user, classes, section, mounted, error } = useSelector(
      (state) =>({
        user:state.auth.user, 
        classes:state.section.classes,
        section:state.section.sections,  
        mounted:state.section.mounted,
        error:state.auth.error
    }), shallowEqual);

    useEffect(() => {
        if(!mounted){
            dispatch(fetchClass());
        }
        else{
            const curr = classes[0].sections
            let output = []
            for (let j = 0; j < classes.length; j++){
                output.push([])
                if(classes[j].sections)
                {
                    for (let i = 0; i < classes[j].sections.length; i++) {
                        if(isNumeric(curr[i]) && curr[i] !== ' '){
                            output[j].push(curr[i])
                        }
                    }
                }
            }
            setSectionList(output);}
    }, [mounted,dispatch]);
    
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        for (let i = 0; i < str.length; i++) {
            if(isNaN(str[i]) && isNaN(parseFloat(str[i]))){
                return false;
            }
        }
        return true;
    }

    function newClass(e){
        if(!isNumeric(classNumber)){
            const info= {
                error:"Class number must be all numbers",
                status:999
            }
            return dispatch(setError(info));
        }
        else{
            dispatch(createClass(classNumber, user.id))
        }
        setClassNumber("");
    }

    function newSection(e){
        if(!isNumeric(sectionNumber)){
            e.preventDefault();
            const info= {
                error:"Section number must be all numbers",
                status:999
            }
            return dispatch(setError(info));
        }
        else if(sectionList[classKey].includes(sectionNumber)){
            e.preventDefault();
            const info= {
                error:"Section already exist",
                status:998
            }
            return dispatch(setError(info));
        }
        else{
            e.preventDefault();
            dispatch(createSection(classID, sectionNumber, user.id, selectedClass))
        }

    }

    function handleChange(value, number, classNumber, index){
        console.log(value)
        setClassKey(index);
        setClassID(number);
        setSelectedClass(classNumber);
        setSectionNumber(value);
    }

    return (
        <>
        {
            mounted && sectionList
            ?
                <Stack gap={3}>
                    <Card className='p-5'>
                        <Card.Title>Add New Class</Card.Title>
                        <Form onSubmit={newClass}>
                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                <Form.Control type="text" placeholder="Class number" value={classNumber} onChange={e=>setClassNumber(e.target.value)} required></Form.Control>
                                <Form.Label>Class number</Form.Label>
                            </Form.Floating>
                            <Button type='submit' variant='dark' className='mt-3 w-100 p-2'>
                                <h3>Add Class</h3>
                            </Button>
                        </Form>
                    </Card>
                    {
                        classes.map((clas, index) =>(
                            <Card key={index}>
                                <Card.Header className='p-4'>
                                    <h4>Class: {clas.number}</h4>
                                    <Row>
                                        <Col>
                                            <Button variant='info' className='w-100 p-2'>
                                                <h3>Edit</h3>
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button variant='danger' className='w-100 p-2'>
                                                <h3>Delete</h3>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body>
                                <Stack gap={3}>
                                    {
                                        clas.sections
                                        ?
                                            <Stack gap={3}>
                                                {
                                                    sectionList.map((sec, ind) => (
                                                        index === ind
                                                        ?
                                                        <>
                                                                {
                                                                    sec.map((data) =>(
                                                                        <>
                                                                        <Card className='p-3' onClick={()=>openEditBox(clas.number,data)}>
                                                                            <Card.Title>Section: {data}</Card.Title>
                                                                        </Card>
                                                                        <Modal show={editing} onHide={closeEditing}>
                                                                            <Modal.Header closeButton>
                                                                            <Modal.Title>Edit Section {selectedClass}-{selectedSection}</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {error && <Alert variant='danger'>{error}</Alert>}
                                                                                <Form onSubmit={newSection}>
                                                                                    <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                                                        <Form.Control type="text" placeholder="Section number" value={sectionNumber} onChange={e=>handleChange(e.target.value, clas.id, clas.number, index)} required></Form.Control>
                                                                                        <Form.Label>Section number</Form.Label>
                                                                                    </Form.Floating>
                                                                                    <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                                                        <Form.Control type="text" placeholder="Confirm Section number" value={cSectionNumber} onChange={e=>setCSectionNumber(e.target.value)} required></Form.Control>
                                                                                        <Form.Label>Confirm Section number</Form.Label>
                                                                                    </Form.Floating>
                                                                                    <Button type='submit' variant='dark' className='mt-3 w-100 p-2'>
                                                                                        <h3>Add Section</h3>
                                                                                    </Button>
                                                                                </Form>
                                                                            </Modal.Body>
                                                                        </Modal>
                                                                        </>
                                                                    ))
                                                                }
                                                        </>
                                                        :
                                                        <></>
                                                    
                                                    ))
                                                }
                                            </Stack>
                                        :
                                            <h5>This class has no sections</h5>
                                    }
                                </Stack>
                                </Card.Body>
                                <Modal show={adding} onHide={closeAdding}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>New Section</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {error && <Alert variant='danger'>{error}</Alert>}
                                        <Form onSubmit={newSection}>
                                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                <Form.Control type="text" placeholder="Section number" value={sectionNumber} onChange={e=>handleChange(e.target.value, clas.id, clas.number, index)} required></Form.Control>
                                                <Form.Label>Section number</Form.Label>
                                            </Form.Floating>
                                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                <Form.Control type="text" placeholder="Confirm Section number" value={cSectionNumber} onChange={e=>setCSectionNumber(e.target.value)} required></Form.Control>
                                                <Form.Label>Confirm Section number</Form.Label>
                                            </Form.Floating>
                                            <Button type='submit' variant='dark' className='mt-3 w-100 p-2'>
                                                <h3>Add Section</h3>
                                            </Button>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                                <Card.Footer>
                                    <Button className='w-100 p-2' variant="secondary" onClick={showAdding}>
                                        <h3>New Section</h3>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        ))
                    }
                </Stack>
            :
                <h1>Loading</h1>
        }
        </>
    );
}

export default AddSection;
import { selectClasses } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Form, Stack, Alert } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setError } from '../../../../redux/actionCreators/authActionCreator';
import { createClass, createSection, editClass, fetchClass, removeSection, removeClass, editSection } from '../../../../redux/actionCreators/sectionActionCreators';
import "./Section.css"

function Section(props) {
    const [classNumber,setClassNumber] = useState('');
    const [cClassNumber,setCClassNumber] = useState('');
    const [eClassNumber, setEClassNumber] = useState('');
    const [sectionNumber, setSectionNumber] =  useState('');
    const [cSectionNumber, setCSectionNumber] =  useState('');
    const [classID, setClassID] = useState('');
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');
    const [sectionList, setSectionList] = useState([]);
    const [classKey, setClassKey] = useState('');

    const dispatch = useDispatch();    
  
    const { user, classes, mounted, error, status } = useSelector(
      (state) =>({
        user:state.auth.user, 
        classes:state.section.classes,
        mounted:state.section.mounted,
        error:state.auth.error,
        status:state.auth.status
    }), shallowEqual);

    useEffect(() => {
        if(!mounted){
            dispatch(fetchClass());
        }
        else{
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
            setSectionList(output);}
    }, [mounted,dispatch]);
    
    function handleChange(value, clas){
        setClassID(clas.id);
        setSelectedClass(clas);
        setSectionNumber(value);
    }

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
        else if(classNumber !== cClassNumber){
            const info= {
                error:"Class numbers do not match",
                status:999
            }
            return dispatch(setError(info));
        }
        else{
            dispatch(createClass(classNumber, user.id))
        }
        setClassNumber("");
    }

    function deleteClass(id){
        dispatch(removeClass(id));
    }

    const [confirm, setConfirm] = useState(false);
    const closeConfirm = () => setConfirm(false);
    function showConfirm(clas){
        const info= {
            status: 101,
            error:"",
        };
        dispatch(setError(info));
        setConfirm(true);
        setSelectedClass(clas.number);
        setClassID(clas.id);
    }
    function updateClass(){
        dispatch(editClass(classID, eClassNumber));
        closeConfirm();
    }
    
    const [adding, setAdding] = useState(false);
    const closeAdding = () => setAdding(false);
    function showAdding(clas, index){
        const info= {
            status: 101,
            error:"",
        };
        dispatch(setError(info));
        setClassID(clas.id);
        setSelectedClass(clas);
        setClassKey(index);
        setAdding(true);
    }
    
    function newSection(e){
        if(!isNumeric(sectionNumber)){
            e.preventDefault();
            const info= {
                error:"Section number must be all numbers",
                status:999
            }
            setCSectionNumber("");
            setSectionNumber("");
            return dispatch(setError(info));
        }
        else if(sectionList[classKey].includes(sectionNumber)){
            e.preventDefault();
            const info= {
                error:"Section already exist",
                status:506
            }
            setCSectionNumber("");
            setSectionNumber("");
            return dispatch(setError(info));
        }
        else{
            e.preventDefault();
            dispatch(createSection(classID, sectionNumber, user.id, selectedClass.number));
            closeAdding();
            setCSectionNumber("");
            setSectionNumber("");
        }

    }
    
    const [editing, setEditing] = useState(false);
    const closeEditing = () => setEditing(false);
    function openEditing(clas,sectionNumber){
        const info= {
            status: 101,
            error:"",
        };
        dispatch(setError(info));
        setSelectedSection(sectionNumber)
        setSelectedClass(clas)
        console.log(selectedClass)
        setEditing(true)
        if(!isNumeric(eClassNumber)){
            const info= {
                error:"Class number must be all numbers",
                status:999
            }
            setCSectionNumber("");
            setSectionNumber("");
            return dispatch(setError(info));
        }
    }

    function updateSection(){
        if(!sectionNumber || !cSectionNumber || sectionNumber !== cSectionNumber){
            const info= {
                error:"Section number and confirm section must match",
                status:999
            }
            return dispatch(setError(info))
        }
        else{
            let temp = selectedClass.sections
            console.log(selectedClass)
            let curr = []
            for (let i = 0; i < temp.length; i++) {
                if(isNumeric(temp[i]) && temp[i] !== ' '){
                    if(temp[i] === sectionNumber){
                        const info= {
                            error:"Section already exists",
                            status:506
                        }
                        return dispatch(setError(info))
                    }
                    curr.push(temp[i])
                }
            }
            curr.push(sectionNumber)
            temp = curr.filter(element => element !== selectedSection)
            curr = temp[0]
            if(temp.length > 1){
                for (let i = 1; i < temp.length; i++) {
                    if(isNumeric(temp[i]) && temp[i] !== ' '){
                        curr += " ,"
                        curr += temp[i]
                    }
                }
            }
            selectedClass.sections = curr;
            dispatch(editSection(selectedClass));
            closeEditing();
        }
    }

    function deleteSection(){
        let temp = selectedClass.sections
        let curr = []
        for (let i = 0; i < temp.length; i++) {
            if(isNumeric(temp[i]) && temp[i] !== ' '){
                curr.push(temp[i])
            }
        }
        temp = curr.filter(element => element !== selectedSection)
        curr = temp[0]
        if(temp.length > 1){
            for (let i = 1; i < temp.length; i++) {
                if(isNumeric(temp[i]) && temp[i] !== ' '){
                    curr += " ,"
                    curr += temp[i]
                }
            }
        }
        selectedClass.sections = curr;
        dispatch(editSection(selectedClass));
        closeEditing();
    }

    return (
        <>
        {
            mounted && sectionList
            ?
                <Stack gap={3}>
                {error && status === 999 && <Alert variant="danger">{error}</Alert>}
                    <Card className='p-4'>
                        <Card.Title>Add New Class</Card.Title>
                        <Form onSubmit={newClass}>
                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                <Form.Control type="number" placeholder="Class number" value={classNumber} onChange={e=>setClassNumber(e.target.value)} required></Form.Control>
                                <Form.Label>Class number</Form.Label>
                            </Form.Floating>
                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                <Form.Control type="number" placeholder="Confirm class number" value={cClassNumber} onChange={e=>setCClassNumber(e.target.value)} required></Form.Control>
                                <Form.Label>Confirm class number</Form.Label>
                            </Form.Floating>
                            <Button type='submit' variant='dark' className='mt-3 p-2'>
                                Add Class
                            </Button>
                        </Form>
                    </Card>

                    <Modal show={confirm} onHide={closeConfirm}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Modification</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            {
                                eClassNumber
                                ?
                                <div className='mt-3'>
                                    <p>{`${selectedClass} ------> ${eClassNumber}`}</p>
                                    <Button type='submit' variant='success' className='my-3 p-2' onClick={updateClass}>
                                        Confirm
                                    </Button>
                                </div>
                                :
                                <Alert variant='danger'>New class number cannot be blank</Alert>
                            }
                        </Modal.Body>
                    </Modal>
                    {
                        classes.map((clas, index) =>(
                            <Card key={index}>
                                <Card.Header className='p-4'>
                                    <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                        <Form.Control type="number" placeholder={`Class: ${clas.number}`} value={eClassNumber} onChange={e=>setEClassNumber(e.target.value)} required></Form.Control>
                                        <Form.Label><h4>Class: {clas.number}</h4></Form.Label>
                                    </Form.Floating>
                                    <div className='mt-3'>
                                        <Button variant='success' className='p-2'  onClick={()=>showConfirm(clas)}>
                                            Save
                                        </Button>
                                        <Button variant='danger' className='p-2 mx-3'  onClick={()=>deleteClass(clas.id)}>
                                            Delete
                                        </Button>
                                    </div>
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
                                                                        <Card className='section_box' onClick={()=>openEditing(clas,data)}>
                                                                            <Card.Title>Section: {data}</Card.Title>
                                                                        </Card>
                                                                        <Modal show={editing} onHide={closeEditing}>
                                                                            <Modal.Header closeButton>
                                                                            <Modal.Title>Edit Section {selectedClass.number}-{selectedSection}</Modal.Title>
                                                                            </Modal.Header>
                                                                            <Modal.Body>
                                                                                {error && <Alert variant='danger'>{error}</Alert>}
                                                                                <Form>
                                                                                    <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                                                        <Form.Control type="number" placeholder="Section number" value={sectionNumber} onChange={e=>handleChange(e.target.value, clas)} required></Form.Control>
                                                                                        <Form.Label>New Section number</Form.Label>
                                                                                    </Form.Floating>
                                                                                    <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                                                        <Form.Control type="number" placeholder="Confirm section number" value={cSectionNumber} onChange={e=>setCSectionNumber(e.target.value)} required></Form.Control>
                                                                                        <Form.Label>Confirm section number</Form.Label>
                                                                                    </Form.Floating>
                                                                                    <div className='mt-3'>
                                                                                        <Button variant='success' className='p-2 ' onClick={() => updateSection()}>
                                                                                            Save
                                                                                        </Button>
                                                                                        <Button variant='danger' className='mx-3 p-2' onClick={() => deleteSection()}>
                                                                                            Delete Section
                                                                                        </Button>
                                                                                    </div>
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
                                        <Modal.Title>New Section in {selectedClass.number}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {error && <Alert variant='danger'>{error}</Alert>}
                                        <Form onSubmit={newSection}>
                                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                <Form.Control type="number" placeholder="Section number" value={sectionNumber} onChange={e=>setSectionNumber(e.target.value)} required></Form.Control>
                                                <Form.Label>Section number</Form.Label>
                                            </Form.Floating>
                                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                <Form.Control type="number" placeholder="Confirm Section number" value={cSectionNumber} onChange={e=>setCSectionNumber(e.target.value)} required></Form.Control>
                                                <Form.Label>Confirm Section number</Form.Label>
                                            </Form.Floating>
                                            <Button type='submit' variant='dark' className='mt-3 p-2'>
                                                Add Section
                                            </Button>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                                <Card.Footer>
                                    <Button className='p-2' variant="secondary" onClick={()=>showAdding(clas, index)}>
                                        New Section
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

export default Section;
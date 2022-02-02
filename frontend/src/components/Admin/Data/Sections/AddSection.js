import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Form, Stack } from 'react-bootstrap';
import { Divider } from "@mui/material"
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setError } from '../../../../redux/actionCreators/authActionCreator';
import { createClass, createSection, fetchClass } from '../../../../redux/actionCreators/sectionActionCreators';

function AddSection(props) {
    const [classNum,setClassNum] = useState("");
    const [secNum, setSecNum] =  useState("");
    const [classID, setClassID] = useState("");
    const [selClass, setSelClass] = useState("");
    const [secList, setSecList] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();    
  
    const { user, classes, section, mounted } = useSelector(
      (state) =>({
        user:state.auth.user, 
        classes:state.section.classes,
        section:state.section.sections,  
        mounted:state.section.mounted
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
                for (let i = 0; i < classes[j].sections.length; i++) {
                    if(isNumeric(curr[i]) && curr[i] !== ' '){
                        output[j].push(curr[i])
                    }
                }
            }
            setSecList(output);}
    }, [mounted,dispatch]);
    console.log(secList);
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
        if(!isNumeric(classNum)){
            const info= {
                error:"Class number must be all numbers",
                status:999
            }
            return dispatch(setError(info));
        }
        else{
            dispatch(createClass(classNum, user.id))
        }
        setClassNum("");
    }

    function newSection(e){
        e.preventDefault();
        let secList = [secNum]
        console.log(secNum);
        console.log(classID)
        console.log(selClass)
        if(!isNumeric(secNum)){
            const info= {
                error:"Section number must be all numbers",
                status:999
            }
            return dispatch(setError(info));
        }
        else{
            dispatch(createSection(classID, secList, user.id, selClass))
        }

    }

    function handleChange(value, number, classNumber){
        setClassID(number);
        setSelClass(classNumber);
        setSecNum(value);
    }

    return (
        <>
        {
            mounted && secList
            ?
                <Stack gap={3}>
                    <Card className='p-5'>
                        <Card.Title>Add New Class</Card.Title>
                        <Form onSubmit={newClass}>
                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                <Form.Control type="text" placeholder="Class number" value={classNum} onChange={e=>setClassNum(e.target.value)} required></Form.Control>
                                <Form.Label>Class number</Form.Label>
                            </Form.Floating>
                            <Button type='submit' variant='dark' className='mt-3 w-100'>Add Class</Button>
                        </Form>
                    </Card>
                    {
                        classes.map((clas, index) =>(
                            <Card key={index} className='p-5'>
                                <Card.Title>
                                    Class Number: {clas.number}
                                </Card.Title>
                                <Divider className='my-3'/>
                                <Stack gap={3}>
                                    {
                                        clas.sections
                                        ?
                                            <>
                                            {
                                                secList.map((sec, ind) => (
                                                        index === ind
                                                        ?
                                                        <Card key={ind}  className='p-5'>
                                                            <Card.Title>
                                                                {
                                                                    sec.map((data) =>(
                                                                        <p>Sections: {data}</p>
                                                                    ))
                                                                }
                                                            </Card.Title>   
                                                        </Card>
                                                        :
                                                        <></>
                                                    
                                                ))
                                            }
                                            </>
                                        :
                                            <h5>This class has no sections</h5>
                                    }
                                    <Button variant="secondary" onClick={handleShow}>
                                        New Section
                                    </Button>
                                </Stack>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>New Section</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={newSection}>
                                            <Form.Floating id="class" style={{marginTop: "1rem"}} >
                                                <Form.Control type="text" placeholder="Section number" value={secNum} onChange={e=>handleChange(e.target.value, clas.id, clas.number)} required></Form.Control>
                                                <Form.Label>Section number</Form.Label>
                                            </Form.Floating>
                                            <Button type='submit' variant='dark' className='mt-3 w-100'>Add Section</Button>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
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
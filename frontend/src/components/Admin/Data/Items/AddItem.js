import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkUser } from "../../../../redux/actionCreators/authActionCreator";
import { fetchItems } from '../../../../redux/actionCreators/itemActionCreators';
import { createItem } from '../../../../redux/actionCreators/itemActionCreators';

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'

import { Container } from '@mui/material';

function AddItem() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [filt, setFilt] = useState([]);

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");
    const [serial_number,setSerial_number] = useState("");
    const [image,setImage] = useState("");

    const { isLoggedIn, username, isLoading, items, user } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            username:state.auth.username,
            isLoading:state.item.isLoading,
            user:state.auth.user, 
            items:state.item.items
    }), shallowEqual);

    useEffect(() => {
      if(isLoading){
        dispatch(fetchItems());
      }
    }, [setFilt,  isLoading,dispatch]);

    useEffect(() => {
        if(items){
            let gList = items.map((it) => it.type)
            const temp = [...new Set(gList)]
            setFilt(temp)
        }
    }, [items, setFilt])

    function handleSubmit(e){
        e.preventDefault();

        // Code here
        // Okay I need to send out the following data
        const data = {
            name: name,
            description: description,
            type: type,
            ser_no: serial_number,
            image: image,

            // total: '1',
            // out: '0',
            // available : '1'
        }

        // console.log(data)

        dispatch(createItem(data, user.id));
    }

    console.log(isLoggedIn)

    return (
        <Stack gap={2} className="col-md-5 mx-auto">
            <Card>
                <Card.Body>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control type="Text" placeholder="Enter Item Name" value={name} onChange={e=>setName(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formItemDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="Text" placeholder="Enter Description" value={description} onChange={e=>setDescription(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSelectType">
                    <Form.Label>Type</Form.Label>
                    <Form.Select defaultValue="Choose..." value={type} onChange={e=>setType(e.target.value)} required>
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>

                <InputGroup className="mb-3" >
                    <InputGroup.Text id="inputGroup-sizing-default" >Serial Number</InputGroup.Text>
                    <FormControl aria-label="Serial Number" aria-describedby="inputGroup-sizing-default" placeholder="Scan Item" value={serial_number} onChange={e=>setSerial_number(e.target.value)} required/>
                </InputGroup>

                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Upload Image of Item</Form.Label>
                    <Form.Control type="file" size="md" value={image} onChange={e=>setImage(e.target.value)} required/>
                </Form.Group>

                <div class ="Container d-flex justify-content-between">
                    
                   
                    <Button class="btn btn-primary w-auto" href="/dashboard">Back</Button> 
                    <Button class="btn btn-primary w-auto" type="submit">Submit</Button>
                   
                </div>

            </Form>
            </Card.Body>
            </Card>
        </Stack>
    );
}

export default AddItem;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkUser } from "../../../../redux/actionCreators/authActionCreator";
import { fetchItems, setLoading } from '../../../../redux/actionCreators/itemActionCreators';
import { createItem } from '../../../../redux/actionCreators/itemActionCreators';
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal';

import { Container } from '@mui/material';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

import { useBarcode } from 'react-barcodes';
import Barcode from 'react-barcode';

function AddItem() {

    const dispatch = useDispatch();
    const [filt, setFilt] = useState([]);
    const [showModal, setModal] = useState(false)

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("Select a Type ...");
    const [newType, setNewType] = useState('');
    const [serial_number,setSerial_number] = useState("");
    const [avail,setAvail] = useState("");
    const [out,setOut] = useState("");
    const [total,setTotal] = useState("");

    const [error, setError] = useState("");
    const [initializer, setInitializer] = useState(0);

    const [activeGenBar, setGenBarCode] = useState(false);

    function ActivateBar(){
        setGenBarCode(true);

        // Now I need to generate a code based on that and display its content
        
    }
    const deactivateBar = () => setGenBarCode(false);
    
    const { isLoggedIn, username, isLoading, items, user, } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            username:state.auth.username,
            isLoading:state.item.isLoading,
            user:state.auth.user, 
            items:state.item.items,
    }), shallowEqual);

    useEffect(() => {
      if(isLoading){
        dispatch(fetchItems());
      }
    }, [setFilt,  isLoading,dispatch]);

    useEffect(() => {
        if(items){
            var tempID = items[(items.length)-1].id
            var holder = 'UTA-'
            for(var i=0; i < 10-String(tempID).length;i++){
                holder = holder + '0'
            }
            setSerial_number(holder + String(tempID))

            let gList = items.map((it) => it.type)
            const temp = [...new Set(gList)]
            setFilt(temp)


        }
    }, [items, setFilt])


    function SendSuccess(prop) {
        return (
            <>
            <Modal {...prop} size="lg" aria-labelledby="contained-modal-title-vcenter" centered keyboard>
                <ModalHeader closeButton></ModalHeader>
                <Modal.Body >
                <h5 className='text-center'>Item {prop.name} Successfully Added</h5>
                </Modal.Body>
            </Modal>
          </>
        );
      }

    const onPrintBarcode = () => {
    var container = document.getElementById("div-svg");
    var mySVG = document.getElementById("barcode-canvas");
    
    var width  = window.innerWidth
    var height = window.innerHeight
    
    var printWindow = window.open('', 'PrintMap','width=' + width + ',height=' + height);
    printWindow.document.writeln(container.innerHTML);
    
    
    printWindow.document.close();
    printWindow.print();
    };

    function getNextSerialNumber(){
        return serial_number
    } 
    
    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();

        onPrintBarcode()

        if (type === 'Select a Type ...'){
            // console.log(type)
            setError("Please Select a Type")
            setInitializer(1)
        }
        else{
            
            let data = {
                'name' : name,
                'type' : type,
                'description' : description,
                'total' : total,
                'out': out,
                'available': avail,
                'ser_no': serial_number
            }

            // console.log(data)

            let formData = new FormData()

            formData.append('name', name);

            if (newType !== '' && type !== 'Select a Type ...'){
                formData.append('type', newType);
            }
            else{
                formData.append('type', type);
            }
            formData.append('description', description);
            formData.append('total', total);
            formData.append('out', out);
            formData.append('available', avail);
            formData.append('ser_no', serial_number);

            axios.post("http://127.0.0.1:8000/createitem/", formData, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then(res => {
                setModal(true)
                
                setName("")
                setDescription("")
                setType("Select a Type ...")
                setNewType('')
                setSerial_number("")
                setAvail("")
                setOut("")
                setTotal("")    

                dispatch(setLoading(true))
            })
            .catch(err => console.log(err))
        
            // dispatch(createItem(data, user.id));
        }
        
    };


    return (
        <>
            <SendSuccess Name={name} show={showModal} onHide={() => setModal(false)}/>
            <Card>
                <Card.Body>
                    <Form id='entireForm' onSubmit={handleSubmit}>
                        <Row>

                            <Col className='py-3 px-4'>
                                <Form.Group className="mb-3" controlId="formItemName">
                                    <Form.Label >Item Name</Form.Label>
                                    <Form.Control type="Text" placeholder="Enter Item Name" value={name} onChange={e=>setName(e.target.value)} required/>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Row>
                                    <Col className='py-3 px-4'>
                                        <Form.Group className="mb-3" controlId="formItemAvail">
                                        <Form.Label>Available</Form.Label>
                                        <Form.Control type="Text" placeholder="0" value={avail} onChange={e=>setAvail(e.target.value)} required/>
                                        </Form.Group>
                                    </Col>

                                    <Col className='py-3 px-0'>
                                        <Form.Group className="mb-3" controlId="formItemOut">
                                            <Form.Label>Out</Form.Label>
                                            <Form.Control type="Text" placeholder="0" value={out} onChange={e=>setOut(e.target.value)} required/>
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col className='py-3 px-4'>
                                        <Form.Group className="mb-3" controlId="formItemTotal">
                                            <Form.Label>Total</Form.Label>
                                            <Form.Control type="Text" placeholder="0" value={total} onChange={e=>setTotal(e.target.value)} required/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>

                        <Row>
                            <Form.Group className='pt-0 px-4 ' controlId="formItemDescription">
                                <Form.Label>Description</Form.Label>
                                {/* <Form.Control type="Text" placeholder="Enter Description" value={description} onChange={e=>setDescription(e.target.value)} required/> */}
                                <Form.Control as="textarea" placeholder="Enter Description ..." value={description} onChange={e=>setDescription(e.target.value)} required rows={3} />
                            </Form.Group>
                        </Row>
                        
                        <Row>
                            <Form.Group className="pt-4 pb-1 px-4" controlId="formSelectType">
                                <Form.Label>Type</Form.Label>
                                <Form.Select value={type} onChange={e=>setType(e.target.value)} isInvalid={ type === 'Select a Type ...' && initializer ? 1 : 0 }>
                                <option>Select a Type ...</option>
                                <option>Add New Type</option>
                                {
                                    filt.map((opt, index) =>(
                                        <option key={opt}>{opt}</option>
                                    ))
                                } 
                                        
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>

                                </Form.Group >
                                {
                                    type === 'Add New Type'
                                    ?
                                        <InputGroup size="sm" className="pt-0 pb-3 px-4">
                                            <InputGroup.Text id="inputGroup-sizing-sm">New Type</InputGroup.Text>
                                            <FormControl placeholder='Enter New Type' aria-label="Small" value={newType} onChange={e=>setNewType(e.target.value)} aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                    :
                                    <></>
                                }
                        </Row>
                            
                        <Row>
                            {
                                activeGenBar 
                                ?   

                                <Col>
                                    <div id='div-svg'>
                                        {/* <svg id="barcode-canvas" ref={inputRef} /> */}
                                    </div>
                                    {/* // <InputGroup className="py-3 px-4" >
                                    //     <InputGroup.Text id="inputGroup-sizing-default" >Serial Number</InputGroup.Text>
                                    //     <FormControl aria-label="Serial Number" aria-describedby="inputGroup-sizing-default" placeholder="Enter Serial Number e.g {UTA-0000000001}" value={serial_number} onChange={e=>setSerial_number(e.target.value)} required/>
                                    // </InputGroup> */}
                                </Col>
                                :
                                <Col>
                                        {/* Saving for later if custon barcodes */}
                                        {/* <div className="d-grid px-3 pt-3">
                                            <Button onClick={()=>ActivateBar()}variant="success" size="md">Generate Barcode Serial Number</Button>
                                        </div> */}
                                    <Col md={{ span: 6, offset: 3 }} className="d-flex justify-content-center pt-4 pb-2">
                                        <div id='div-svg'>
                                            {/* <svg classname='justify-center' id="barcode-canvas" ref={inputRef} /> */}
                                            <Barcode value={getNextSerialNumber()} background= '#ffffff' height= '60' width= '1.2' fontSize='18'></Barcode>
                                        </div>
                                    </Col>
                                </Col>
                            }
                        </Row>
                        
                        <Row>
                            <div className ="Container d-flex justify-content-between py-3 px-4">
                                <Button className="btn btn-primary w-auto" href="/dashboard">Back</Button> 
                                <Button className="btn btn-primary w-auto" type="submit">Submit</Button>
                            </div>
                        </Row>
                        
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}

export default AddItem;
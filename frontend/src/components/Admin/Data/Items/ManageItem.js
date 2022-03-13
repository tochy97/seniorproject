import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchItems } from '../../../../redux/actionCreators/itemActionCreators';
import { Button, Dropdown, DropdownButton, Pagination, Table, ToggleButton, Modal, Card, InputGroup, Container } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import { Row } from 'react-bootstrap';

import axios from 'axios';
import { setLoading } from '../../../../redux/actionCreators/itemActionCreators';
import Loading from '../../../Loading/Loading';

function ManageItem() {

    const dispatch = useDispatch();

    const [filt, setFilt] = useState([]);
    const [buck, setBuck] = useState([]);
    const [error, setError] = useState("");

    const [updateItem, setUpdate] = useState(false);
    const [deleteItem, setDelete] = useState(false);

    const closeEdit = () => setUpdate(false);
    const closeDelete = () => setDelete(false);

    const [selectedRow, setSelectedRow] = useState([]);
    const [currentCell, setCurrentCell] = useState([]);

    const [newName, setNewName] = useState("");
    const [newDescription,setNewDescription] = useState("");
    const [newType, setNewType] = useState("");
    const [newNewType, setNewNewType] = useState('');
    const [newSerial_number,setNewSerial_number] = useState("");
    const [newAvail,setNewAvail] = useState("");
    const [newOut,setNewOut] = useState("");
    const [newTotal,setNewTotal] = useState("");

    const [initializer, setInitializer] = useState(0);


    function editItemState(material){
        setUpdate(true);
        setCurrentCell(material);

        if (newName === "" || 1){
            setNewName(material.name)
        }
        if (newName === "" || 1){
            setNewName(material.name)
        }
        if (newDescription === ""|| 1){
            setNewDescription(material.description)
        }
        if (newType === ""|| 1){
            setNewType(material.type)
        }
        if (newNewType === "" || 1){
            setNewNewType("")
        }
        if (newAvail === ""|| 1){
            setNewSerial_number(material.ser_no)
        }
        if (newAvail === ""|| 1){
            setNewAvail(material.available)
        }
        if (newOut === ""|| 1){
            setNewOut(material.out)
        }
        if (newTotal === ""|| 1){
            setNewTotal(material.total)
        }

        console.log(currentCell);
    };
    function deleteItemState(material){
        setDelete(true);
        setCurrentCell(material);
        console.log(currentCell);
    };
    

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
    }, [setBuck, isLoading, dispatch]);
  
    useEffect(() => {
        if(!isLoading){
            let gList = items.map((it) => it.type)
            const temp = [...new Set(gList)]
            setFilt(temp)
        }
    }, [isLoading, setFilt])


    function handleDelete(data){
 
        // console.log(data.id)

        axios.delete(`http://127.0.0.1:8000/items/${data.id}/`, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
            }
        })
        .then(res => {
            closeDelete()
            dispatch(setLoading(true))
        })
            .catch(err => console.log(err))
        
    };

    function handleUpdate(data){
 
        if (newType === 'Select a Type ...'){
            setError("Please Select a Type")
            setInitializer(1)
        }
        else{
            
            // console.log(data)

            let formData = new FormData()

            formData.append('name', newName);
            console.log(newName)

            if (newNewType !== '' && newType !== 'Select a Type ...'){
                formData.append('type', newNewType);
                console.log(newNewType)
            }
            else{
                formData.append('type', newType);
                console.log(newType)
            }

            formData.append('description', newDescription);
            console.log(newDescription)
            formData.append('total', newTotal);
            console.log(newTotal)
            formData.append('out', newOut);
            console.log(newOut)
            formData.append('available', newAvail);
            console.log(newAvail)
            formData.append('ser_no', newSerial_number);
            console.log(newSerial_number)

            axios.put(`http://127.0.0.1:8000/items/${data.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                }
            })
            .then(res => {
                closeEdit()
                dispatch(setLoading(true))

            })
                .catch(err => console.log(err))
        }
        
    };

    // function EditItem() {
    //     return (
    //         <>
    //         <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered keyboard>
    //             <Modal.Body >
    //                 {/* <Card> */}
    //                     {/* <Card.Body> */}
    //                         <Form >
    //                             <Row>

    //                                 <Col className='py-3 px-4'>
    //                                     <Form.Group className="mb-3" controlId="formItemNames">
    //                                         <Form.Label >Item Name</Form.Label>
    //                                         <Form.Control type="Text" defaultValue={currentCell.name} onChange={e => setNewName(e.target.value)} required/>
    //                                     </Form.Group>
    //                                 </Col>

    //                                 <Col>
    //                                     <Row>
    //                                         <Col className='py-3 px-4'>
    //                                             <Form.Group className="mb-3" controlId="formItemAvail">
    //                                             <Form.Label>Available</Form.Label>
    //                                             <Form.Control type="Text" defaultValue={currentCell.available}/>
    //                                             </Form.Group>
    //                                         </Col>

    //                                         <Col className='py-3 px-0'>
    //                                             <Form.Group className="mb-3" controlId="formItemOut">
    //                                                 <Form.Label>Out</Form.Label>
    //                                                 <Form.Control type="Text" defaultValue={currentCell.out}/>
    //                                             </Form.Group>
    //                                         </Col>
                                            
    //                                         <Col className='py-3 px-4'>
    //                                             <Form.Group className="mb-3" controlId="formItemTotal">
    //                                                 <Form.Label>Total</Form.Label>
    //                                                 <Form.Control type="Text" defaultValue={currentCell.total}/>
    //                                             </Form.Group>
    //                                         </Col>
    //                                     </Row>
    //                                 </Col>

    //                             </Row>

    //                             <Row>
    //                                 <Form.Group className='pt-0 px-4 ' controlId="formItemDescription">
    //                                     <Form.Label>Description</Form.Label>
    //                                     {/* <Form.Control type="Text" placeholder="Enter Description" value={description} onChange={e=>setDescription(e.target.value)} required/> */}
    //                                     <Form.Control as="textarea" defaultValue={currentCell.description} rows={3} />
    //                                 </Form.Group>
    //                             </Row>
                                
    //                             <Row>
    //                                 <Form.Group className="pt-4 pb-1 px-4" controlId="formSelectType">
    //                                     <Form.Label>Type</Form.Label>
    //                                     {/* <Form.Select value={type} onChange={e=>setType(e.target.value)} isInvalid={ type === 'Select a Type ...' && initializer ? 1 : 0 }> */}
    //                                     <Form.Select>
    //                                     <option>Select a Type ...</option>
    //                                     <option>Add New Type</option>
    //                                     {/* {
    //                                         filt.map((opt, index) =>(
    //                                             <option key={opt}>{opt}</option>
    //                                         ))
    //                                     }  */}
                                                
    //                                     </Form.Select>
    //                                     {/* <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback> */}

    //                                     </Form.Group >
    //                                     {/* {
    //                                         type === 'Add New Type'
    //                                         ?
    //                                             <InputGroup size="sm" className="pt-0 pb-3 px-4">
    //                                                 <InputGroup.Text id="inputGroup-sizing-sm">New Type</InputGroup.Text>
    //                                                 <FormControl placeholder='Enter New Type' aria-label="Small" value={newType} onChange={e=>setNewType(e.target.value)} aria-describedby="inputGroup-sizing-sm" />
    //                                             </InputGroup>
    //                                         :
    //                                         <></>
    //                                     } */}
    //                             </Row>
                                    
    //                             <Row>
    //                                 <InputGroup className="py-3 px-4" >
    //                                     <InputGroup.Text id="inputGroup-sizing-default" >Serial Number</InputGroup.Text>
    //                                     <FormControl aria-label="Serial Number" aria-describedby="inputGroup-sizing-default" defaultValue={currentCell.ser_no}/>
    //                                 </InputGroup>
    //                             </Row>
                                
    //                             <Row>
    //                                 <div className ="Container d-flex justify-content-between py-3 px-4">
    //                                     <Button className="btn btn-primary w-auto"  onClick={closeEdit} >Cancel</Button> 
    //                                     <Button className="btn btn-primary w-auto"  onClick={() => handleUpdate(currentCell)}>Update</Button>
    //                                 </div>
    //                             </Row>
                                
    //                         </Form>
    //                     {/* </Card.Body> */}
    //                 {/* </Card> */}
    //             </Modal.Body>
    //         </Modal>
    //       </>
    //     );
    //   }

    function DeleteItem(props) {
        return (
            <>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered keyboard>
                <Modal.Body >
                    <Card className="text-center">
                        <Card.Header> {props.name}</Card.Header>
                        <Card.Body className="text-center">
                            <Col>
                            Are you sure you want to delete?
                            <Row>
                                <div className ="Container d-flex justify-content-between py-3 px-4">
                                    <Button className="btn btn-primary w-auto" onClick={closeDelete} >Cancel</Button> 
                                    <Button className="btn btn-primary w-auto" onClick={() => handleDelete(props)} >Delete</Button>
                                </div>
                            </Row>
                            </Col>

                        </Card.Body>
                        
                    </Card>
                </Modal.Body>
            </Modal>
            </>
        );
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [upperBound, setUpperBound] = useState(0);
    const [lowerBound, setLowerBound] = useState(0)

    const nextPage = () => {
        if(currentPage+1 < pageCount)
        {
            setCurrentPage(currentPage + 1)
            setUpperBound(upperBound + ((currentPage)*itemsPerPage));
            setLowerBound(((currentPage)*itemsPerPage));
        }
        else{
            setCurrentPage(pageCount)
            setUpperBound((pageCount*itemsPerPage));
            setLowerBound(((pageCount-1)*itemsPerPage));
        }
    }
    const prevPage = () => {
        if(currentPage !== 1)
        {
            setCurrentPage(currentPage - 1)
            setUpperBound(upperBound-itemsPerPage);
            setLowerBound(lowerBound-itemsPerPage);
        }
    }

    const firstPage = () => {
        setCurrentPage(1);
        setUpperBound(itemsPerPage);
        setLowerBound(0);
    }
    
    const lastPage = () => {
        setCurrentPage(pageCount)
        setUpperBound((pageCount*itemsPerPage));
        setLowerBound(((pageCount-1)*itemsPerPage));
    }
    console.log(lowerBound)
    console.log(upperBound)
    useEffect(() => {
        if(items){
            let gList = items.map((it) => it)
            const temp = [...new Set(gList)]
            setBuck(temp)
            setPageCount(Math.ceil(items.length/7))
            setItemsPerPage(7)
            setUpperBound(itemsPerPage)
        }
    }, [items, setBuck, itemsPerPage])
    return (
        <>      
        <Table striped bordered hover >
        <Modal show={updateItem} onHide={closeEdit} backdrop = 'static' size="lg" aria-labelledby="contained-modal-title-vcenter" centered keyboard>
            <Modal.Body >
                <Form >
                    <Row>

                        <Col className='py-3 px-4'>
                            <Form.Group className="mb-3" controlId="formItemNames">
                                <Form.Label >Item Name</Form.Label>
                                <Form.Control type="Text" defaultValue={currentCell.name} onChange={e => setNewName(e.target.value)} required/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Row>
                                <Col className='py-3 px-4'>
                                    <Form.Group className="mb-3" controlId="formItemAvail">
                                    <Form.Label>Available</Form.Label>
                                    <Form.Control type="Text" defaultValue={currentCell.available} onChange={e => setNewAvail(e.target.value)} required/>
                                    </Form.Group>
                                </Col>

                                <Col className='py-3 px-0'>
                                    <Form.Group className="mb-3" controlId="formItemOut">
                                        <Form.Label>Out</Form.Label>
                                        <Form.Control type="Text" defaultValue={currentCell.out} onChange={e => setNewOut(e.target.value)} required/>
                                    </Form.Group>
                                </Col>
                                
                                <Col className='py-3 px-4'>
                                    <Form.Group className="mb-3" controlId="formItemTotal">
                                        <Form.Label>Total</Form.Label>
                                        <Form.Control type="Text" defaultValue={currentCell.total} onChange={e => setNewTotal(e.target.value)} required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>

                    </Row>

                    <Row>
                        <Form.Group className='pt-0 px-4 ' controlId="formItemDescription">
                            <Form.Label>Description</Form.Label>
                            {/* <Form.Control type="Text" placeholder="Enter Description" value={description} onChange={e=>setDescription(e.target.value)} required/> */}
                            <Form.Control as="textarea" defaultValue={currentCell.description} onChange={e => setNewDescription(e.target.value)} required rows={3} />
                        </Form.Group>
                    </Row>
                    
                    <Row>
                        <Form.Group className="pt-4 pb-1 px-4" controlId="formSelectType">
                            <Form.Label>Type</Form.Label>
                            <Form.Select value={newType} onChange={e=>setNewType(e.target.value)} isInvalid={ newType === 'Select a Type ...' && initializer ? 1 : 0 }>
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
                                newType === 'Add New Type'
                                ?
                                    <InputGroup size="sm" className="pt-0 pb-3 px-4">
                                        <InputGroup.Text id="inputGroup-sizing-sm">New Type</InputGroup.Text>
                                        <FormControl placeholder='Enter New Type' aria-label="Small" value={newNewType} onChange={e=>setNewNewType(e.target.value)} aria-describedby="inputGroup-sizing-sm" required />
                                    </InputGroup>
                                :
                                <></>
                            }
                    </Row>
                        
                    <Row>
                        <InputGroup className="py-3 px-4" >
                            <InputGroup.Text id="inputGroup-sizing-default" >Serial Number</InputGroup.Text>
                            <FormControl aria-label="Serial Number" aria-describedby="inputGroup-sizing-default" defaultValue={currentCell.ser_no} onChange={e => setNewSerial_number(e.target.value)} required/>
                        </InputGroup>
                    </Row>
                    
                    <Row>
                        <div className ="Container d-flex justify-content-between py-3 px-4">
                            <Button className="btn btn-primary w-auto"  onClick={closeEdit} >Cancel</Button> 
                            <Button className="btn btn-primary w-auto"  onClick={() => handleUpdate(currentCell)}>Update</Button>
                        </div>
                    </Row>
                    
                </Form>
            </Modal.Body>
        </Modal>
        <DeleteItem {...currentCell} show={deleteItem} onHide={closeDelete} backdrop = 'static'/>

            <thead>
                <tr>
                    <th>Select</th>
                    <th>Item Name</th>
                    <th>Item Type</th>
                    <th>Item Description</th>
                    <th>Available</th>
                    <th>Out</th>
                    <th>Total</th>
                    <th>Serial Number</th>
                </tr>
            </thead>

            <tbody>
                {
                    !isLoading
                    ?
                        buck.map((it, index) =>(
                            <>
                                {
                                    index <= upperBound && index >= lowerBound
                                    &&
                                    <tr key={index} >
                                        <td>
                                            <div className="d-grid gap-2">
                                                <DropdownButton  size="sm" id={"dropdown-"+index} title={"dropdown-"+it.id}>
                                                    
                                                    <Dropdown.Item eventKey={"dropdown-"+index} onClick={() => editItemState(it)} >
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey={"dropdown-"+index} onClick={() => deleteItemState(it)} >
                                                        Delete
                                                    </Dropdown.Item>
                                                </DropdownButton>
                                            </div>
                                        </td>
                                        <td>{it.name}</td> 
                                        <td>{it.type}</td>
                                        <td>{it.description}</td> 
                                        <td>{it.available}</td>
                                        <td>{it.out}</td>
                                        <td>{it.total}</td>
                                        <td>{it.ser_no}</td>
                                    </tr>
                                }
                            </>
                        ))
                    :
                        <Loading/>
                } 
                
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={7}>
                    <Pagination className="d-flex justify-content-center">
                        <Pagination.First disabled={currentPage === 1} onClick={firstPage}/>
                        <Pagination.Prev disabled={currentPage === 1} onClick={prevPage}/>
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        <Pagination.Next disabled={currentPage === pageCount} onClick={nextPage}/>
                        <Pagination.Last disabled={currentPage === pageCount} onClick={lastPage}/>
                    </Pagination>
                    </td>
                </tr>
            </tfoot>
            
        </Table>
        </>
    );
}

export default ManageItem;
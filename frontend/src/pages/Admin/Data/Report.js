import React, { useEffect, useState } from 'react';
import { fetchItems } from '../../../redux/actionCreators/itemActionCreators';
import { Table, Nav, Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Loading from '../../../components/Loading/Loading';

function Report(props) {

    const dispatch = useDispatch();
    const [filter, setFilter] = useState("all");
  
    const { user, items, isLoading } = useSelector(
      (state) => ({
        user:       state.auth.user, 
        items:      state.item.items,
        isLoading:  state.item.isLoading
    }), shallowEqual);

    useEffect(() => {
        if (isLoading) dispatch(fetchItems());
    }, [isLoading, dispatch]);

    const filters = {
        "all":          (item) => true,
        "available":    (item) => item.available > 0,
        "checkedout":   (item) => item.out > 0,
        "overdue":      (item) => false
    }

    return (<>
        <h1 className='text-center'>Report</h1>

        { !user ? <Loading/> :
        <Nav fill variant="tabs" 
            className='justify-content-centered' 
            defaultActiveKey="all"
            onSelect={(k) => setFilter(k)}>

            <Nav.Item> <Nav.Link 
                eventKey="all"><h5>All</h5></Nav.Link> </Nav.Item>

            <Nav.Item> <Nav.Link 
                eventKey="available"><h5>Available</h5></Nav.Link> </Nav.Item>

            <Nav.Item> <Nav.Link 
                eventKey="checkedout"><h5>Checked Out</h5></Nav.Link> </Nav.Item>

            <Nav.Item> <Nav.Link 
                eventKey="overdue"><h5>Overdue</h5></Nav.Link> </Nav.Item>

        </Nav> }

        <Table striped bordered hover >
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Item Type</th>
                    <th>Location</th>
                    <th>Available</th>
                    <th>Out</th>
                    <th>Total</th>
                    <th>Serial Number</th>
                </tr>
            </thead>

            <tbody>
                { isLoading ? <Loading /> : 
                items
                .filter( filters[filter] )
                .map((it, index) => (<>
                    { <tr key={index} >
                        <td>{it.name}</td> 
                        <td>{it.type}</td>
                        <td>{it.locations}</td>
                        <td>{it.available}</td>
                        <td>{it.out}</td>
                        <td>{it.total}</td>
                        <td>{it.ser_no}</td>
                    </tr> }
                </>) ) } 
            </tbody>
            
        </Table>
    </> );
}

export default Report;
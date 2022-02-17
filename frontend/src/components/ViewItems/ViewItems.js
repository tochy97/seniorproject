import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Card, Container, Row, Button, Nav } from 'react-bootstrap';
import { Divider } from '@mui/material';
import { checkUser } from '../../redux/actionCreators/authActionCreator';
import { fetchItems } from '../../redux/actionCreators/itemActionCreators';
import Loading from '../Loading/Loading';

function ViewItems() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [filt, setFilt] = useState([])
    const [selTab, setselTab] = useState("")

    const { isLoggedIn, username, isLoading, items } = useSelector(
        (state) =>({
            isLoggedIn:state.auth.isLoggedIn, 
            username:state.auth.username,
            isLoading:state.item.isLoading,
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

    console.log(isLoggedIn)

    return (
        <Card className="py-4" style={{border:0}}>
            {
                !isLoggedIn
                ?
                <>Not Logged int</>
                :
                <Row className="px-5 my-6 gap-5">
                    {
                        !items
                        ? 
                            <Loading/>
                        : 
                            <>
                                <Divider className='p-5'><h1>Inventory</h1></Divider>
                                
                                <Nav variant='tabs' className="justify-content-center" defaultActiveKey="all" onSelect={(selectedKey) => setselTab(selectedKey)}>
                                    {
                                        selTab === ""
                                        ?
                                        setselTab("all")
                                        :
                                        <></>
                                    }
                                    <Nav.Item>
                                        <Nav.Link eventKey="all">All</Nav.Link>
                                    </Nav.Item>
                                    {
                                        filt.length > 0
                                        ?
                                        filt.map((it, index) => (
                                            <Nav.Item key={index}>
                                                <Nav.Link eventKey={it}>{it}</Nav.Link>
                                            </Nav.Item>
                                        ))
                                        :
                                        <></>
                                    }
                                </Nav>
                                {   
                                    selTab !== 'all'
                                    ?
                                        <>
                                        {/* {console.log("1 Printing " + selTab)} */}
                                        {
                                            items.map((its, index) =>(
                                                selTab === its.type
                                                ?
                                                    <Card className="col-md-3 mx-auto px-0" key={index}>
                                                        {/* <Card.Img variant="top" src="https://testbucketuta.s3.us-east-2.amazonaws.com/istockphoto-1278998606-170667a.jpg" /> */}
                                                        <Card.Img variant="top" src={its.image}/>
                                                            <Card.Body>
                                                                <Card.Text style={{padding:"0rem"}}>
                                                                    Title: {its.name} <br/>
                                                                    Description: {its.description } <br/>
                                                                    Available: {its.available} <br/> 
                                                                    Out: {its.out}
                                                                </Card.Text>
                                                            </Card.Body>
                                                    </Card>
                                                :
                                                    <></>
                                            ))
                                        }
                                        </>
                                    :
                                        <>
                                        {/* {console.log("2 Printing " + selTab)} */}
                                        
                                        {
                                            items.map((its, index) =>(
                                                    <Card className="col-md-3 mx-auto px-0" key={index}>
                                                        <Card.Img variant="top" src={its.image} />
                                                            <Card.Body>
                                                                <Card.Text style={{padding:"0rem"}}>
                                                                {console.log(its.image)}
                                                                    Title: {its.name} <br/>
                                                                    Description: {its.description } <br/>
                                                                    Available: {its.available} <br/> 
                                                                    Out: {its.out}
                                                                </Card.Text>
                                                            </Card.Body>
                                                    </Card>
                                            ))
                                        }
                                        </>
                                }
                                
                            </>
                    }
                </Row>
            }
        </Card>
    );
}

export default ViewItems;
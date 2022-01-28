import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Button, Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col'

function Dashboard() {
    const dispatch = useDispatch();    
  
    const { isLoggedIn, id, status } = useSelector(
      (state) =>({
        isLoggedIn:state.auth.isLoggedIn, 
        id:state.auth.user_id
    }), shallowEqual);

    const dashElements = [
        "View Inventory",
        "Profile",
        "----",
        "----"
    ]
    const hrefIndex = [
        "/viewitems",
        "/profile",
        "/#",
        "/#"
    ]

    return (
        <Container>
            <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
                <Col>
                    {/* <Card style={{ backgroundColor: "#F58025" }} > */}
                    <Card >
                        <Card.Img src="https://testbucketuta.s3.us-east-2.amazonaws.com/istockphoto-1278998606-170667a.jpg"/>
                        <Card.ImgOverlay>
                            {/* <Container> */}
                                <div class ="text-center">
                                    <Button  href={hrefIndex[idx]}>{dashElements[idx]}</Button> 
                                </div>
                            
                                {/* <Link to="/profile" >
                                    <Button className="btn btn-#F58025 btn-lg ml-auto" as="Nav">View Profile</Button>
                                </Link> */}
                            {/* </Container> */}
                        </Card.ImgOverlay>
                        
                    </Card>
                </Col>
            ))}
            </Row>
        </Container>
    );
}

export default Dashboard;
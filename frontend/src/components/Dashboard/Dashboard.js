import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Card, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUserCircle, faCircleInfo, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import './Dashboard.css'

function Dashboard() {
    const dispatch = useDispatch();    
  
    const { isLoggedIn, id, status } = useSelector(
      (state) =>({
        isLoggedIn:state.auth.isLoggedIn, 
        id:state.auth.user_id
    }), shallowEqual);

    const dashElements = [
        {
            title: "Inventory",
            link: "/viewitems",
            icon: faBook
        },
        {
            title: "Profile",
            link: "/profile",
            icon: faUserCircle
        },
        {
            title: "About",
            link: "/#",
            icon: faCircleInfo
        },
        {
            title: "-------",
            link: "/#",
            icon: faQuestionCircle
        },
    ]

    return (
        <Container style={{ width: '500px' }}>
            <Row xs={1} md={2} className="g-4">
            { dashElements.map( (element, idx) => (
                <a className='link' key={idx} href={ element.link }>
                    <Card style={{ border: 'none', height: '200px' }} >
                        <FontAwesomeIcon className='text-center' icon={element.icon} size='8x' />
                        <span className='text-center'>{ element.title }</span> 
                    </Card>
                </a>
            ))}
            </Row>
        </Container>
    );
}

export default Dashboard;
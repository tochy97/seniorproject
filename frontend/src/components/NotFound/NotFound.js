import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudMeatball } from '@fortawesome/free-solid-svg-icons'

function NotFound(props) {
    return (
        <Container>
            <h1 className='text-center'><p style={{fontSize:"3em"}}>404</p><FontAwesomeIcon className='text-center' icon={faCloudMeatball} size='8x' /><p style={{fontSize:"2em"}}>
            Oops! Page not found</p></h1>
        </Container>
    );
}

export default NotFound;
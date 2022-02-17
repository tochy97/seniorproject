import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading(props) {
    return (
        <h1 className='text-center'>
            <Spinner animation="border" style={{width:"10em", height:"10em"}}/>
        </h1>
    );
}

export default Loading;
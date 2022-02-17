import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading(props) {
    return (
        <h1 className='text-center'>
            <Spinner animation="border" style={{width:"15em", height:"15em"}}/>
        </h1>
    );
}

export default Loading;
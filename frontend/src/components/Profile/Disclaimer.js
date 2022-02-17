import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../redux/actionCreators/accountActionCreators';
import { setError } from '../../redux/actionCreators/authActionCreator';

function Disclaimer(props) {
    const [checked, setChecked] =  useState(false);
    const { error, status, user } = useSelector(
        (state) =>({
            error:state.auth.error, 
            status:state.auth.status, 
            user:state.auth.user, 
    }), shallowEqual);

    const dispatch = useDispatch();
    const histroy = useNavigate();

    const acceptDisclaimer = (e) => {
        e.preventDefault();
        if(checked)
        {
            console.log("creating account for  : " + user.id)
            dispatch(createAccount(user.id));
            histroy("../", {replace:true});
        }
        else{
            const info= {
                error:"Please read discailmer and click checkbox to accept",
                status:999
            }
            dispatch(setError(info))
        }
    }

    return (
        <div className='px-5'>
            {status === 999 && <Alert variant="danger">{error}</Alert>}
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.]
            </p>
            <div>
                <Form onSubmit={acceptDisclaimer}>
                    <Form.Check
                        type="checkbox"
                        checked={checked}
                        value="1"
                        onChange={(e) => setChecked(e.currentTarget.checked)}
                        id="disabledFieldsetCheck" 
                        label="I have read and accept the message."
                    />
                    <Button variant='success' disabled={!checked} type="submit">Submit</Button>
                </Form>
            </div> 
        </div>
    );
}

export default Disclaimer;
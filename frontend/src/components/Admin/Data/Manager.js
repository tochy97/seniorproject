import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkUser } from "../../../redux/actionCreators/authActionCreator";

function Manager(props) {
    const dispatch = useDispatch();    
  
    const { isLoggedIn, user } = useSelector(
      (state) =>({
        isLoggedIn:state.auth.isLoggedIn, 
        user:state.auth.user, 
    }), shallowEqual);
  
    return (
        <div>
            Manager
        </div>
    );
}

export default Manager;
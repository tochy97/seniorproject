import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkUser } from "../../redux/actionCreators/authActionCreator";
import { Route, Routes } from 'react-router-dom';
import Adder from './Data/Adder';
import Manager from './Data/Manager';

function Admin() {
    const dispatch = useDispatch();    
  
    const { isLoggedIn, user } = useSelector(
      (state) =>({
        isLoggedIn:state.auth.isLoggedIn, 
        user:state.auth.user, 
    }), shallowEqual);
  
    return (
        <Routes>
        <Route path="/*" element={<Adder/>} />
            <Route path="add" element={<Adder/>} />
            <Route path="manager" element={<Manager/>} />
        </Routes>
    );
}

export default Admin;
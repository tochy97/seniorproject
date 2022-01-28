import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { checkUser } from "../../redux/actionCreators/authActionCreator";
import { Route, Routes } from 'react-router-dom';
import Adder from './Data/Adder';
import Manager from './Data/Manager';
import AddItem from "./Data/AddItem";
import Dashboard from '../Dashboard/Dashboard';

function Admin() {
    const dispatch = useDispatch();    
  
    const { isLoggedIn, user } = useSelector(
      (state) =>({
        isLoggedIn:state.auth.isLoggedIn, 
        user:state.auth.user, 
    }), shallowEqual);
  
    return (
        <Routes>


            <Route path="addItem" element={<AddItem/>}/>
            
            <Route path="add" element={<Adder/>} />
            <Route path="manager" element={<Manager/>} />

            <Route path="/*" element={<Dashboard/>} /> 
        </Routes>
    );
}

export default Admin;
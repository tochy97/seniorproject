import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Routes, Route } from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import NavComp from './NavComp/NavComp';
import Dashboard from './Dashboard/Dashboard';
import { checkUser } from './redux/actionCreators/authActionCreator';

function App() {
  const dispatch = useDispatch();    

  const { isLoggedIn } = useSelector(
    (state) =>({
      isLoggedIn:state.auth.isLoggedIn, 
  }), shallowEqual);

  useEffect(() => {
      if(!isLoggedIn){
          dispatch(checkUser());
      }
  }, [isLoggedIn,dispatch]);
  
  return (
    <>
    <NavComp/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          {
            isLoggedIn
            ?
              <Route path="/" element={<Dashboard/>}/>
            :
              <Route path="/" element={<Login/>}/>
          }
        </Routes>
    </>
  );
}

export default App;

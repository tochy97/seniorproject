import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Routes, Route } from "react-router-dom";
import { checkUser } from './redux/actionCreators/authActionCreator';
import Login from './Auth/Login';
import Register from './Auth/Register';
import NavComp from './NavComp/NavComp';
import Dashboard from './Dashboard/Dashboard';
import Profile from './Profile/Profile';
import Checkout from './Checkout/Checkout';

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
      <Route exact path="login" element={<Login/>}/>
      <Route exact path="register" element={<Register/>}/> 
      {
        isLoggedIn
        ?
          <Route exact path="/*" element={<Dashboard/>}/>
        :
          <Route exact path="/*" element={<Login/>}/>
      }
      {
        isLoggedIn
        ?
          <Route exact path="profile" element={<Profile/>}/>
        :
          <Route exact path="profile" element={<Login/>}/>
      }
      {
        isLoggedIn
        ?
          <Route exact path="checkout" element={<Checkout/>}/>
        :
          <Route exact path="checkout" element={<Login/>}/>
      }
    </Routes>
    </>
  );
}

export default App;

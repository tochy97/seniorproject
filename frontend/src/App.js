import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { checkUser } from './redux/actionCreators/authActionCreator';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NavComp from './components/NavComp/NavComp';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Checkout from './components/Checkout/Checkout';
import SetAccount from './components/Auth/SetAccount';
import Admin from './components/Admin';

function App() {
  const dispatch = useDispatch();    

  const { isLoggedIn, user } = useSelector(
    (state) =>({
      isLoggedIn:state.auth.isLoggedIn, 
      user:state.auth.user, 
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
      <Route exact path="confirmaccount" element={<SetAccount/>}/> 
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
      {
        isLoggedIn && user.is_superuser
          ?
            <Route path="admin/*" element={<Admin/>} />
          :
            <Route path="admin/*" element={<Login/>} />
      }
    </Routes>
    </>
  );
}

export default App;

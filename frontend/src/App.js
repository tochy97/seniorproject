import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { checkUser } from './redux/actionCreators/authActionCreator';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NavComp from './components/NavComp/NavComp';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import ViewItems from './components/ViewItems/ViewItems';
import About from './components/About/About';
import SetAccount from './components/Auth/SetAccount';
import Admin from './components/Admin';

function App() {
  const dispatch = useDispatch();    

  const { isLoggedIn, user, status } = useSelector(
    (state) =>({
      isLoggedIn:state.auth.isLoggedIn, 
      user:state.auth.user, 
      status:state.auth.status, 
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
          <>
            <Route exact path="/*" element={<Dashboard/>}/>
            <Route exact path="profile" element={<Profile/>}/>
            <Route exact path="viewitems" element={<ViewItems/>}/>
            <Route exact path="about" element={<About />}/>
            <Route path="admin/*" element={<Admin/>} />
            <Route exact path="confirmaccount" element={<SetAccount/>}/> 
          </>
        :
        
          <Route exact path="/*" element={<Login/>}/>
      }
    </Routes>
    </>
  );
}

export default App;

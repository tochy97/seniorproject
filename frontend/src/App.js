import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { checkUser, setAllowed } from './redux/actionCreators/authActionCreator';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NavComp from './components/NavComp/NavComp';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import ViewItems from './components/ViewItems/ViewItems';
import SetAccount from './components/Auth/SetAccount';
import Admin from './components/Admin';
import Disclaimer from './components/Profile/Disclaimer';
import { fetchAccount } from './redux/actionCreators/accountActionCreators';
import Loading from './components/Loading/Loading';
import NotFound from './components/NotFound/NotFound';

function App() {
  const dispatch = useDispatch();    

  const { isLoggedIn, user, status, allowed, mounted, accountMounted } = useSelector(
    (state) =>({
      isLoggedIn:state.auth.isLoggedIn, 
      user:state.auth.user, 
      status:state.auth.status, 
      allowed:state.auth.allowed,
      mounted:state.auth.mounted,
      accountMounted:state.account.mounted
  }), shallowEqual);
  console.log(isLoggedIn)
  useEffect(() => {
      if(!isLoggedIn){
          dispatch(checkUser());
      }
      else{
        if(user.is_superuser === true){
          dispatch(setAllowed(true));
        }
      }
  }, [isLoggedIn,dispatch]);

  return (
    <>
    <NavComp/>
    {
      mounted
      ?
      <>
        {
          !isLoggedIn
          ?
            <Routes>
              <Route exact path="/*" element={<NotFound/>}/>
              <Route exact path="/" element={<Login/>}/>
              <Route exact path="login" element={<Login/>}/>
              <Route exact path="register" element={<Register/>}/> 
            </Routes>
          :
          <>
          {
            accountMounted 
            ?
            <Routes>
              {
                allowed || user.is_superuser
                ?
                  <>
                  <Route exact path="/*" element={<NotFound/>}/>
                    <Route exact path="/" element={<Dashboard/>}/>
                    <Route exact path="profile" element={<Profile/>}/>
                    <Route exact path="viewitems" element={<ViewItems/>}/>
                    <Route path="admin/*" element={<Admin/>} />
                    <Route exact path="confirmaccount" element={<SetAccount/>}/> 
                  </>
                :
                <Route exact path="/*" element={<Disclaimer/>}/>
              }
            </Routes>
            :
            <Loading/>
          }
          </>
        }
      </>
      :
        <Loading/>
    }
    </>
  );
}

export default App;

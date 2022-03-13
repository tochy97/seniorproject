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
import About from './components/About/About';
import SetAccount from './components/Profile/SetAccount';
import Admin from './components/Admin';
import Disclaimer from './components/Profile/Disclaimer';
import { fetchAccount } from './redux/actionCreators/accountActionCreators';
import Loading from './components/Loading/Loading';
import NotFound from './components/NotFound/NotFound';
import "./components/styles.css"
function App() {
  const dispatch = useDispatch();    
 
  const { isLoggedIn, user, status, allowed, mounted, accountMounted, account } = useSelector(
    (state) =>({
      isLoggedIn:state.auth.isLoggedIn, 
      user:state.auth.user, 
      status:state.auth.status, 
      allowed:state.auth.allowed,
      mounted:state.auth.mounted,
      accountMounted:state.account.mounted,
      account:state.account.data
  }), shallowEqual);

  useEffect(() => {
      if(!isLoggedIn){
          dispatch(checkUser());
      }
      else{
        if(!accountMounted && !user.admin){
          console.log(user)
          dispatch(fetchAccount(user.id))
        }
        else
        {
        if(user.admin === true || account){
          dispatch(setAllowed(true));
        }
        }
      }
  }, [isLoggedIn,dispatch,user,account,accountMounted]);

  return (
    <>
    <NavComp/>
    <div style={{marginTop:"10em", zIndex:10}}>
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
            accountMounted || allowed
            ?
            <Routes>
              {
                allowed || user.admin
                ?
                  <>
                  <Route exact path="/*" element={<NotFound/>}/>
                    <Route exact path="/" element={<Dashboard/>}/>
                    <Route exact path="profile" element={<Profile/>}/>
                    <Route exact path="inventory" element={<ViewItems/>}/>
                    <Route path="admin/*" element={<Admin/>} />
                    <Route exact path="set_account" element={<SetAccount/>}/> 
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
    </div>
    </>
  );
}

export default App;

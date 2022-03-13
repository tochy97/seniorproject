import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { checkUser, setAllowed } from './redux/actionCreators/authActionCreator';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import ViewItems from './pages/ViewItems/ViewItems';
import About from './pages/About/About';
import SetAccount from './pages/Profile/SetAccount';
import Admin from './pages/Admin';
import Disclaimer from './pages/Profile/Disclaimer';
import { fetchAccount } from './redux/actionCreators/accountActionCreators';
import NavComp from './components/NavComp/NavComp';
import Loading from './components/Loading/Loading';
import NotFound from './components/NotFound/NotFound';
import "./styles.css"
import { Container } from 'react-bootstrap';
function App() {
  const dispatch = useDispatch();    
 
  const { isLoggedIn, user, allowed, mounted, accountMounted, account } = useSelector(
    (state) =>({
      isLoggedIn:state.auth.isLoggedIn, 
      user:state.auth.user, 
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
        if(user.admin === true || account){
          dispatch(setAllowed(true));
        }
      }
  }, [isLoggedIn,dispatch,user,account,accountMounted]);

  return (
    <>
    <NavComp/>
    <Container style={{marginTop:"10em", zIndex:10}}>
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
              <Route exact path="about" element={<About/>}/> 
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
                    <Route exact path="about" element={<About/>}/> 
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
    </Container>
    </>
  );
}

export default App;

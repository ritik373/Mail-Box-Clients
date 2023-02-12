import React from 'react';
import SignUp from './components/signup/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Routes} from 'react-router-dom'
import LogIn from './components/Login/Login';

import Navbartop from './components/navbar/Navbartop';
import ComposeMail from './components/composeMail/ComposeMail';
import Inbox from './components/InboxMail/Inbox';
import SentMsg from './components/InboxMail/SentMsg';
import { authCompose } from './store/authRedux';
import { useSelector } from 'react-redux';






function App(props) {
  const loginToken=useSelector(state=>state.compose.login)
  console.log(loginToken)
  const idtoken=localStorage.getItem('email');
  return (
    <div>
     {idtoken&&<Navbartop/>}
    <Routes>
    <Route path='/signup' element={   <SignUp />}/>


    <Route  path='/' element={<LogIn/>} />
    
    <Route  path='/login' element={<LogIn/>} />

    <Route  path='/composemail' element={idtoken && <ComposeMail/> || !idtoken&& <h1>404 Page Not Found</h1>} />
    <Route  path='/inbox' element={idtoken && <Inbox/> || !idtoken&& <h1>404 Page Not Found</h1>} />
    <Route  path='/inbox/sent' element={idtoken && <SentMsg/> || !idtoken&& <h1>404 Page Not Found</h1>} />

    
    
    </Routes>

      
    </div>
  );
}

export default App;

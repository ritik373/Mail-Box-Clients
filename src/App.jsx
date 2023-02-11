import React from 'react';
import SignUp from './components/signup/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route,Routes} from 'react-router-dom'
import LogIn from './components/Login/Login';
import UserPage from './components/UserPage/UserPage';
import Navbartop from './components/navbar/Navbartop';




function App(props) {
  return (
    <div>
    <Navbartop/>
    <Routes>
    <Route path='/signup' element={   <SignUp />}/>


    <Route  path='/' element={<LogIn/>} />
    
    <Route  path='/login' element={<LogIn/>} />
    <Route  path='/userpage' element={<UserPage/>} />
    
    
    </Routes>

      
    </div>
  );
}

export default App;

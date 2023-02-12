import React,{useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Login.module.css'
// import { authContext } from '../AuthContextTokin/AuthContextTokin';
// import { useContext } from 'react';
import { authCompose } from '../../store/authRedux';
import { useDispatch } from 'react-redux';


function Login(props) {
  const dispatch=useDispatch();
  
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const navigate=useNavigate()

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;


    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6ztPm-ZagJXH-4kYUH9-SEe8_Sd2kcms', {
        method: 'POST',
        body: JSON.stringify({ email: emailInput, password: passwordInput, returnSecureToken: true, }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res)=>{
        // console.log("something went wrong",res)
        if(res.ok){
          return res.json().then((responce)=>{
            // console.log(responce.idToken)
            dispatch(authCompose.onLoginHander(responce.email))
            navigate('/inbox',{replace:true})
      

          })

        }else{
          console.log("something went wrong")
          alert("you are not Registor or Please create your new Account");
        }
      
      })
      console.log(emailInput +" "+passwordInput)
  }
    return (
        <section className={classes.auth}>
        <h1>LogIn</h1>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' ref={passwordInputRef} required />
          </div>
          <div className={classes.actions}>
          <Link to="/">Forget PassWord?</Link>
            <button>LogIn</button>


            <Link to="/signup">Create new account</Link>
           
          </div>
        </form>
      </section>





  
    );
}
  

export default Login;
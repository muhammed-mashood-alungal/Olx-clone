import React from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { useEffect } from 'react';
import backArrow  from '../../assets/back.png'

function Login() {
  const [email , setEmail] = useState('')
  const [password ,setPassword] = useState('')
  const Firebase=useContext(FirebaseContext)
  const [err,setErr] = useState('')
  const navigate= useNavigate()
  const [loading ,setLoading] =useState(false)
  const {login,user} = useUser()

 useEffect(()=>{
 if(user){
  navigate('/')
 }
 },[])
  const validateForm = () =>{
    if(email.trim() == ""){
     setErr('Email Required')
     return false
    }
    if(password.trim() == ""){
     setErr('Password is Required')
     return false
    }
    return true
}


    function handleSignIn(e){
      e.preventDefault()
      setLoading(true)
      setErr(null)
      if(!validateForm()) {
        setLoading(false)
        return
      }

      Firebase.auth().signInWithEmailAndPassword(email, password)
       .then((userCredential) => {
           console.log("hello")
           console.log(userCredential.user.uid)
           const userData = userCredential.user;
           console.log('Signed in as:', userData.displayName);
           login(userData)
           
           setLoading(false)
           navigate('/')
       })
       .catch((err) => {
        setLoading(false)
        console.log(err)
         setErr('Invalid Credential')
       });
    }
  return (
    <div>
     <p style={{color:'blue'}}
     onClick={()=>{navigate('/')}}
     ><img src={backArrow}  />Back Home</p>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {loading && <p style={{color:'grey'}}>loading.....</p>}
        {err   && <p style={{color:'red'}}>{err}</p>}
        <form onSubmit={handleSignIn}> 
          <label htmlFor="fname">Email</label>
          <br />
          <input
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
            className="input"
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup' >Signup</Link>
      </div>
    </div>
  );
}

export default Login;

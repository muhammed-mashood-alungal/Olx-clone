import React from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useState ,useContext } from 'react';
import { useNavigate ,Link} from 'react-router-dom'
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { useEffect } from 'react';
import { useUser } from '../../Contexts/UserContext';

export default function Signup() {

const navigate =useNavigate()
const [username , setName ] = useState('')
const [email , setEmail ] = useState('')
const [phone , setPhone] = useState('')
const [password , setPassword] = useState('')
const [err, setErr] = useState('')
const [loading ,setLoading] =useState(false)
const Firebase =useContext(FirebaseContext)
const {login,user} = useUser()
useEffect(()=>{
    if(user){
      navigate('/')
    }
},[])

const validateForm = () =>{
     if(username.trim() == ""){
      setErr('User Name Required')
      return false
     }
     if(email.trim() == ""){
      setErr('Email Required')
      return false
     }
     if(phone.trim() == ""){
      setErr('Phone Number Required')
      return false
     }
     if(password.trim() == ""){
      setErr('Password is Required')
      return false
     }
     return true
}


const handleSignup=(e)=>{
    e.preventDefault()
    setLoading(true)
    if(!validateForm()) {
      setLoading(false)
      return
    }

    setLoading(true)
    Firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        Firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          setLoading(false)
          navigate('/login')
        }).catch((err)=>{
          setLoading(false)
          setErr(err.message)
        })
      })
    }).catch((err)=>{
      setLoading(false)
      setErr(err.message)
    })
}
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {loading && <p style={{color:'grey'}}>loading.....</p>}
        {err && <p style={{color:'red'}}>{err}</p>}
        <form onSubmit={handleSignup}> 
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={username}
            onChange={(e)=>{setName(e.target.value)}}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
            className="input"
            type="email"
            id="email"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
          value={phone}
          onChange={(e)=>{setPhone(e.target.value)}}
            className="input"
            type="number"
            id="phone"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
            className="input"
            type="password"
            id="phone"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login' >Login</Link>
      </div>
    </div>
  );
}

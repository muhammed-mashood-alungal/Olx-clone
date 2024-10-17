import React, { Fragment ,useState , useEffect} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useContext } from 'react';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { useUser } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {     
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [category , setCategory] = useState('')
  const [price , setPrice ] = useState(0)
  const [image , setImage ] = useState(null)
  const [loading , setLoading] = useState(false)
  const [err, setErr] = useState('')
  const Firebase =useContext(FirebaseContext)
  const {user}=useUser()
  
  useEffect(()=>{
    if(!user) navigate('/login')
  })
  const validateForm =()=>{
    if(name.trim() == ""){
      setErr('Please Enter Product Name')
      return false
    }
    if(category.trim() == ""){
      setErr('Please Enter Product Category')
      return false
    }
    if(price.length == 0){
      setErr('Please Enter Product Price')
      return false
    }
    if(Number.isNaN(price)){
      setErr('Please Enter Valid Price')
      return false
    }
    if(price < 0){
      setErr('Price should be only positive integers')
      return false
    }
    if(!image){
      setErr('Please Choose an image')
      return false
    }
    return true
  }
  
  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setErr(null)
    if(!validateForm()){
      setLoading(false)
      return 
    }
    var storage = Firebase.storage();
    var pathReference = storage.ref(`images/${image.name}`);
    
    pathReference.put(image).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      
       console.log("user " ,user)
        pathReference.getDownloadURL().then(function(url) {
            console.log('File available at', url);
            Firebase.firestore().collection('products').add({
              productName:name,
              category:category,
              price:price,
              image:url,
              user:user.uid,
              createdAt:new Date().toDateString()
            }).then(()=>{
              navigate('/')
            })
        }).catch((error) =>{
           setErr(error.message)
        });

    }).catch(function(error) {
        console.error('Error uploading file:', error);
    });
    
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        {loading && <p style={{color:'grey'}}>loading.....</p>}
          {err && <p style={{color:'red'}}>{err}</p>}
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              className="input"
              type="text"
              id="fname"
              name="name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
              className="input"
              type="text"
              id="fname"
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            type="number" 
            id="fname" 
            name="price"
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
         
            <br />
            <input type="file"
            onChange={(e)=>{setImage(e.target.files[0])}}
            />
            <br />
            <button className="uploadBtn" onClick={handleSubmit} disabled={loading}>upload and Submit</button>
               
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

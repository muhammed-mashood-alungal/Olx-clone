import React from 'react';
import { useContext } from 'react';
import './View.css';
import { ViewContext } from '../../Contexts/ViewContext';
import { useUser } from '../../Contexts/UserContext';
import { useEffect, useState } from 'react'
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { useNavigate ,redirect} from 'react-router-dom';

const View = ()=>{
  const {productData} = useContext(ViewContext)
  const {user}  = useUser()
  const Firebase = useContext(FirebaseContext)
 const [seller,setSeller] = useState(null)
 const navigate = useNavigate()


 useEffect(()=>{
  if(!productData){
    navigate('/')
    return
  }
    const {user} = productData 
    Firebase.firestore().collection('users').where('id','==',user).get().then((res)=>{
     res.forEach(doc=> {
      console.log(doc)
      setSeller(doc.data())
     });
    })
 },[productData, Firebase])



  return ( 
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productData?.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productData?.price} </p>
          <span> {productData?.productName}</span>
          <p>{productData?.category}</p>
          <span>{productData?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{seller?.username}</p>
          <p>{seller?.phone}</p>
        </div>
      </div>
    </div>
   
  );
}
export default View;

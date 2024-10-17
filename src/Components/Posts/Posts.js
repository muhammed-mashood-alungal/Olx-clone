import { useContext } from 'react';
import React from 'react';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import Heart from '../../assets/Heart';
import './Post.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { ViewContext } from '../../Contexts/ViewContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const Firebase = useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  const {setProductData} = useContext(ViewContext)
  const navigate = useNavigate()
  
  useEffect(()=>{
    Firebase.firestore().collection('products').get().then((snapshot)=>{
      console.log(snapshot)
      const allProducts=snapshot.docs.map((product)=>{
        return {
          ...product.data(),
          id:product.id
        }
      })
      console.log(allProducts)
    setProducts(allProducts)
    })
    
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
          products.map((product)=>{return (
            <div
            className="card"
            key={product.id}
            onClick={()=>{
              setProductData(product)
              navigate('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.image} alt="product image" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.productName}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
          </div>
          )})
          }
          
        </div>
      </div>
     
    </div>
  );
}

export default Posts;

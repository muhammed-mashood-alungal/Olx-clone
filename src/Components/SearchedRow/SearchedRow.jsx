import { useContext } from 'react';
import React from 'react';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import Heart from '../../assets/Heart';
import './SearchedRow.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { ViewContext } from '../../Contexts/ViewContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Suspense } from 'react/cjs/react.production.min';

function SearchedRow() {
  const Firebase = useContext(FirebaseContext)
  const [products,setProducts] = useState([])
  const {setProductData} = useContext(ViewContext)
  const navigate = useNavigate()
  const {SearchQuery} =useParams()


  useEffect(()=>{
   Firebase.firestore()
  .collection('products')
  .where('category', '>=', SearchQuery)
  .where('category', '<=', SearchQuery + '\uf8ff') 
  .get()
  .then((snapshot) => {
    console.log(snapshot)
    const allProducts = snapshot.docs.map((product) => {
      return {
        ...product.data(),
        id: product.id,
      };
    });
    console.log(allProducts);
    
    setProducts(allProducts); 
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });

  },[SearchQuery])

  return (
   
    <div className="searchParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Search Result</span>
        </div>
        {
        products.length == 0 && <h1 style={{color:'red'}}>No item Matched .....! </h1>
        }
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
                 <span className="kilometer">{product.productName}</span>
                 <p className="name">{product.category}</p>
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

export default SearchedRow;

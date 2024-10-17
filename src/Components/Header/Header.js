import React , { useState }from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useUser } from '../../Contexts/UserContext';
import { useEffect } from 'react';


function Header() {
  const { user, logout } = useUser()
 
  const navigate = useNavigate()
  const {SearchQuery} = useParams()
  const [searchText,setSearchText] = useState(SearchQuery)
  function searchProduct(e){
     e.preventDefault()
    if(searchText) navigate(`/search/${searchText}`)
  }

  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>{
            navigate('/')
          }}>
          <OlxLogo ></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
       
          <form onSubmit={searchProduct}>
          <div className="productSearch">
          <div className="input">
            <input
              value={searchText}
              onChange={(e)=>{setSearchText(e.target.value)}}
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
     
          </div>
          <div className="searchAction" onClick={searchProduct}>
            <Search color="#ffffff"  ></Search>
          </div>
          </div>
          </form>
         
        
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        {
          user ? <div>
          <span>WELCOME <font style={{color:"blue"}}>{user?.displayName}</font></span>
        </div>
        :
        <Link to='/signup'
              style={{ color: 'black' }}>SignUp</Link>
        }
       
        <div className="loginPage">
          {user ? 
            <span onClick={logout}>Logout
            </span>
            :
            <span > <Link to='/login'
              style={{ color: 'black' }}>Login</Link>
            </span>}
          <hr />
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span><Link to='/create' >SELL</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

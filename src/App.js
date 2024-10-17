import React from 'react';
import './App.css';
import { Routes , BrowserRouter as Router ,Route} from 'react-router-dom';
import { FirebaseContext } from './Contexts/FirebaseContext';
import Firebase from './firebase/config'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import SignUp from './Pages/Signup'
import Login from './Pages/Login'
import { UserContextProvider } from './Contexts/UserContext';
import Create from './Pages/Create';
import { ViewContextProvider } from './Contexts/ViewContext';
import ViewPost from './Pages/ViewPost';
import { UnAuthorized } from './Components/UnAuthorized/UnAuthorized';
import Search from './Pages/Search';

function App() {
  return (
    <div>
      <FirebaseContext.Provider value={Firebase}>
        <UserContextProvider>
          <ViewContextProvider>
      <Router>
          <Routes>
            
          <Route exact path="/" element={<Home/>}></Route>
          <Route  path="/signup" element={<SignUp/>}></Route>
          <Route  path="/login" element={<Login/>}></Route>
          <Route  path="/create" element={<Create/>}></Route>
          <Route  path="/view" element={<ViewPost/>}></Route>
          <Route  path="/search/:SearchQuery" element={<Search/>}></Route>
          <Route  path="*" element={<UnAuthorized/>}></Route>
          
         </Routes>
      </Router>
         </ViewContextProvider>
        </UserContextProvider>
      </FirebaseContext.Provider>
    </div>
  );
}

export default App;

import react from 'react'
import Banner from '../Components/Banner/Banner'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Posts from '../Components/Posts/Posts'
import '../assets/styles/AppWrapper.css'
import { Suspense } from 'react'
//import SearchedRow from '../Components/SearchedRow/SearchedRow'
const SearchedRow = react.lazy(()=>import('../Components/SearchedRow/SearchedRow'))
function Search(){
    return (
        <div className="homeParentDiv">
        <Header />
         <Suspense >
         <SearchedRow/>
         </Suspense>
       
        </div>
    )
}
export default Search
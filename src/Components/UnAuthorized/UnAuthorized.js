import { Link } from "react-router-dom"
export const UnAuthorized = () =>{
    return (
        <>
        <h1 style={{color:'red',marginLeft:'300px'}}> OOps. There is nothing !</h1>
        <Link to='/login' style={{marginLeft:'300px'}}>Please Log In</Link>
        </>
    )
}

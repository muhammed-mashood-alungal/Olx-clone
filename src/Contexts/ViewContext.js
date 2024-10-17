import { createContext } from "react";
import { useState } from "react";

export const ViewContext = createContext(null)

export const ViewContextProvider = ({children}) =>{
    const [productData , setProductData] = useState(null)

    return (
    <ViewContext.Provider value={{productData,setProductData}}>
        {children}
    </ViewContext.Provider>
    )
}

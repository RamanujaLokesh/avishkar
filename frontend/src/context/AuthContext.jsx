import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children})=>{
    const [authUser , setAuthUser] = useState(JSON.parse(localStorage.getItem("mnnita-mess"))||null);
    return <AuthContext.Provider value={{authUser , setAuthUser}} >{children}</AuthContext.Provider>
}
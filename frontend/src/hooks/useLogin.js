import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] =useState(false);
  const [done, setDone] = useState(false);
const {setAuthUser} = useAuthContext()

  const login = async({ reg_no, password })=>{


    setLoading(true);
    try {
        let res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reg_no, password }),
          });
    
          res = await res.json();
          
    
          if (res.message === "Login successful") {
            setDone(true);
          } 
          if(res.error){
            throw new Error(res.error);
          }
          localStorage.setItem("mnnita-mess" , JSON.stringify(res))
setAuthUser(res);
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);
    }
  }

  return { done, loading , login};
}

export default useLogin
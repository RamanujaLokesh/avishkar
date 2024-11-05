import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useUserMeals = () => {
const [loading , setLoading]  =useState(false);


const userMeals = async()=>{
setLoading(true);
try {
    let res = await fetch(`api/user/unregisteredmeals`);
    res = await res.json();
    
    if(res.error){
        throw new Error(res.error); 
    }
    
    return res;
} catch (error) {
    toast.error(error.message);
}finally{
    setLoading(false);
}
}

return {loading , userMeals};
}

export default useUserMeals
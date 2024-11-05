import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useUnregisterMeal = () => {
  const [loading , setLoading] = useState(false);

  const unregisterMeal = async({reg_no , breakfast , lunch , snacks , dinner})=>{

setLoading(true)
    try {
const res = await fetch(`/api/user/unregistermeal`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
        body:JSON.stringify({reg_no , breakfast , lunch , snacks , dinner })
})
const data = await res.json();
if(data.error){
    throw new Error(data.error);
}
toast.success("successfully unregistered")
      return;  
    } catch (error) {
        toast.error(error.message)
    }
    finally{
        setLoading(false);
    }
  }

    return {loading , unregisterMeal}
}

export default useUnregisterMeal
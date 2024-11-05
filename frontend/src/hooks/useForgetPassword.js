import React, { useState } from 'react'
import toast from 'react-hot-toast'
const useForgetPassword = () => {
  const [loading , setLoading] = useState(false);

  const forgetPassword = async(reg_no)=>{
setLoading(true);
try {
    const res = await fetch('/api/auth/sendmail/resetpassword' , {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({reg_no})
    })
    const data = await res.json();
    if(data.error){
        throw new Error(data.error);
    }
toast.success("reset link sent to mail");
} catch (error) {
    toast.error(error.message)
}finally{
    setLoading(false)
}
  }

  return {loading , forgetPassword}
}

export default useForgetPassword
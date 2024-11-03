import React, { useState } from 'react'

const ResetPassword = () => {
    const [newPassword , setNewPassword] = useState('')
    const [newCPassword , setNewCPassword] = useState('')
    
    const handleSubmit =async ()=>{
        if(newCPassword !== newPassword){
            return false;
        }
        try {
            const res = await fetch("/api/auth/changepassword" , {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({newPassword , newCPassword}),
            })
                
        } catch (error) {
                console.log(error);
                
        }
        


    }
  return (
    <div>
        <form onSubmit={handleSubmit} >

        <h1>reset password</h1>
        <input type="password" placeholder='enter new password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
        <input type="password" placeholder='reenter new password' value={newCPassword} onChange={(e)=>setNewCPassword(e.target.value)} />
        <button>submit</button>
        </form>
    </div>
  )
}

export default ResetPassword
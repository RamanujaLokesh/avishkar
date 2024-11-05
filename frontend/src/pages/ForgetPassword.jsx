import React, { useState } from 'react'
import useForgetPassword from '../hooks/useForgetPassword.js';
// import useForgetPassword from '../../hooks/useForgetPassword';

const ForgetPassword = () => {
    const [regNo , setRegNo] = useState('');
const {loading , forgetPassword} = useForgetPassword()
const handleSubmit = async(e)=>{
    e.preventDefault()
     await forgetPassword(regNo);
}

  return (
    <div className='flex flex-col items-center justify-center mx-auto'>
        <h1 className='text-3xl font-semibold text-center'>forget password?</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="reg_no" className='label p-2'>
        <span className='text-base label-text'>registration no.</span>
    </label>
    <input type="text" placeholder='' className='input input-bordered h-10' name='reg_no' value={regNo} onChange={(e)=>setRegNo(e.target.value)} />
    <button className='btn btn-block hover:bg-red-300'>
        {loading? <span className='loading loading-spinner'></span> :"submit"}
    </button>
    
        </form>
    </div>
  )
}

export default ForgetPassword
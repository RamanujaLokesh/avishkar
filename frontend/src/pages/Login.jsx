import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const { done, loading , login} = useLogin();
const [reg_no, setreg_no] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();  

const handleSubmit = async (e) => {
  e.preventDefault();
  if (reg_no === "" || password === "") {
    toast.error("Please fill in all fields");
    return;
  }

  login({ reg_no, password })
if(done)toast.success("logged in");

navigate('/');

}


  return(
    <div>
  {done ? (
    <h1>Login Successful</h1>
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        type="REG NO"
        placeholder="enter reg no."
         className="input-lg "
        value={reg_no}
        onChange={(e) => setreg_no(e.target.value)}
      />
      <input
        type="password"
        placeholder="enter password" className="input-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
     <Link to ='/forgetpassword'>forget password</Link>
      <button className="btn btn-primary"> {loading?<span className='loading loading-spinner'></span>:"Login"} </button>
    </form>
    
  )}
</div>
);
}

export default Login
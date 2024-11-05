import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newCPassword, setNewCPassword] = useState("");
  const [loading , setLoading] = useState(false)
  const [done, setDone] = useState(false);
  const token = useParams().token

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword ===""||newCPassword===""||newCPassword !== newPassword ) {
      return false;
    }
setLoading(true);
    try {
      let reg = await fetch(`/api/user/getuserbytoken/${token}`);
      reg = await reg.json();
      // console.log("here")
      // console.log(reg);
      if (!reg){
        toast.error("invalid token")
        return;
      } 

      const reg_no = reg.reg_no;

      let res = await fetch("/api/auth/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg_no, newPassword }),
      });
res = await res.json()
      if (!res) return;
      console.log(res);
      if(res.message === "successfully updated password" ){
        setDone(true);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false)
    }
  };
  return (
    <div>
      {done ? (
        <h1>password changed</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>reset password of {token}</h1>
          <input
            type="password"
            placeholder="enter new password"
             className="input-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="reenter new password" className="input-lg"
            value={newCPassword}
            onChange={(e) => setNewCPassword(e.target.value)}
          />
          <button className="btn btn-primary">submit</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;

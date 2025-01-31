import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = ()=>{
    const [ loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()
    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/logout" , {
                method: "POST",
                headers:{"content-Type": "application/json" }
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error);                
            }
            localStorage.removeItem("mnnita-mess");
            setAuthUser(null);
        } catch (error) {
            console.log("server error in useLogout.js " , error)
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading , logout};
}

export default useLogout
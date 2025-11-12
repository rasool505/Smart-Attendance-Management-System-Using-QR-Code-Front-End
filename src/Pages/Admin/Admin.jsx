import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Admin(){
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/admin/users")
    },[])
    return (
        <div className="w-screen min-h-screen text-white flex flex-col overflow-x-auto">
            <Outlet/>
        </div>
    )
}


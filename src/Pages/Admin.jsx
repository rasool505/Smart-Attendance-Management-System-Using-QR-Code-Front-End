import { Outlet } from "react-router-dom";

export default function Admin(){
    return (
        <div className="w-screen min-h-screen text-white flex p-2 flex-col overflow-x-auto">
            <Outlet/>
        </div>
    )
}


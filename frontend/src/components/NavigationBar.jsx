import {useNavigate} from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext"
export default function NavigationBar() {
    const { isLoggedIn, login, logout } = useAuth();
    const navigate = useNavigate();
    function handleLogin(){
        navigate("/login");
    }
    function handleTitleClick(){
        navigate('/')
    }
    function handleRegister(){
        navigate("/register");
    }
    function handleLogout(){
        logout();
        navigate("/login");
    }
    return (
        <div className="flex justify-between items-center py-[2%] bg-[#d3aeff] px-[2%] ">
            {/* Left side */}
            <div className='text-3xl font-bold cursor-pointer' onClick={handleTitleClick}>Jeevan Sarthi</div>
            
            {/* Right side */}
            <div className="flex gap-4">
                {isLoggedIn?(
                    <>
                    <Button className='bg-white'>Dashboard</Button>
                    <Button className='bg-white' onClick={handleLogout}>Logout</Button>
                    </>
                ):(
                    <>
                <Button className='bg-white' onClick={handleLogin}>Login</Button>
                <Button className='bg-white' onClick={handleRegister}>SignUp</Button>
                    </>
                )}
            </div>
        </div>
    );
}

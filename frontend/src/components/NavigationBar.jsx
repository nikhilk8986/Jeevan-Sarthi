import {useNavigate} from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext"
export default function NavigationBar() {
    const { isLoggedIn, isHospitalLoggedIn, login, logout, hospitalLogout } = useAuth();
    const navigate = useNavigate();
    function handleLogin(){
        navigate("/login");
    }
    function handleTitleClick(){
        if(isLoggedIn){
            navigate("/userfeed");
        }else if(isHospitalLoggedIn){
            navigate("/hospitaldashboard");
        }else{
            navigate('/');
        }
    }
    function handleRegister(){
        navigate("/register");
    }
    function handleLogout(){
        if(isLoggedIn){
            logout();
            navigate("/login");
        }else{
            hospitalLogout();
            navigate("/login");
        }
    }
    function handleDashboardClick(){
        if(isLoggedIn){
            navigate("/userdashboard");
        }else{
            navigate("/hospitaldashboard");
        }
    }
    return (
        <div className="flex justify-between items-center py-[2%] bg-blue-800 px-[2%] ">
            {/* Left side */}
            <div className='text-3xl font-bold cursor-pointer' onClick={handleTitleClick}>Jeevan Sarthi</div>
            
            {/* Right side */}
            <div className="flex gap-4">
                {(isLoggedIn || isHospitalLoggedIn)?(
                    <>
                    <Button className='bg-white' onClick={handleDashboardClick}>Dashboard</Button>
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

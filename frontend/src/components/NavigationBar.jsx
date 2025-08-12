import {useNavigate} from 'react-router-dom';

export default function NavigationBar() {
    const navigate = useNavigate();
    function handleLogin(){
        navigate("/login");
    }
    return (
        <div className="flex justify-between items-center py-[2%] bg-[#d3aeff] px-[2%] ">
            {/* Left side */}
            <div className='text-3xl font-bold'>Jeevan Sarthi</div>
            
            {/* Right side */}
            <div className="flex gap-4">
 <button className="btn" onClick={handleLogin}
>Login</button>
                <button className="btn"
>SignUp</button>
            </div>
        </div>
    );
}

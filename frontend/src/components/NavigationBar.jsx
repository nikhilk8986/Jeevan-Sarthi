export default function NavigationBar() {
    return (
        <div className="flex justify-between items-center py-[2%] bg-[#d3aeff] px-[2%] ">
            {/* Left side */}
            <div className='text-3xl font-bold'>Jeevan Sarthi</div>
            
            {/* Right side */}
            <div className="flex gap-4">
 <button className="bg-white border px-5 py-2 cursor-pointer hover:shadow-lg hover:scale-90 transition ease-in-out duration-200 hover:bg-black hover:text-white"
>Login</button>
                <button className="bg-white border px-5 py-2 cursor-pointer hover:shadow-lg hover:scale-90 transition ease-in-out duration-200 hover:bg-black hover:text-white"
>SignUp</button>
            </div>
        </div>
    );
}

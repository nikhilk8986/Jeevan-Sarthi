export default function Login() {
    return (
        <div className="flex justify-center items-center my-[7%]">
            <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg w-80">
                <h2 className="font-sans text-2xl font-semibold text-blue-500">Login</h2>
                
                <input 
                    className="mt-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    placeholder="Username" 
                    type="text" 
                    required 
                />
                
                <input 
                    className="mt-3 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
                    placeholder="Password" 
                    type="password" 
                    required 
                />
                
                <button className="mt-5 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    Login
                </button>
                <h6 className='mt-[5px] underline cursor-pointer'>Login as hospital?</h6>
            </div>
        </div>
    )
}

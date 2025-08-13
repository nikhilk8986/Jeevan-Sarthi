import { LoginCard } from "./LoginCard";
import { AuthProvider } from "../context/AuthContext"
export default function Login() {
    return (
        <AuthProvider>
        <div className="flex justify-center items-center my-[7%]">
            <LoginCard/>
        </div>
        </AuthProvider>
    )
}

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { useAuth } from "../context/AuthContext"
import axios from 'axios'
export function LoginCard() {
  const { login, hospitalLogin } = useAuth();
  const usernameRef=useRef();
  const passwordRef=useRef();
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState("");

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
          setLocationError("");
        },
        (error) => {
          console.error("Location error:", error);
          setLocationError("Location access denied. Some features may be limited.");
        }
      );
    } else {
      setLocationError("Geolocation not supported by this browser.");
    }
  }, []);

  function handleRegister(){
        navigate("/register");
    }
    const [who,setWho]=useState(0);//0==user
    function handleTextClick(){
      setWho(!who)
      
    }
    function handleLoginClick(){
      const username=usernameRef.current.value;
    const password=passwordRef.current.value;
      if(who){
        axios.post('http://localhost:3000/hospital/signin',
          {
            hospitalUsername:username,
            password:password
          },
          {
            headers: {
              latitude: location.latitude || "",
              longitude: location.longitude || ""
            }
          }
        ).then(response => {
          console.log("Response:", response.data);
          const token = response.data.token;
          hospitalLogin(token);
          if(response.status === 200){
            setTimeout(() => navigate('/'), 100);
          }
      }).catch(error => {
        console.error("Error:", error.response?.data || error.message);
    });
      }else{
        axios.post("http://localhost:3000/user/signin", {
    username: username,
    password: password
},
{
  headers: {
    latitude: location.latitude || "",
    longitude: location.longitude || ""
  }
}
)
.then(response => {
    console.log("Response:", response.data);
    const token = response.data.token;
    login(token);
    if(response.status === 200){
      setTimeout(() => navigate('/'), 100);
    }
})
.catch(error => {
    console.error("Error:", error.response?.data || error.message);
});
      }
    }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={handleRegister}>Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                ref={usernameRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input ref={passwordRef} id="password" type="password" required />
            </div>
            
            {/* Location Status */}
            <div className="text-sm">
              {location.latitude && location.longitude ? (
                <div className="text-green-600 flex items-center gap-2">
                  <span>📍</span>
                  <span>Location captured successfully</span>
                </div>
              ) : locationError ? (
                <div className="text-orange-600 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{locationError}</span>
                </div>
              ) : (
                <div className="text-blue-600 flex items-center gap-2">
                  <span>🔄</span>
                  <span>Getting your location...</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="bg-gray-200 border border-2 w-full" onClick={handleLoginClick}>
          Login
        </Button>
        <h6 className="underline cursor-pointer" onClick={handleTextClick}>login as {who?"user":"hospital"}?</h6>
      </CardFooter>
    </Card>
  )
}

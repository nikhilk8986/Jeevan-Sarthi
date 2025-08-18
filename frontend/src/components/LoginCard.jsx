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
import { API_ENDPOINTS } from "../config/config"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export function LoginCard() {
  const { login, hospitalLogin } = useAuth();
  const usernameRef=useRef();
  const passwordRef=useRef();
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setErrorMessage("");
      if(!username || !password){
        setErrorMessage("Please fill in both email and password.");
        return;
      }
      setIsLoading(true);
      if(who){
        axios.post(API_ENDPOINTS.HOSPITAL_SIGNIN,
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
          setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
        }).finally(() => {
          setIsLoading(false);
        });
      }else{
        axios.post(API_ENDPOINTS.USER_SIGNIN, {
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
    setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
})
.finally(() => {
  setIsLoading(false);
});
      }
    }

  return (
    <>
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
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Login failed</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <form aria-busy={isLoading}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input 
                  ref={usernameRef}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  aria-invalid={Boolean(errorMessage)}
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
                <Input ref={passwordRef} id="password" type="password" required aria-invalid={Boolean(errorMessage)} />
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
          <Button type="button" className="bg-gray-200 border border-2 w-full" onClick={handleLoginClick} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <h6 className="underline cursor-pointer" onClick={handleTextClick}>login as {who?"user":"hospital"}?</h6>
        </CardFooter>
      </Card>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-xl flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-primary" />
            <div className="text-sm text-muted-foreground">Logging in...</div>
          </div>
        </div>
      )}
    </>
  )
}

import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
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
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { API_ENDPOINTS } from "../config/config"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export function RegisterCard() {
    const usernameRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate  = useNavigate()
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

function handleLogin(){
    navigate("/login")
}
const [who,setWho]=useState(0);//0==user
    function handleTextClick(){
      setWho(!who)
      
    }
    function handleRegisterClick(){
    const username = usernameRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    setErrorMessage("");
    if(!username || !name || !password || !confirmPassword){
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if(password !== confirmPassword){
      setErrorMessage("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    if(who){
        axios.post(API_ENDPOINTS.HOSPITAL_SIGNUP,
          {
            hospitalUsername:username,
            hospitalName:name,
            password:password,
            confirmPassword:confirmPassword
          },
          {
            headers: {
              latitude: location.latitude || "",
              longitude: location.longitude || ""
            }
          }
        ).then(response => {
          console.log("Response:", response.data);
          if(response.status === 200){
            navigate('/login');
          }
      }).catch(error => {
        console.error("Error:", error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
      }).finally(() => {
        setIsLoading(false);
      });
      }else{
        axios.post(API_ENDPOINTS.USER_SIGNUP, {
    username: username,
    name:name,
    password: password,
    confirmPassword: confirmPassword
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
    if(response.status === 200){
      navigate('/login');
    }
})
.catch(error => {
    console.error("Error:", error.response?.data || error.message);
    setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
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
        <CardTitle>Sign Up to Jeevan-Sarathi</CardTitle>
        <CardDescription>
          Or continue to login
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={handleLogin}>Log In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Sign up failed</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <form aria-busy={isLoading}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="email"
                ref={usernameRef}
                placeholder="m@example.com"
                required
                aria-invalid={Boolean(errorMessage)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                type="text"
                ref = {nameRef}
                placeholder="Sayan"
                required
                aria-invalid={Boolean(errorMessage)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" ref={passwordRef} required aria-invalid={Boolean(errorMessage)} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input id="cpassword" type="password" ref={confirmPasswordRef} required aria-invalid={Boolean(errorMessage)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" onClick={handleRegisterClick} className="bg-gray-200 border border-2 w-full" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>
        <h6 className="underline cursor-pointer" onClick={handleTextClick}>Register as {who?"user":"hospital"}?</h6>
      </CardFooter>
    </Card>

    {isLoading && (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-xl flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-primary" />
          <div className="text-sm text-muted-foreground">Creating your account...</div>
        </div>
      </div>
    )}

    </>
  )
}

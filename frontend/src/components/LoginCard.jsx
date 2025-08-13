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
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { AuthProvider } from "../context/AuthContext"
import { useAuth } from "../context/AuthContext"
import axios from 'axios'
export function LoginCard() {
  const login = useAuth();
  const usernameRef=useRef();
  const passwordRef=useRef();
  const navigate = useNavigate();
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
          }
        ).then(
          response=>{
            const token=response.data.token;
            login(token);
          },
          console.log("data sent")
        )
      }else{
        axios.post('http://localhost:3000/user/signin',
        {
          username,
          password
        }
      ).then(
          response=>{
            const token=response.data.token;
            login(token);
          }
        )
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

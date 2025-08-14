import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
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

export function RegisterCard() {
    const usernameRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate  = useNavigate()
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
    if(who){
        axios.post('http://localhost:3000/hospital/signup',
          {
            hospitalUsername:username,
            hospitalName:name,

            password:password,
            confirmPassword:confirmPassword
          }
        ).then(response => {
          console.log("Response:", response.data);
          if(response.status === 200){
            navigate('/');
          }
      }).catch(error => {
        console.error("Error:", error.response?.data || error.message);
    });
      }else{
        axios.post("http://localhost:3000/user/signup", {
    username: username,
    name:name,
    password: password,
    confirmPassword: confirmPassword
})
.then(response => {
    console.log("Response:", response.data);
    if(response.status === 200){
      navigate('/');
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
        <CardTitle>Sign Up to Jeevan-Sarathi</CardTitle>
        <CardDescription>
          Or continue to login
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={handleLogin}>Log In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="username"
                type="email"
                ref={usernameRef}
                placeholder="m@example.com"
                required
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
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" ref={passwordRef} required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input id="cpassword" type="password" ref={confirmPasswordRef} required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" onClick={handleRegisterClick} className="bg-gray-200 border border-2 w-full">
          Sign Up
        </Button>
        <h6 className="underline cursor-pointer" onClick={handleTextClick}>login as {who?"user":"hospital"}?</h6>
      </CardFooter>
    </Card>
  )
}

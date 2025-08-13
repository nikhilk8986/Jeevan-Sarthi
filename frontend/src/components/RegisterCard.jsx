import { Button } from "@/components/ui/button"
import { useState } from "react"
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

export function RegisterCard() {
    const navigate  = useNavigate()
function handleLogin(){
    navigate("/login")
}
const [who,setWho]=useState(0);//0==user
    function handleTextClick(){
      setWho(!who)
      
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
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Sayan"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input id="cpassword" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="bg-gray-200 border border-2 w-full">
          Sign Up
        </Button>
        <h6 className="underline cursor-pointer" onClick={handleTextClick}>login as {who?"user":"hospital"}?</h6>
      </CardFooter>
    </Card>
  )
}

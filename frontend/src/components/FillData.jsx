import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function FillData() {
  const navigate = useNavigate();
  const { userToken } = useAuth();
  const usernameRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const dobRef = useRef();
  const bloodGroupRef = useRef();
  const sexRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    
    const address = addressRef.current.value;
    const DOB = dobRef.current.value;
    const bloodGroup = bloodGroupRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const sex = sexRef.current.value;

    axios.post('http://localhost:3000/user/fillData',
      {
        address: address,
        DOB: DOB,
        bloodGroup: bloodGroup,
        email: email,
        phone: phone,
        sex: sex
      },
      {
        headers: {
          token: userToken
        }
      }
    ).then(
      res => {
        console.log(res.data.message);
        navigate('/');
      }
    ).catch(
      err => console.log(err)
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input ref={usernameRef} type="text" placeholder="Type here" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input ref={nameRef} type="text" placeholder="Type here" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Textarea ref={addressRef} placeholder="Enter your address" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input ref={phoneRef} type="text" placeholder="Type here" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input ref={emailRef} type="email" placeholder="Type here" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <Input ref={dobRef} type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Blood Group</label>
              <Select onValueChange={(value) => bloodGroupRef.current = { value } }>
                <SelectTrigger>
                  <SelectValue placeholder="Select your blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sex</label>
              <Select onValueChange={(value) => sexRef.current = { value } }>
                <SelectTrigger>
                  <SelectValue placeholder="Select your sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6"
              >
                Save Details
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

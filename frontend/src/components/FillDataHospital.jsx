import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_ENDPOINTS } from "../config/config";

export default function FillDataHospital() {
  const navigate = useNavigate();
  const { hospitalToken } = useAuth();
  const usernameRef = useRef();
  const nameRef = useRef(); 
  const addressRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  function submitHandler(){
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const address = addressRef.current.value;
    
    axios.post(API_ENDPOINTS.HOSPITAL_FILL_DATA,
      {
        email: email,
        address: address,
        phone: phone
      },
      {
        headers: {
          token: hospitalToken
        }
      }
    ).then(
      res => {
        console.log(res.data.message);
        navigate('/hospitaldashboard');
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
            Hospital Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
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
            <div className="flex justify-end">
              <Button 
                onClick={submitHandler}
                type="button"
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

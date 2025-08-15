import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BloodDonate() {
  const navigate = useNavigate();
  const { hospitalToken } = useAuth();
  const usernameRef = useRef();
  const bloodRef = useRef(); 
  const volumeRef = useRef();

  function submitHandler(){
    const username = usernameRef.current.value;
    const bloodGroup = bloodRef.current.value;
    const volume = volumeRef.current.value;

    axios.post('http://localhost:3000/hospital/donate',
      { 
        donorUsername: username,
        bloodGroup: bloodGroup,
        volume: volume
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
    <div className="max-w-2xl min-h-screen mx-auto px-8 py-6">
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
              <label className="text-sm font-medium">Blood Group</label>
              <Input ref={bloodRef} type="text" placeholder="Type here" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Volume</label>
              <Input ref={volumeRef} type="text" placeholder="Type here" />
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

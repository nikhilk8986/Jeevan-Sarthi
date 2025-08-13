import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterCard } from "./RegisterCard";
export default function Register() {
    return (
        <div className="flex justify-center items-center my-[7%]">
            <RegisterCard/>
        </div>
    )
}

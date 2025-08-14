import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useState } from "react"
import { BloodInventory } from "./BloodInventory"
import { DataTableDemo } from "./DonationList"
import {CarouselDemo} from './DashboardSlider'



export function HospitalDashboard() {
  const [patientGoal, setPatientGoal] = useState(1247);
  const [bedGoal, setBedGoal] = useState(89);
  const [staffGoal, setStaffGoal] = useState(156);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleIncrement = (setter, currentValue) => {
    setter(currentValue + 1);
  };

  const handleDecrement = (setter, currentValue) => {
    if (currentValue > 0) {
      setter(currentValue - 1);
    }
  };

  const handleSetGoal = (metric) => {
    alert(`${metric} goal has been set!`);
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full flex-col p-6 bg-gradient-to-b from-blue-600 to-blue-700 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Hospital Dashboard</h2>
            <div className="w-12 h-1 bg-blue-300 rounded-full"></div>
          </div>
          <span className="font-semibold">
            <ul className="menu bg-white/10 backdrop-blur-sm rounded-xl w-full border border-white/20 shadow-lg">
                <li className="mb-2">
                  <a 
                    className={`text-white rounded-lg mx-2 my-1 cursor-pointer transition-all duration-200 ${
                      activeMenu === "dashboard" ? "bg-white/20 font-semibold" : "hover:bg-white/20"
                    }`}
                    onClick={() => handleMenuClick("dashboard")}
                  >
                    Dashboard
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    className={`text-white rounded-lg mx-2 my-1 cursor-pointer transition-all duration-200 ${
                      activeMenu === "patients" ? "bg-white/20 font-semibold" : "hover:bg-white/20"
                    }`}
                    onClick={() => handleMenuClick("patients")}
                  >
                    Past Donors
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    className={`text-white rounded-lg mx-2 my-1 cursor-pointer transition-all duration-200 ${
                      activeMenu === "inventory" ? "bg-white/20 font-semibold" : "hover:bg-white/20"
                    }`}
                    onClick={() => handleMenuClick("inventory")}
                  >
                     Inventory
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    className={`text-white rounded-lg mx-2 my-1 cursor-pointer transition-all duration-200 ${
                      activeMenu === "analytics" ? "bg-white/20 font-semibold" : "hover:bg-white/20"
                    }`}
                    onClick={() => handleMenuClick("analytics")}
                  >
                     Analytics
                  </a>
                </li>
                <li className="mb-2">
                  <a 
                    className={`text-white rounded-lg mx-2 my-1 cursor-pointer transition-all duration-200 ${
                      activeMenu === "settings" ? "bg-white/20 font-semibold" : "hover:bg-white/20"
                    }`}
                    onClick={() => handleMenuClick("settings")}
                  >
                     Settings
                  </a>
                </li>
            </ul>
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-gradient-to-r from-blue-600 to-blue-700" />
      <ResizablePanel defaultSize={75}>
        {activeMenu === "dashboard" ? (
          <div className="flex h-full flex-col p-8 bg-white">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Here's what's happening at your hospital today.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">Total Patients</h3>
                  <p className="text-gray-400 text-sm">Set your daily patient goal</p>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                    onClick={() => handleDecrement(setPatientGoal, patientGoal)}
                  >-</button>
                  <div className="mx-6 text-center">
                    <div className="text-4xl font-bold">{patientGoal}</div>
                    <div className="text-gray-400 text-sm">PATIENTS/DAY</div>
                  </div>
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                    onClick={() => handleIncrement(setPatientGoal, patientGoal)}
                  >+</button>
                </div>
                <div className="flex justify-between items-end h-16">
                  {[4, 7, 3, 8, 5, 9, 6, 4, 7, 5].map((height, index) => (
                    <div key={index} className="w-1 bg-blue-500 rounded-full" style={{height: `${height * 8}px`}}></div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">Available Beds</h3>
                  <p className="text-gray-400 text-sm">Set your daily bed goal</p>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                    onClick={() => handleDecrement(setBedGoal, bedGoal)}
                  >-</button>
                  <div className="mx-6 text-center">
                    <div className="text-4xl font-bold">{bedGoal}</div>
                    <div className="text-gray-400 text-sm">BEDS/DAY</div>
                  </div>
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                    onClick={() => handleIncrement(setBedGoal, bedGoal)}
                  >+</button>
                </div>
                <div className="flex justify-between items-end h-16">
                  {[6, 8, 5, 7, 9, 4, 6, 8, 5, 7].map((height, index) => (
                    <div key={index} className="w-1 bg-green-500 rounded-full" style={{height: `${height * 8}px`}}></div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-white">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">Staff Online</h3>
                  <p className="text-gray-400 text-sm">Set your daily staff goal</p>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                    onClick={() => handleDecrement(setStaffGoal, staffGoal)}
                  >-</button>
                  <div className="mx-6 text-center">
                    <div className="text-4xl font-bold">{staffGoal}</div>
                    <div className="text-gray-400 text-sm">STAFF/DAY</div>
                  </div>
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition-colors"
                    onClick={() => handleIncrement(setStaffGoal, staffGoal)}
                  >+</button>
                </div>
                <div className="flex justify-between items-end h-16">
                  {[5, 7, 6, 8, 4, 9, 5, 7, 6, 8].map((height, index) => (
                    <div key={index} className="w-1 bg-purple-500 rounded-full" style={{height: `${height * 8}px`}}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-8 w-full">
                <CarouselDemo/>
            </div>
          </div>
        ) : activeMenu === "inventory" ? (
          <BloodInventory />
        ) : activeMenu === "patients" ? (
          <div className="flex h-full flex-col p-8 bg-white">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Management</h1>
              <p className="text-gray-600">View and manage donor information and blood donations.</p>
            </div>
            <DataTableDemo />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-8 bg-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This feature is under development.</p>
            </div>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { BrowserRouter,Routes,Route,Outlet } from "react-router-dom";
import Register from "./components/Register";
import FillData from "./components/FillData";
import { DataTableDemo } from "./components/DonationList";
import {HospitalDashboard} from './components/HospitalDashboard'
import {BloodInventory} from './components/BloodInventory'
import FillDataHospital from "./components/FillDataHospital";
import {UserFeed} from "./components/UserFeed";
import {UserDashboard} from "./components/UserDashboard"
function App() {
 

  

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<FillDataHospital/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/filldata' element={<FillData/>}/>
                <Route path='/userdashboard' element={<UserDashboard/>}/>
                <Route path='/userfeed' element={<UserFeed/>}/>
                <Route path='/bloodinventory' element={<BloodInventory/>}/>
                <Route path='/filldatahospital' element={<FillDataHospital/>}/>
                <Route path='/datatable' element={<DataTableDemo/>}/>
                <Route path='/hospitaldashboard' element={<HospitalDashboard/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    
    </>
  );
}

function Layout(){
  return(
    <div>
      <NavigationBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App;

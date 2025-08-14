import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { BrowserRouter,Routes,Route,Outlet } from "react-router-dom";
import Register from "./components/Register";
import FillData from "./components/FillData";
import { DataTableDemo } from "./components/DonationList";
import {ResizableHandleDemo} from './components/HospitalDashboard'
import {BloodInventory} from './components/BloodInventory'
import FillDataHospital from "./components/FillDataHospital";
function App() {
 

  

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<ResizableHandleDemo/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/filldata' element={<FillData/>}/>
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

import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { BrowserRouter,Routes,Route,Outlet } from "react-router-dom";

function App() {
 

  

  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<HeroSection/>}/>
                <Route path='/login' element={<Login/>}/>
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

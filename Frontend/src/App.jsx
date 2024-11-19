import { createContext, useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Registor from './pages/Login/Resgistor';
import Navbar from './pages/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard/Dashboard';

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const role =  getCookie("role");
// console.log(role)
const userContext = createContext();

function App() {


 

    const [userRole , setUserRole ] = useState( role || false);

    const updateSetUserRole = value =>{
      setUserRole(value);
    }



  return (
    <>
    <div className=" w-full min-h-screen ">
      <userContext.Provider value={{userRole , updateSetUserRole }} >
        <BrowserRouter>
                 <Navbar />
          <ToastContainer stacked />


          <Routes>           
              <Route path={"/"} element={<Home/>} />
              <Route path={"/contactus"} element={<Contact/>} />
              <Route path={"/about"} element={<About />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/registor"} element={<Registor/>} />
              <Route path={"/dashboard"} element={<Dashboard/>} />
          


          </Routes>


      </BrowserRouter>
      </userContext.Provider>
        <Footer/>
    {/* <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Blood Bank</h1>
      <p className="text-lg text-center mb-4">
        Your one-stop solution for blood donation and transfusion services.
      </p>
      <div className="flex justify-center">
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Donate Blood
        </button>
      </div>
    </div> */}
      </div>
    </>
  )
}
export {userContext};
export default App

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPass from "./pages/ForgotPass";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup"
import Header from "./Components/Header";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Footer from "./Components/Footer";



function App() {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/forgot" element={<ForgotPass/>}></Route>
          <Route path="/offers" element={<Offers/>}></Route>
    
          <Route path="/create_listing" element={<PrivateRoute/>}>
                <Route path="/create_listing" element={<CreateListing/>}></Route>
          </Route>

          <Route path="/profile" element={<PrivateRoute/>}>
             <Route path="/profile" element={<Profile/>}></Route>
          </Route>

          <Route path="/sign_in" element={<SignIn/>}></Route>
          <Route path="/sign_up" element={<Signup/>}></Route>
        </Routes>
        <Footer/>
      </Router>

      <ToastContainer
       position="bottom-center"
       autoClose={5000}
      hideProgressBar={false}
       newestOnTop={false}
       closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
     theme="dark"
     
/>   
    </>
  )
}
export default App;

import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPass from "./pages/ForgotPass";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup"
import Header from "./Components/Header";

function App() {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/forgot" element={<ForgotPass/>}></Route>
          <Route path="/offers" element={<Offers/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/sign_in" element={<SignIn/>}></Route>
          <Route path="/sign_up" element={<Signup/>}></Route>
        </Routes>
      </Router>
    </>
  )
}
export default App;

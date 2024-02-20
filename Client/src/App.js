
import "./App.css"
import "./responsive.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home'
import Login from './login'
import Navbar from './navbar'
import Signup from './signup'
import Footer from './footer'
import Contact from "./contact";
import List from "./list";

function App() {
  return (
    <div class="app">
    <Navbar />
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/api/v1/users/login" element={<Login />} />
      <Route path="/api/v1/users/register" element={<Signup />} />
      <Route path="/api/v1/users/contact" element={<Contact />}/>
      <Route path="/api/v1/users/bikedetails" element={<List />}/>
      

    </Routes>
    </BrowserRouter>
    <Footer/>
    
    </div>
  );
}

export default App;

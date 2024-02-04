
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home'
import Login from './login'
import Navbar from './navbar'
import Signup from './signup'
import Footer from './footer'
import Contact from "./contact";

function App() {
  return (
    <div class="app">
    <Navbar />
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/api/v1/user/login" element={<Login />} />
      <Route path="/api/v1/user/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />}/>

    </Routes>
    </BrowserRouter>
    <Footer/>
    
    </div>
  );
}

export default App;

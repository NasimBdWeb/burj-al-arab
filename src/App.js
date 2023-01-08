import './App.css';
import Home from './component/Home/Home';
import Room from './component/Room/Room';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Book from './component/Book/Book';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import Signup from './component/Authentication/Signup'
import Login from './component/Authentication/Login'
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Bookings from './component/Book/Bookings';
export const UserContext = createContext();

function App() {

  
  const [loggedInuser,setloggedInuser] = useState({})
  return (
    <>
    <UserContext.Provider value={[loggedInuser,setloggedInuser]}> 
    <BrowserRouter>
    <Header></Header>
    <p>Email :{loggedInuser.name}</p>
     <Routes>
     <Route element={<PrivateRoute />} >
     <Route element={<Book />} path='/book' /> 
     </Route>
     <Route element={<PrivateRoute />} >
     <Route element={<Bookings />} path='/bookingslist' /> 
     </Route>
     
     <Route path='/login' element={<Login />} /> 
     <Route path='/signup' element={<Signup/>} />
     <Route path='/' element={<Home />} />

    
     </Routes>
    
     <Footer></Footer>
    </BrowserRouter>  
    </UserContext.Provider>
     
    </>
  );
}

export default App;

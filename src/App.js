

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { BrowserRouter as Router,  Route,Routes,Link } from 'react-router-dom';
import LoginForm from './Component/login';
import SearchForm from './Component/searchShow';
import { useEffect, useState } from 'react';
import { createContext } from "react";
export const userContext = createContext();
function App() {
  const [token,setToken] = useState("uyiuyiyu878")
  console.log("app token",token)
  useEffect(()=>{

  },[token])
  return (
    <userContext.Provider value={{ token, setToken }}>
      <Router>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Home
        </Typography>
        <Button color="inherit" component={Link} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  <Routes>
           
            <Route path="/login" element={<LoginForm />} />
            <Route path="/search" element={<SearchForm />} />
           
          </Routes>
  </Router>
  </userContext.Provider>
  );
}

export default App;

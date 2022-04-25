import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";
const Header = ({ children, hasHiddenAuthButtons }) => {

  const history= useHistory();
  const logout=()=>{
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    history.push("/");
    window.location.reload();
  }
  if(hasHiddenAuthButtons){
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text" onClick={()=> history.push('/')}
        >
          Back to explore
        </Button>
      </Box>);
  }
  else{
      return(
        <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          {
            localStorage.getItem('username')?(
              <><Avatar src="avtar.png" alt={localStorage.getItem('username')}
              />
              <p className="username-text">{localStorage.getItem('username')}</p>
              <Button type="primary" onClick={logout}>
                Logout
              </Button>
              </>
            ):(
              <>
              <Button onClick={()=> history.push('/login')}>Login</Button>
              <Button onClick={()=> history.push('/register')} variant="contained">Register</Button>
              </>
            )}
        </Stack>
      </Box>
      );
  }
};

export default Header;

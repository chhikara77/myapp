import React, { useState,useContext } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { userContext } from "../App";
const LoginForm = () => {
  const {token,setToken} = useContext(userContext)
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const naviagte = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email');
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be 8 to 16 characters and alphanumeric');
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Validate email and password fields before submission
    validateEmail();
    validatePassword();
  
    if (!emailError && !passwordError) {
      try {
        // Make API request to /userlogin
        const response = await fetch('https://tv-seriesapi.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username:email, password }),
        });
  
        if (response.ok) {
          const { token } = await response.json();
          setToken(token)
          // Redirect to search page
          naviagte('/search');
        } else {
          setShowSnackbar(true); // Show snack bar with notification
          setSnackbarMessage('Invalid email or password');
        }
      } catch (error) {
        console.error('Error:', error);
        setShowSnackbar(true);
        setSnackbarMessage('An error occurred. Please try again later.');
      }
  
      // Reset form fields
      setEmail('');
      setPassword('');
    }
  };
  

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Validate email and password fields before submission
//     validateEmail();
//     validatePassword();

//     if (!emailError && !passwordError) {
//       // Perform login logic here (e.g., make API request)
//       // For demonstration purposes, let's assume login is successful
//       const loginSuccessful = true;

//       if (loginSuccessful) {
//         // Redirect to search page
//         naviagte('/search');
//       } else {
//         setShowSnackbar(true); // Show snack bar with notification
//         setSnackbarMessage('Invalid email or password');
//       }

//       // Reset form fields
//       setEmail('');
//       setPassword('');
//     }
//   };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={validateEmail}
        error={emailError}
        helperText={emailErrorMessage}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={validatePassword}
        error={passwordError}
        helperText={passwordErrorMessage}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </form>
  );
};

export default LoginForm;

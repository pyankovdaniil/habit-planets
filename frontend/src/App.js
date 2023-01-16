import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import React from "react";
import {Routes, Route} from 'react-router-dom';
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path='/sign-up' element={<SignUpPage />}/>
        <Route path='/sign-in' element={<SignInPage />}/>
    </Routes>
    </ThemeProvider>
  );
}

export default App;

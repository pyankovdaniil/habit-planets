import React from "react";
import {Routes, Route} from 'react-router-dom';
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";

function App() {
  return (
    <Routes>
        <Route path='/sign-up' element={<SignUpPage />}/>
        <Route path='/sign-in' element={<SignInPage />}/>
    </Routes>
  );
}

export default App;

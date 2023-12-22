import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';

import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import { HomePage } from './pages/home'

import { MyNavBar } from "./components/navbar";
import {ProfilePage} from "./pages/profile";


function App()
{

    return (

    <div className="App">

        <div>
            {<MyNavBar/>}
        </div>

        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>

    </div>

  )
}

export default App;

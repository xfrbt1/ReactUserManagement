import React from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'

import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import { HomePage } from './pages/home'
import { UsersPage } from './pages/users'
import { ProfilePage } from "./pages/profile"


import { MyNavBar } from "./components/navbar"


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
            <Route path="/users" element={<UsersPage />} />
        </Routes>

    </div>

  )
}

export default App;

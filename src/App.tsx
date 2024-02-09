import React from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import { HomePage } from './pages/home'
import { UsersPage } from './pages/users'
import { ProfilePage } from "./pages/profile"
import { UserPage} from "./pages/user";
import { MyNavBar } from "./components/navbar"


const App = () =>
{

    return (
    // <Provider userStore={userStore}>
        <div className="App">
            {<MyNavBar/>}
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/user" element={<UserPage />} />
                </Routes>
        </div>
    // </Provider>

  )
}

export default App;

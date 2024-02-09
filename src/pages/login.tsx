import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {MyForm} from "../components/form";
import {MyDivisionLine} from "../components/divisionline";
import {send_login_request} from "../requests/login_page_api";
import user_store from "../stores/userstore"
import {observer} from "mobx-react-lite";
import axios from "axios";

const login_fields =
    {
        login: 'text',
        password: 'password'
    }

const LoginPage = observer(() =>
{
    const {set_new_data} = user_store
    const navigate = useNavigate()
    const  HandleLoginFormSubmit = async (form_data: Record<string, string>) =>
    {
        if (form_data.login === "" ||
            form_data.password === "")
        {
            alert("MISSING REQUIRED FIELDS")
        }
        else
        {
            try
            {
                const response = await send_login_request(form_data)

                const access = response.data.access
                localStorage.setItem('access', access)
                localStorage.setItem('refresh', response.data.refresh)

                const headers = {"access-token": access}
                const response_get = await axios.get
                ('http://localhost:8000/user/me', {headers: headers})
                console.log(response_get)
                set_new_data(response_get.data)
                navigate('/profile')
            }
            catch (error)
            {
                alert("INCORRECT CREDENTIALS\nSERVER ERROR\nSERVER IS NOT AVAILABLE")
            }
        }
    }

    return (

        <div className="my_container">
            <MyDivisionLine/>
            <h1 style={{ color: 'black', textAlign: "center" }}>Enter your credentials</h1>
            <MyForm fields={login_fields}
                    on_submit={HandleLoginFormSubmit}
                    button_label={"Next"}
                    initial_values={null}
            />

            <Link to="/signup" className="my_ref">New? Sign Up</Link><br/><br/>
            <Link to="/reset-password" className="my_ref">Forgot password? Reset</Link>
        </div>
    )
})

export {LoginPage}

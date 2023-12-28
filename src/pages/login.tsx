import React from 'react';

import {Link} from "react-router-dom";
import {MyForm} from "../components/form";
import {send_login_request} from "../requests/login_page_api";

const login_fields =
    {
        login: 'text',
        password: 'password'
    }

function LoginPage()
{

    async function HandleLoginFormSubmit (form_data: Record<string, string>)
    {
        if (form_data.login === "" ||
            form_data.password === "")
        {
            alert("MISSING REQUIRED FIELDS")
        }
        else

            try
            {
                const response = await send_login_request(form_data)
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                window.location.href = "/profile"
            }
            catch (error)
            {
                alert("INCORRECT CREDENTIALS\nSERVER ERROR\nSERVER IS NOT AVAILABLE")
            }
    }

    return (

        <div className="my_body">
        <div className="my_container">

            <h1 style={{ color: 'black', textAlign: "center" }}>Enter your credentials</h1>

            <MyForm fields={login_fields}
                    on_submit={HandleLoginFormSubmit}
                    button_label={"Next"}
                    initial_values={null}
            />

            <Link to="/signup" className="my_ref">New? Sign Up</Link><br/><br/>
            <Link to="/reset-password" className="my_ref">Forgot password? Reset</Link>

        </div>
        </div>
    )
}

export {LoginPage}

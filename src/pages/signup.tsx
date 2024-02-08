import React from 'react';
import {Link} from "react-router-dom";
import {MyForm} from "../components/form";

import {send_signup_request} from "../requests/signup_page_api";
import {MyDivisionLine} from "../components/divisionline";

const signup_fields =
    {
    username: 'text' ,
    email: 'text',
    phone_number: 'text',
    name: 'text',
    surname: 'text',
    password: 'password'
    }

function SignupPage()
{

    async function HandleSignUpFormSubmit (form_data: Record<string, string>)
    {
        if (form_data.name === "" ||
            form_data.surname === "" ||
            form_data.username === "" ||
            form_data.email === "" ||
            form_data.phone_number === "" ||
            form_data.password === "")
        {
            alert("MISSING REQUIRED FIELDS")
        }

        else
        {

            try
            {
                const response = await send_signup_request(form_data)

                if (response.status === 200)
                {
                    window.location.href = '/login'
                }
            }

            catch (error)
            {
                console.log(error)
                alert("INCORRECT CREDENTIALS\nSERVER ERROR\nSERVER IS NOT AVAILABLE")
            }

        }
    }

    return (
            <div className="my_container">
                <MyDivisionLine/>
                <h1 style={{ color: 'black', textAlign: "center" }}>Create account</h1>

                <MyForm fields={signup_fields}
                        on_submit={HandleSignUpFormSubmit}
                        button_label={"Next"}
                        initial_values={null}
                />

                <Link to="/login" className="my_ref">Already in system? Log In</Link><br/><br/>
            </div>
    )
}

export {SignupPage}
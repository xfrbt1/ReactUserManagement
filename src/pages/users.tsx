import React, {useState} from 'react';

import {MyForm} from "../components/form";
import {MyUserCard} from "../components/usercard";
import {MyButton} from "../components/button";

import {send_get_users_request} from '../requests/users_page_api'

const query_params_form_fields =
    {
        limit: 'number',
        order_by: 'text',
        sort_by: 'text',
        filter_by_name: 'text'
    }

const query_initial_values =
    {
        limit: 10,
        order_by: 'ASC',
        sort_by: 'created_at',
        filter_by_name: ''
    }

function UsersPage()
{

    const [is_token, set_auth] = useState(false)
    const [users_data, set_user_data_array] = useState<Record<string, string>[] | null>(null)

    const [current_page, set_page] = useState<number>(1)
    const [current_form_data, set_form_data] = useState<Record<string, any>>({})

    if (!is_token)
    {
        const access_token = localStorage.getItem('access')
        if (access_token == null)
        {
            window.location.href = '/login'
        }
        else
        {
            set_auth(true)
        }
    }

    const handle_form_data_change = (form_data: Record<string, string>) =>
    {
        set_form_data(form_data)
    }

    const handle_query_form_submit = async (query_form_data: Record<string, any>) =>
    {
        try
        {
            const response = await send_get_users_request(query_form_data)

            if (response.status === 200)
            {
                console.log(response.data)
                set_user_data_array(response.data.Users)
            }
        }
        catch (error)
        {
            alert("YOU HAVE NO PERMISSION")
        }
    }

    const handle_page_change = async (num: number) =>
    {
        let current_page_value = current_page
        if (current_page_value > 0 && current_page_value + num > 0)
        {
            current_page_value = current_page_value + num
        }
        let form_data = current_form_data
        set_page(current_page_value)
        form_data["page"] = current_page_value
        console.log(form_data)
        await handle_query_form_submit(form_data)
    }


    return (
        <div className="my_body">
            <div className="my_container">
                {is_token
                ?
                    (<div>
                        <h1 style={{color: 'black', textAlign: "center"}}>
                        Users
                        </h1>
                        <MyForm fields={query_params_form_fields}
                            on_submit={handle_query_form_submit}
                            button_label={"Filter"}
                            initial_values={query_initial_values}
                            on_form_data_change={handle_form_data_change} />
                    </div>  )
                : (<div></div>)
                }

                {users_data
                    ?
                    (
                        <div><div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {users_data.map(user => <MyUserCard data={user} />)}
                        </div>
                        <div>
                    <MyButton label={"prev"} onclick={() => handle_page_change(-1)}/>
                    <span style={{fontWeight:'bold'}}> {current_page} </span>
                    <MyButton label={"next"} onclick={() => handle_page_change(1)}/>
                        </div></div>
                    )
                    :
                    (<div></div>)

                }
            </div>
        </div>
    )
}

export {UsersPage}
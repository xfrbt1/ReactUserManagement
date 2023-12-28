import React, {useState, useRef} from 'react';

import {MyForm} from "../components/form";
import {MyUserCard} from "../components/usercard";
import {MyButton} from "../components/button";

import {send_get_users_request} from '../requests/users_page_api'

const query_params_form_fields =
    {
        limit: {id: 'limit', type: 'number'},
        order_by: {id: 'order_by', type: 'text'},
        sort_by: {id: 'sort_by', type: 'text'},
        filter_by_name: {id: 'filter_by_name', type: 'text'},

    }

const query_initial_values =
    {
        limit: 10,
        order_by: 'ASC',
        sort_by: 'created_at',
        filter_by_name: '',
    }

function UsersPage()
{

    const [is_token, set_auth] = useState(false)
    const [users_data, set_user_data_array] = useState<Record<string, string>[] | null>(null)

    const [current_page, set_page] = useState<number>(1)

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

    const handle_query_form_submit = async (query_form_data: Record<string, any>) =>
    {
        try
        {
            if (current_page > 0)
            {
                query_form_data["page"] = current_page
            }

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

    const form_ref = useRef()

    const handle_prev_page = () =>
    {
        set_page(prevState => prevState - 1)
        console.log(current_page)
    }
    const handle_next_page = () =>
    {
        set_page(prevState => prevState + 1)
        console.log(current_page)
    }


    return (
        <div className="my_body">
            <div className="my_container">
                <h1 style={{color: 'black', textAlign: "center"}}>
                    Users
                </h1>
                <MyForm
                    fields={query_params_form_fields}
                    onsubmit={handle_query_form_submit}
                    initial_values={query_initial_values}
                    button_label={"Filter"}
                />
                {users_data
                    ?
                    (
                        <div>
                            {users_data.map(user => <MyUserCard data={user} />)}
                            <MyButton label={"prev"} onclick={handle_prev_page}/>
                            <text style={{fontWeight:'bold'}}> {current_page} </text>
                            <MyButton label={"next"} onclick={handle_next_page}/>
                        </div>
                    )
                    :
                    (<div></div>)
                    }
            </div>
        </div>
    )
}

export {UsersPage}
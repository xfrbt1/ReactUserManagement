import React, {useEffect, useState} from 'react';

import {MyButton} from "../components/button";
import {MyUserCard} from "../components/usercard";
import {get_user_by_id, patch_user_by_id} from "../requests/user_page_api";
import {MyEditForm} from "../components/editform";
import {MyDivisionLine} from "../components/divisionline";


const user_card_fields =
    {
        username: 'text',
        email: 'text',
        name: 'text',
        surname: 'text',
        phone_number: 'text',
        group_id: 'number'
    }

function UserPage()
{
    const [is_token, set_auth] = useState(false)
    const [user_id, set_user_id] = useState('')
    const [user_data, set_user_data] = useState(null)
    const [edit, set_edit_mode] = useState(false);


    const handle_user_id_input_change = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        set_user_id(e.target.value)
    }

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

    const search_button_click = async () =>
    {
        try
        {
            if (user_id === '')
            {
                alert("MISSING REQUIRED FIELDS")
            }

            const response = await get_user_by_id(user_id)

            if (response.status === 200)
            {
                set_user_data(response.data)
            }
        }
        catch (error)
        {
            console.log(error)
        }
    }

    const handle_update = async (form_data: Record<string, string>, file_data: File | null) =>
    {
        try
        {
            const response = await patch_user_by_id(form_data, file_data, user_id)

            if (response.status === 200)
            {
                set_user_data(response.data)
            }
            set_edit_mode(false)
        }
        catch (error)
        {
            console.log("ERROR: ", error)
        }
    }

    return (
            <div className="my_container">
                <MyDivisionLine/>
                {is_token
                        ?
                        (<div>
                            <h1 style={{color: 'black', textAlign: "center"}}>
                                User
                            </h1>
                            <input
                                className={'my_search_line'}
                                type={'text'}
                                value={user_id}
                                placeholder={'ID'}
                                onChange={handle_user_id_input_change}/>
                            <span> </span>
                            <MyButton
                                label={'Search'}
                                onclick={search_button_click}
                                class_name={"my_button"}
                            />
                        </div>)
                        :
                        (<div></div>)
                }
                {edit ?
                        (
                            <div>
                                <h1 style={{color: 'black', textAlign: "center"}}>
                                    Edit user profile
                                </h1>

                                <MyEditForm
                                    fields={user_card_fields}
                                    on_submit={handle_update}
                                    button_label={"Submit"}
                                    initial_values={user_data}
                                />
                                <MyButton label={"Back"} onclick={() => set_edit_mode(false)} class_name={"my_button"}/>
                            </div>
                        )
                        : user_data ?
                        (<div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <h1 style={{color: 'black', textAlign: "center"}}>
                                User profile
                            </h1>
                            <MyUserCard data={user_data}/>
                            <MyButton label={"Edit"} onclick={() => set_edit_mode(true)} class_name={"my_button"}/>
                        </div>)
                            :
                        <div></div>
                }

            </div>
    )
}

export {UserPage}
import React, {useEffect, useState} from 'react';

import {MyEditForm} from "../components/editform";
import {MyUserCard} from "../components/usercard";
import {MyButton} from "../components/button";
import {MyDivisionLine} from "../components/divisionline";
import {send_edit_request, send_get_user_data, send_delete_request} from "../requests/profile_page_api";

import user_store from "../stores/userstore"
import {observer} from "mobx-react-lite";

const profile_fields =
    {
        username: 'text',
        email: 'text',
        name: 'text',
        surname: 'text',
        phone_number: 'text',
        group_id: 'number',
    }

const ProfilePage = observer(() =>
{

    const [loading, set_loading] = useState(true);
    const [edit, set_edit_mode] = useState(false);
    const [json_data, set_data] = useState(null);

    const {set_new_data} = user_store

    useEffect(() =>
    {
        send_get_user_data(set_data, set_loading)
    }, [])



    if (loading)
    {
        return <h1 style={{color: 'black', textAlign: "center"}}>Loading...</h1>
    }

    if (json_data)
    {
        set_new_data(json_data)
    }

     const handle_delete = async () =>
    {
        try
        {
            const response = await send_delete_request()
            if (response.status === 200)
            {
                window.location.href = '/login'
            }
        }
        catch (error)
        {
            window.location.href = '/home'
        }
    }

    const create_initial_object = (profile_fields: Record<string, any>, json_data: Record<string, any>) =>
    {
        const result: Record<string, any> = {}

        for (const key in profile_fields)
        {
            if (profile_fields.hasOwnProperty(key) && json_data.hasOwnProperty(key))
            {
                result[key] = json_data[key]
            }
        }
        return result
    }

    const handle_update = async (form_data: Record<string, string>, file_date: File | null) =>
    {
        try
        {
            console.log(form_data)
            const response = await send_edit_request(form_data, file_date)
            set_new_data(response.data)
            set_edit_mode(false)
        }
        catch (error)
        {
            console.error(error)
            alert("INCORRECT VALUES")
        }
    }


    return (
                <div className="my_container">
                {edit
                    ?
                    (<div>
                        <MyDivisionLine/>
                            <h1 style={{color: 'black', textAlign: "center"}}>
                                Edit your profile
                            </h1>

                            <MyEditForm
                            fields={profile_fields}
                            on_submit={handle_update}
                            button_label={"Submit"}
                            initial_values=
                                {
                            json_data
                                ?
                                create_initial_object(profile_fields, json_data)
                                : null
                                }
                            />
                            <MyButton label={"Profile"}
                                      onclick={() => set_edit_mode(false)}
                                      class_name={"my_button"}/>
                    </div>
                    )
                    :
                    (<div><MyDivisionLine/>
                    <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <h1 style={{color: 'black', textAlign: "center"}}>
                                Profile
                            </h1>

                                <MyUserCard data={json_data}/>
                                <MyButton
                                    onclick={() => set_edit_mode(true)}
                                    label={"Edit"}
                                    class_name={"my_button"}/>
                                <br/>
                                <MyButton onclick={handle_delete}
                                          label={"Delete"}
                                          class_name={"my_button_red"}/>
                    </div>
                        </div>
                    )
                }
                </div>
    )
})

export {ProfilePage}
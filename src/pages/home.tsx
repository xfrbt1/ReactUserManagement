import React, {useEffect, useState} from "react";
import {MyButton} from "../components/button";
import {MyForm} from "../components/form";
import {MyDivisionLine} from "../components/divisionline";
import axios from "axios";

import userStore from "../stores/userstore"
import {observer} from "mobx-react";
import {reaction} from "mobx";


const HomePage = () => {
    let a: number = 0

    const color_fields =
        {
            red: 'number',
            green: 'number',
            blue: 'number',
        }

    function example_handler()
    {
        console.log("Example Button Component Pressed")
        a = a + 1
    }

    const [count, set_count] = useState(0)
    const [response, set_response] = useState<Record<string, string>>({})

    function counter_handler()
    {
        set_count((prev) => prev + 1)
        console.log("After press: ", count)
    }

    function reset_counter()
    {
        set_count(0)
        console.log("Reset: ", count)
    }

    const [form, update_state] = useState({"red": 0, "green": 0, "blue": 0})
    const [string_color, update_string_color] = useState('rgb(0, 0, 0)')

    function update_color(form_data: Record<string, string>)
    {
        const r = parseInt(form_data.red, 10) || 0
        const g = parseInt(form_data.green, 10) || 0
        const b = parseInt(form_data.blue, 10) || 0

        update_state((prevState) => ({
            ...prevState,
            red: r,
            green: g,
            blue: b,
        }));

        update_string_color(`rgb(${r}, ${g}, ${b})`)
        console.log(form)
        console.log(string_color)
    }

    const sending_request = async () =>
    {
        try
        {
            console.log("SEND REQUEST TO HEALTHCHECK!")

            const response = await axios.get('http://localhost:8000/healthcheck');
            const data = response.data;

            console.log(data)
            set_response(prev => data)
        }
        catch (error)
        {
            console.error('ERROR:', error);
            alert("SERVER IS NOT AVAILABLE")
        }
    }

    return (
            <div className="my_container">
                <MyDivisionLine/>
                <MyButton label={"Add a"} onclick={example_handler} class_name={"my_button"}/><span> </span>
                <MyButton label={"Add count"} onclick={counter_handler} class_name={"my_button"}/><span> </span>
                <MyButton label={"Reset count"} onclick={reset_counter} class_name={"my_button"}/><br/><span> </span>
                <MyButton label={"check state mobx"} onclick={() => console.log(userStore.user_data_json)} class_name={"my_button"}/><br/>

                <h3>count: {count}, a: {a}</h3>
                <MyDivisionLine/>

                <MyForm
                        fields={color_fields}
                        on_submit={update_color}
                        button_label={'Change Color'}
                        initial_values={null}
                />
                    <span style={{color: string_color, fontWeight:"bold"}}>
                        DYNAMIC COLOR
                    </span><br/>
                <MyDivisionLine/>

                <MyButton label={"Send request"} onclick={sending_request} class_name={"my_button"}/><span> </span>
                <MyButton label={"Reset request"} onclick={() => set_response({})} class_name={"my_button"}/>
                <br/><br/>
                <div>
                        {Object.keys(response).map((key) => (
                               <span style={{fontWeight:"bold"}}>
                                   {key}: {response[key]}
                               <br/>
                               </span>
                        ))}
                </div>
            </div>
    )
}

// const HomePage = () => {
//     const [userData, setUserData] = useState(userStore.user_data_json);
//
//     const loadData = async () =>
//     {
//         await userStore.load_data();
//     };
//
//     const deleteData = () =>
//     {
//         userStore.delete_data();
//     };
//
//     useEffect(() =>
//     {
//         const disposer = reaction(
//             () => userStore.user_data_json,
//             (newUserData) => {
//                 setUserData(newUserData);
//             }
//         );
//
//         // Clean up the reaction when the component unmounts
//         return () => {
//             disposer();
//         };
//     }, []);
//
//     return (
//         <div>
//             <button onClick={loadData}>Load Data</button>
//             <button onClick={deleteData}>Delete Data</button>
//             <pre>{JSON.stringify(userStore.user_data_json, null, 2)}</pre>
//         </div>
//     );
// };



export {HomePage}
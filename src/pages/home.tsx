import React, { useState } from "react";
import {MyButton} from "../components/button";
import {MyForm} from "../components/form";
import {MyDivisionLine} from "../components/divisionline";
import axios from "axios";

function HomePage()
{
    let a: number = 0

    function example_handler()
    {
        console.log("Example Button Component Pressed")
        a = a + 1
    }

    const [count, set_count] = useState(0)
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

    interface ApiResponse {
        [key: string]: string;
    }

    const [response, set_response] = useState<ApiResponse>({});
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
    };

    return (
        <div className="my_body">
            <div className="my_container">

                <h3 style={{ color: "white" , textAlign: "left" }}>
                    My first web-site with front-end technologies React, HTML, CSS!<br/>
                    Some universal functionality components represented here!
                </h3>

                <MyDivisionLine/>
                <MyButton label={"Add a"} onclick={example_handler}/><text> </text>
                <MyButton label={"Add count"} onclick={counter_handler}/><text> </text>
                <MyButton label={"Reset count"} onclick={reset_counter}/><br/>
                <h3>count: {count}, a: {a}</h3>
                <MyDivisionLine/>

                <MyForm fields={{
                    red: { id: 'red', type: 'number' },
                    green: { id: 'green', type: 'number' },
                    blue: { id: 'blue', type: 'number' }
                }}
                        onsubmit={update_color}
                        button_label={'Change Color'}
                />
                    <text style={{color: string_color, fontWeight:"bold"}}>
                        DYNAMIC COLOR
                    </text><br/>
                <MyDivisionLine/>

                <MyButton label={"Send request"} onclick={sending_request}/><text> </text>
                <MyButton label={"Reset request"} onclick={() => set_response({})}/>
                <br/><br/>
                <div>
                        {Object.keys(response).map((key) => (
                               <text style={{fontWeight:"bold"}}>
                                   {key}: {response[key]}
                               <br/></text>
                        ))}
                </div>
            </div>
        </div>
    )
}

export {HomePage}
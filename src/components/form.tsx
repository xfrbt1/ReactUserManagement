import React, {useState} from 'react';
import {MyInput} from "./input";


interface FormProps
{
    fields: Record<string, string>
    on_submit: (data: Record<string, string>) => void
    button_label: string
    initial_values: Record<string, any> | null
    on_form_data_change?: (data: Record<string, string>) => void
}

const MyForm: React.FC<FormProps> = ({   fields,
                                         button_label,
                                         initial_values = null,
                                         on_submit,
                                         on_form_data_change
                                     }) =>
{
    const initialFormData: Record<string, string> = {}

    Object.keys(fields).forEach(
        (key) =>
        {
            initialFormData[key] = initial_values?.[key] || ''
        })

    const [form_data, set_form_data] = useState<Record<string, string>>(initialFormData)

    const HandleChange = (id: string, value: string) =>
    {
        const updated_form_data = { ...form_data, [id]: value }
        set_form_data(updated_form_data)
        on_form_data_change?.(updated_form_data)
    }

    const HandleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        on_submit(form_data);
    }

    return(
        <div>
        <form className={"my_form"} onSubmit={HandleSubmit}>
            {Object.entries(fields).map(([key, value]) => (
                <div className={"my_form_row"}>
                    <text style={{fontWeight:'bold'}}>{key}:</text>
                    <MyInput
                        id={key}
                        type={value}
                        placeholder={key}
                        value={form_data[key] || ''}
                        on_change={(e) => HandleChange(key, e.target.value) }
                    />
                </div>
                ))}
            <button className='my_button' type="submit">{button_label}</button>
        </form><br/>
        </div>
    )
}


export {MyForm}
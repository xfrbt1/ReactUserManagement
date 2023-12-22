import React, {useState} from 'react';
import {MyInput} from "./input";


interface FormProps
{
    fields: Record<string, {id: string, type: string}>
    onsubmit: (data: Record<string, string>) => void
    button_label: string

}

const MyForm: React.FC<FormProps> = ({fields, onsubmit, button_label, }) =>
{
    const initialFormData: Record<string, string> = {};
    Object.keys(fields).forEach((key) => {
        initialFormData[key] = '';
    });

    const [form_data, set_form_data] = useState<Record<string, string>>(initialFormData)

    const HandleChange = (id: string, value: string) =>
    {
        set_form_data((prevData) => ({ ...prevData, [id]: value }));
    }

    const HandleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        onsubmit(form_data);
    }

    return(
        <div>
        <form onSubmit={HandleSubmit}>
            {Object.entries(fields).map(([id, field]) => (
                <div>
                <MyInput
                    id={id}
                    type={field.type}
                    placeholder={field.id}
                    value={form_data[id] || ''}
                    onchange={(e) => HandleChange(id, e.target.value) }
                /><br/><br/>
                </div>
                ))}
            <button className='my_button' type="submit">{button_label}</button>
        </form><br/>
        </div>
    )
}


export {MyForm}
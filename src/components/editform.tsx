import React, {useState} from 'react';
import {MyInput} from "./input";
import {MyFileInput} from "./fileinput";

interface FormProps
{
    fields: Record<string, string>
    on_submit: (data: Record<string, string>, file: File | null) => void
    button_label: string
    initial_values: Record<string, any> | null
    on_form_data_change?: (data: Record<string, string>) => void
}


const MyEditForm: React.FC<FormProps> = ({fields,
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
    const [file_data, set_file_data] = useState<File| null>(null)


    const HandleDataChange = (id: string, value: string) =>
    {
        const updated_form_data = { ...form_data, [id]: value }
        set_form_data(updated_form_data)
        on_form_data_change?.(updated_form_data)
    }
    const HandleFileChange = (file: File | null) =>
    {
        set_file_data(file)
    }
    const HandleFormSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        on_submit(form_data, file_data);
    }

    return (
        <div>
            <form className={"my_form"} onSubmit={HandleFormSubmit}>
                {Object.entries(fields).map(([key, value]) =>
                    (
                        <div className={"my_form_row"}>

                            <div><label style={{fontWeight:'bold', display: "block", position:"relative"}}>{key.replace('_', " ")}:</label></div>

                            <MyInput
                                key={key}
                                id={key}
                                type={value}
                                placeholder={key}
                                value={form_data[key] || ''}
                                on_change={(e) => HandleDataChange(key, e.target.value) }
                            />
                        </div>
                    ))}

                <MyFileInput onFileChange={HandleFileChange}/>
                {
                    file_data?
                        (
                            <div>
                                <span style={{fontWeight:'bold'}}>{file_data.name}</span>
                            </div>
                        )
                        :
                        (
                            <div>
                                <span style={{fontWeight:'bold'}}>No image update</span>
                            </div>
                        )
                }
                <button className='my_button' type="submit">{button_label}</button>
            </form>
            <br/>
        </div>
    )
}


export {MyEditForm}
import React from 'react';

interface MyInputProps
{
    id: string
    type: string
    placeholder: string
    value:string
    on_change: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

const MyInput: React.FC<MyInputProps> = ({id, type, value, placeholder, on_change}) =>
{
    return (
        <input
            className="my_input"

            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={on_change}
        />
    )
}

export {MyInput}
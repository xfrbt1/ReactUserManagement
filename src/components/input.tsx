import React from 'react';

interface MyInputProps
{
    id: string
    type: string
    placeholder: string
    value:string
    onchange: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

const MyInput: React.FC<MyInputProps> = ({id, type, value, placeholder, onchange}) =>
{
    return (
        <input
            className="my_input"

            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onchange}
        />
    )
}

export {MyInput}
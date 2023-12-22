import React from 'react';

interface MyButtonProps
{
    label: string
    onclick: ()=> void
}

const MyButton: React.FC<MyButtonProps> = ({ label, onclick }) =>
{
    return (
        <button onClick={onclick} className="my_button">
            {label}
        </button>
    )
}

export {MyButton}


export {}
import React from 'react';

interface MyButtonProps
{
    label: string
    class_name: string
    onclick: ()=> void

}

const MyButton: React.FC<MyButtonProps> = ({ label, onclick, class_name}) =>
{
    return (
        <button onClick={onclick} className={class_name}>
            {label}
        </button>
    )
}

export {MyButton}

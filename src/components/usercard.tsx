import React from "react";

interface CardProps
{
    data: Record<string, string> | null
}

const MyUserCard: React.FC<CardProps> = ({data}) =>
{
    if (!data)
    {
        return null
    }

    return (
        <div>
            <div className={'my_user_card'}>
                <br/>
                {
                    Object.entries(data).map(([key, value]) =>
                        (
                            <div>
                            <text style={{fontWeight:"bold", padding:10}}>
                                {key}:
                            </text>
                            <text>
                                {value}
                            </text>
                            </div>
                        )
                    )}
                <br/>
            </div>
            <br/>
        </div>
    )
}

export {MyUserCard}
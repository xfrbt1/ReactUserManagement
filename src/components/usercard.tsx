import React from "react";


const time_options: Intl.DateTimeFormatOptions =
    {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    }



interface CardProps {
    data: Record<string, string> | null;
}

const MyUserCard: React.FC<CardProps> = ({ data }) => {
    if (!data) {
        return null;
    }

    function create_read_time(datetime: string | null)
    {
        if (datetime)
        {
            const new_datetime = new Date(datetime)
            return new_datetime.toLocaleString("europe", time_options)
        }

    }

    return (
        <div className={"my-user-card-container"}>

            <div className={"user-data-container"}>

                <span style={{fontWeight:"bold", padding:10}}>id: </span>
                <span>{data.id}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>username: </span>
                <span>{data.username}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>email: </span>
                <span>{data.email}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>full name: </span>
                <span>{data.name + " " + data.surname}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>phone number: </span>
                <span>{data.phone_number}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>group: </span>
                <span>{data.group_id}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>role: </span>
                <span>{data.role}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>created: </span>
                <span>{create_read_time(data.created_at)}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>modified: </span>
                <span>{create_read_time(data.modified_at)}</span><br/>

            </div>

            <div className={"image-container"}>
                <img
                    src={data.image_path}
                    alt="user-img"
                    className="user-image"
                />
            </div>
        </div>
    );
};

export { MyUserCard };

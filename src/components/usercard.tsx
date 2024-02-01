import React from "react";

interface CardProps {
    data: Record<string, string> | null;
}

const MyUserCard: React.FC<CardProps> = ({ data }) => {
    if (!data) {
        return null;
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
                <span>{data.created_at}</span><br/>
                <span style={{fontWeight:"bold", padding:10}}>modified: </span>
                <span>{data.modified_at}</span><br/>

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

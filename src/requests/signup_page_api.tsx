import axios from "axios";

const send_signup_request = async (json_form_data: Record<string, string>) =>
{
    try
    {
        return await axios.post('http://localhost:8000/auth/signup', json_form_data)
    }
    catch (error)
    {
        throw error
    }
}

export {send_signup_request}


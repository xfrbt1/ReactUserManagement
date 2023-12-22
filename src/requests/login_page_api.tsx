import axios from "axios";

const send_login_request = async (form_data: Record<string, string>) =>
{
    try
    {
        return await axios.post('http://localhost:8000/auth/login', form_data);
    }
    catch (error)
    {
        throw error
    }
}

export {send_login_request}
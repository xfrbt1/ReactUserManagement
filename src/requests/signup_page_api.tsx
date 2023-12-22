import axios from "axios";

const send_signup_request = async (json_form_data: Record<string, string>) =>
{
    const formData = new FormData()

    Object.entries(json_form_data).forEach(([key, value]) =>
    {
        formData.append(key, value);
    })

    formData.append('file', '')
    formData.append('group_id', '')

    try
    {
        return await axios.post('http://localhost:8000/auth/signup', formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
    }
    catch (error)
    {
        throw error
    }
}

export {send_signup_request}


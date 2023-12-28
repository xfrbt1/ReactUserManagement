import axios from "axios";

const send_get_users_request = async (query_params: Record<string, any>) =>
{
    const access_token = localStorage.getItem('access')
    const headers = {"access-token": access_token}

    if (access_token === null)
    {
        window.location.href = '/login'
    }
    try
    {
        Object.keys(query_params).forEach(
            (key) =>
        {
            if (query_params[key] === '')
            {
                query_params[key] = null
            }
        })

        return await axios.get('http://localhost:8000/users/', {headers: headers, params: query_params});
    }
    catch (error)
    {
        throw error
    }
}

export {send_get_users_request}
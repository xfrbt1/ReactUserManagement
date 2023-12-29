import axios from "axios"

const send_get_user_data = async (set_data: Function, set_loading: Function) =>
{
    const headers = {"access-token": localStorage.getItem('access')}

    try
    {
        const response = await axios.get('http://localhost:8000/user/me', {headers: headers});
        set_data(response.data)
    }
    catch (error)
    {
        window.location.href = '/login'
    }
    finally
    {
        set_loading(false);
    }
}


const send_edit_request = async (form_data: Record<string, string | null>) =>
{
    const headers = {"access-token": localStorage.getItem('access')}

    try
    {
        Object.keys(form_data).forEach((key) =>
        {
            if (form_data[key] === '')
            {
                form_data[key] = null
            }
        })

        return await axios.patch('http://localhost:8000/user/me', form_data, {headers: headers})
    }
    catch (error)
    {
        throw error
    }
}


const send_delete_request = async () =>
{
    const headers = {"access-token": localStorage.getItem('access')}

    try
    {
        return await axios.delete('http://localhost:8000/user/me', {headers: headers})
    }
    catch (error)
    {
        throw error
    }
}

export {send_delete_request, send_edit_request, send_get_user_data}
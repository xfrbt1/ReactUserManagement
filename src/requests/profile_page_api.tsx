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


const send_edit_request = async (form_data: Record<string, string>, file_data: File | null) => {
    const headers =
        {
        "access-token": localStorage.getItem('access'),
        'Content-Type': 'multipart/form-data'
        }

    const formData = new FormData();

    Object.keys(form_data).forEach((key) =>
    {
        if (form_data[key] !== '' && form_data[key] !== null)
        {
            formData.append(key, form_data[key])
        }
    })

    if (file_data)
    {
        formData.append('file', file_data)
    }

    try
    {
        console.log({new_user_data: form_data, file: file_data})
        return await axios.patch(
            'http://localhost:8000/user/me',
            formData,
            { headers })
    }
    catch (error)
    {
        console.error('Error sending PATCH request:', error)
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
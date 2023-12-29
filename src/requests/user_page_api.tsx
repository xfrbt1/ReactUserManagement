import axios from "axios"

const get_user_by_id = async (id: string) =>
{
    const headers = {"access-token": localStorage.getItem('access')}

    try
    {
        return await axios.get('http://localhost:8000/user/'+id, {headers: headers})
    }
    catch (error)
    {
        throw error
    }
}

const patch_user_by_id = async (id: string, form_data: Record<string, string | null>) =>
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

        return await axios.patch('http://localhost:8000/user/'+id, form_data, {headers: headers})
    }
    catch (error)
    {
        throw error
    }
}


export {get_user_by_id, patch_user_by_id}

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

const patch_user_by_id = async (form_data_json: Record<string, string>, file_data: File| null, user_id: string) =>
{
    const headers =
        {
            "access-token": localStorage.getItem('access'),
            "Content-Type": 'multipart/form-data'
        }

    const formData = new FormData()

    for (const key in form_data_json)
    {
        if (form_data_json[key] !== '' && form_data_json[key] !== null)
        {
            formData.append(key, form_data_json[key])
            console.log(key, " -> ", form_data_json[key])
        }
    }

    if (file_data)
    {
        formData.append('file', file_data)
        console.log("new file")
    }

    try
    {
        return await axios.patch(
            'http://localhost:8000/user/'+user_id,
            formData,
            {headers: headers})
    }
    catch (error)
    {
        console.error('Error sending PATCH request:', error)
        throw error
    }

}


export {get_user_by_id, patch_user_by_id}

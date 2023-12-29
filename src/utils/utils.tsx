
const check_access = () =>
{
    const access_token = localStorage.getItem('access')
    if (access_token !== null)
    {
        return {"access-token": access_token}
    }

}

export {check_access}
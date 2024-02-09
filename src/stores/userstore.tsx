import {action, makeObservable, observable} from "mobx";

class UserStore
{
    user_data_json: Record<string, any> = {}

    constructor ()
    {
        makeObservable
        (
            this,
            {
                user_data_json: observable,
                set_new_data: action,
                delete_data: action
            }
        )
    }
    set_new_data = (data: Record<string, any>) =>
    {
        console.log('USER STORE - SET INVOKED');
        this.user_data_json = data
    }

    delete_data =  () =>
    {
        this.user_data_json = {}
    }
}

const some = new UserStore()
export default some
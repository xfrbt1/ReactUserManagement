import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import {Login} from "@mui/icons-material";

import {useNavigate} from "react-router-dom";

import user_store from "../stores/userstore"
import {observer} from "mobx-react-lite";

const AccountMenu = observer(() =>
{
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const {user_data_json, delete_data} = user_store
    const navigate = useNavigate()

    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () =>
    {
        setAnchorEl(null);
    }

    const handleLogout = () =>
    {
        setAnchorEl(null);
        localStorage.clear();
        delete_data()
        navigate('/login')
    }



    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar></Avatar>
                    </IconButton>

            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate('/profile')}>
                    <Avatar/>Profile
                </MenuItem>

                {user_data_json.role === 'admin' || user_data_json.role === 'moderator' ? (
                    <div>
                        <Divider />

                        <MenuItem onClick={() => navigate('/users')}>
                            <Avatar/> Users
                        </MenuItem>

                        <MenuItem onClick={() => navigate('/user')}>
                            <Avatar/> User
                        </MenuItem>
                    </div>
                ) :
                    (
                     <div></div>
                )}


                <Divider />


                <MenuItem onClick={() => navigate('/login')}>
                    <ListItemIcon>
                        <Login fontSize="small" />
                    </ListItemIcon>
                    Login
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
})

export {AccountMenu}
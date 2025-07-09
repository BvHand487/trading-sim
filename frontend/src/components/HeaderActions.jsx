import React, { useEffect } from 'react'
import { Button, useTheme } from '@mui/material';
import { useAuth } from './AuthProvider'
import { Link } from 'react-router-dom';

function HeaderActions() {

    const auth = useAuth();
    const theme = useTheme();

    useEffect(() => {

    }, [auth.isAuthed]);

    if (auth.isAuthed) {
        return (
            <Link to="/">
                <Button
                    color="white"
                    sx={{ fontSize: 16 }}
                    onClick={auth.logout}
                >
                    Log out
                </Button>
            </Link>

        );
    }
    else {
        return (
            <>
                <Link to="/login">
                    <Button color="white" sx={{ fontSize: 16 }}>Log in</Button>
                </Link>
                <Link to="/signup">
                    <Button color="white" sx={{ fontSize: 16 }}>Sign up</Button>
                </Link>
            </>
        );
    }
}

export default HeaderActions
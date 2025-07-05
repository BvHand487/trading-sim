import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HeaderActions from './HeaderActions';

function Header() {

    return (
        <AppBar position="static" sx={{ height: 64 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <Menu />
                </IconButton>
                <Link to="/" className='no-underline'>
                    <Typography variant="h6" component="div" sx={{ color: "white", textDecoration: "none" }}>
                        Cryptocurrency Trading Simulator
                    </Typography>
                </Link>
                <span className='flex-1'></span>
                <HeaderActions />
            </Toolbar>
        </AppBar>
    )
}

//theme.palette.primary

export default Header;
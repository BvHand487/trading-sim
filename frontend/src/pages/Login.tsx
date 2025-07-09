import { useState } from 'react'
import { TextField, IconButton, InputAdornment, Button, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { AuthContextData, UserCredentials } from '../utils/types';
import { useAuth } from '../components/AuthProvider';


function Login() {

    const auth: AuthContextData = useAuth();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const showPasswordToggle = (event: React.SyntheticEvent) => { event.preventDefault(); setShowPassword(!showPassword); }

    const formSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        auth.login(credentials);
    }

    return (
        <div className="mx-auto w-fit mt-24 p-6 bg-white shadow rounded">
            <Typography variant="h4" className='w-full text-center'>Log in</Typography>

            <form onSubmit={formSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={credentials.username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let newCreds: UserCredentials = {
                            username: e.target.value,
                            password: credentials.password
                        }

                        setCredentials(newCreds);
                    }}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={credentials.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let newCreds: UserCredentials = {
                            username: credentials.username,
                            password: e.target.value
                        }

                        setCredentials(newCreds);
                    }}
                    required
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={showPasswordToggle}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button type="submit" className='w-full' >Log in</Button>
            </form>

            <div className="w-full flex flex-row items-center justify-center">
                <Typography>Don't have an account?</Typography>
                <Link to="/signup">
                    <Button>
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Login
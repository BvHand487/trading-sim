import { useState } from 'react'
import { FormControl, TextField, IconButton, InputAdornment, Button, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const showPasswordToggle = (event) => { event.preventDefault(); setShowPassword(!showPassword); }

    const formSubmit = (event) => {
        event.preventDefault();
        console.log(`username: ${username}`)
        console.log(`password: ${password}`)
    }

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow rounded">
            <Typography variant="h6"> Log in </Typography>

            <form onSubmit={formSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex flex-row items-center justify-end gap-1">
                <p className='text-center'> Don't have an account? </p>
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
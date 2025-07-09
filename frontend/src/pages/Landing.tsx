import React from 'react'
import { TrendingUp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="flex flex-col h-full justify-start mt-24">
            <div className='mx-auto flex flex-col gap-4 h-48 w-1/2'>
                <Typography variant='h2' color='primary'>
                    Cryptocurrency Trading Simulator
                </Typography>
                <Typography variant='h6' color='black' className='w-full text-justify mt-8'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nesciunt accusamus consectetur inventore rerum quia vitae deserunt placeat illum repellendus quas, quisquam vero veritatis provident facere officia quidem voluptatum fuga.
                </Typography>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row justify-start gap-1'>
                        <Typography variant='body1'>Not logged in? - </Typography>
                        <Link to="/login" className='flex text-center items-center'>
                            <Typography color='primary' sx={{ textDecoration: "underline" }}>
                                Go to the log in page.
                            </Typography>
                        </Link>
                    </div>
                    <div className='flex flex-row justify-start gap-2'>
                        <Typography variant='body1'>Logged in? - </Typography>
                        <Link to="/home" className='flex text-center items-center'>
                            <Typography color='primary' sx={{ textDecoration: "underline" }}>
                                Go to the home page.
                            </Typography>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;

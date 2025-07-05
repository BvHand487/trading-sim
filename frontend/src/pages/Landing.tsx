import React from 'react'
import { TrendingUp } from '@mui/icons-material';
import { Typography } from '@mui/material';

function Landing() {
    return (
        <div className="flex flex-col h-full justify-start mt-24">
            <div className='mx-auto flex flex-col gap-4 h-24 w-1/2'>
                <Typography variant='h2' color='primary'>
                    Cryptocurrency Trading Simulator
                </Typography>
                <Typography variant='h6' color='black' className='w-full text-justify mt-8'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nesciunt accusamus consectetur inventore rerum quia vitae deserunt placeat illum repellendus quas, quisquam vero veritatis provident facere officia quidem voluptatum fuga.
                </Typography>
            </div>
        </div>
    )
}

export default Landing;

{/* <div className="flex items-center mb-4">
                    <TrendingUp className="mr-2" />
                    <h2 className="text-3xl font-bold">Cryptocurrency trading simulator</h2>
                </div>
               <div>
                 <p className="text-lg text-gray-700">
                    Description Description Description Description Description Description
                </p> */}
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

function WalletAdd({ addAction }: any) {


    return (
        <div className="p-6 bg-white shadow rounded-md border-4 border-dotted w-full max-w-96 mx-auto h-[188.5px] min-h-[188.5px]">
            <button
            className='flex justify-center w-full h-full items-center'
                onClick={addAction}>
                <AddIcon fontSize='large' sx={{ color: 'gray' }} />
            </button>

        </div>
    )
}

export default WalletAdd
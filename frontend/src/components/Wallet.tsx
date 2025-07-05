import React from 'react'
import { WalletData } from '../types/types';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, useTheme } from '@mui/material';

function Wallet({ id, name, balance, createdAt, resetAction, removeAction }: any) {
    const theme = useTheme();

    return (
        <div className="p-6 bg-white shadow rounded-lg w-full max-w-96 mx-auto space-y-3">

            <div className="flex items-center gap-4">
                <AccountBalanceWalletIcon fontSize="large" className='text-blue-500' />
                <Typography variant="h6" className="font-semibold flex-1">
                    {name}
                </Typography>
                <Button
                    onClick={() => removeAction(id)}
                >
                    <DeleteIcon
                        fontSize="medium"
                        className='text-blue-500'
                    />
                </Button>
            </div>

            <div className="space-y-1 text-sm text-gray-700">
                <div className="flex justify-between">
                    <span className="font-medium">Balance:</span>
                    <span>${balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Created:</span>
                    <span>{createdAt}</span>
                </div>
            </div>

            <div>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => resetAction(id)}
                    fullWidth
                >
                    Reset Balance
                </Button>
            </div>
        </div>
    )
}

export default Wallet
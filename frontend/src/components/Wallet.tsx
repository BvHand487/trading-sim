import React from 'react'
import { Wallet as WalletType } from '../types/types';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography, useTheme } from '@mui/material';

function Wallet({ wallet, resetAction, removeAction }: any) {
    
    return (
        <div className="p-6 bg-white shadow rounded-lg w-full max-w-96 mx-auto space-y-3">

            <div className="flex items-center gap-4">
                <AccountBalanceWalletIcon fontSize="large" className='text-blue-500' />
                <Typography variant="h6" className="font-semibold flex-1">
                    {wallet.name}
                </Typography>
                <Button
                    onClick={() => removeAction(wallet.id)}
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
                    <span>${wallet.balance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Created:</span>
                    <span>{new Date(wallet.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => resetAction(wallet.id)}
                    fullWidth
                >
                    Reset Balance
                </Button>
            </div>
        </div>
    )
}

export default Wallet
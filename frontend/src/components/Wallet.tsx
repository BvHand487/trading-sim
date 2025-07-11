import React, { useEffect, useState } from 'react'
import { Currency, Holding, Wallet as WalletType } from '../utils/types';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField, Typography, useTheme } from '@mui/material';
import { useWallets } from './WalletProvider';
import { useAuth } from './AuthProvider';
import { HttpStatusCode } from 'axios';
import { useCurrencies } from './CurrencyProvider';
import { formatNumber } from '../utils/functions';
import { NumericFormat } from 'react-number-format';

function Wallet({ wallet, resetAction, removeAction }: any) {

    const { token } = useAuth();
    const { wallets, renameWallet } = useWallets();
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(wallet.name);
    const [holdings, setHoldings] = useState<any>([]);
    const { currencies } = useCurrencies();


    useEffect(() => {
        const fetchHoldings = async () => {
            const response = await fetch(`http://localhost:8080/api/wallets/${wallet.id}/holdings`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status == HttpStatusCode.Ok) {
                const data = await response.json();
                setHoldings(data);
            }
        };

        fetchHoldings();
    }, []);


    const submitName = async () => {

        await renameWallet(wallet.id, tempName);
        setIsEditingName(false);
    }

    return (
        <div className="p-6 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.15)] rounded-lg w-full mx-auto space-y-3">
            <div className="flex items-center justify-start w-72 gap-2">
                <AccountBalanceWalletIcon fontSize="large" className='text-blue-500' />

                {isEditingName ? (
                    <TextField
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={submitName}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter')
                                submitName();
                            else if (e.key == 'Escape') {
                                setTempName(wallet.name);
                                setIsEditingName(false);
                            }
                        }}
                        autoFocus
                        size="small"
                        variant="standard"
                        sx={{ flex: 1 }}
                    />
                ) : (
                    <Typography
                        variant="h6"
                        className="font-semibold flex-1 cursor-pointer"
                        onDoubleClick={() => setIsEditingName(true)}
                    >
                        {wallet.name}
                    </Typography>
                )}

                {wallets.length > 1 && (
                    <Button onClick={() => removeAction(wallet.id)}
                        sx={{
                            padding: 0,
                            margin: 0,
                            height: '100%',
                            minWidth: 0,
                        }}>
                        <DeleteIcon
                            fontSize="medium"
                            className='text-blue-500 w-4'
                        />
                    </Button>)}
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
                <div className="flex justify-between">
                    <span className="font-medium">Holdings:</span>
                    {holdings.length == 0 && <span>---</span>}
                </div>
            </div>

            {holdings.length > 0 && (
                <div className="text-sm space-y-2 max-h-40 overflow-y-auto ml-4">
                    {holdings.map((h: Holding) => {
                        const currency: Currency = currencies.find(c => c.id === h.currencyId)!;

                        return (
                            <div key={h.id} className="flex justify-between w-full">
                                <span>-&nbsp;&nbsp;</span>
                                <div className='flex flex-row gap-1'>
                                    <div className='size-6'>
                                        <img src={currency.logoUrl}></img>
                                    </div>
                                    <span className='text-left font-semibold text-gray-900'>{currency.symbol}</span>
                                    <span className='text-right flex-1 font-light text-gray-500'>{currency.name}</span>
                                </div>
                                <NumericFormat className='text-right text-sm text-gray-700 flex-1'
                                    value={formatNumber(h.amount)}
                                    displayType={'text'}
                                    thousandSeparator={true} />
                            </div>
                        );
                    })}
                </div>
            )}

            <div>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => resetAction(wallet.id)}
                    fullWidth
                >
                    Reset Wallet
                </Button>
            </div>
        </div>
    )
}

export default Wallet
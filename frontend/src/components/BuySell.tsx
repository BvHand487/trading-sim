import React, { useEffect, useMemo, useState } from 'react';
import { useWallets } from './WalletProvider';
import {
    Paper,
    Stack,
    Typography,
    Select,
    MenuItem,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    InputLabel,
    FormControl,
    Box
} from '@mui/material';
import { useCurrencies } from './CurrencyProvider';
import { useAuth } from './AuthProvider';
import { Transaction } from '../utils/types';
import { HttpStatusCode } from 'axios';
import { usePriceUpdates } from './PriceProvider';
import { formatNumber } from '../utils/functions';
import { NumericFormat } from 'react-number-format';

function BuySell() {
    const { token } = useAuth();
    const { wallets, selectedWallet, selectWallet, updateFromTransaction } = useWallets();
    const { selectedCurrency } = useCurrencies();
    const { priceUpdate } = usePriceUpdates();

    const [quantity, setQuantity] = useState<number>(0);
    const [action, setAction] = useState<'BUY' | 'SELL'>('BUY');
    const [walletError, setWalletError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);

    const totalValue = useMemo(() => {
        if (!quantity || !priceUpdate?.last)
            return 0;

        return quantity * priceUpdate.last;
    }, [quantity, priceUpdate]);

    const handleConfirm = async () => {
        const isWalletInvalid = !selectedWallet;
        const isQuantityInvalid = quantity <= 0;

        setWalletError(isWalletInvalid);
        setQuantityError(isQuantityInvalid);

        if (isWalletInvalid || isQuantityInvalid)
            return;

        alert(`You want to ${action.toLowerCase()} ${quantity} ${selectedCurrency?.symbol} with wallet \'${selectedWallet!.name}\' for a total of $${totalValue}?`);

        let transaction: Transaction = {} as Transaction;
        transaction.id = -1;
        transaction.walletId = selectedWallet!.id;
        transaction.currencyId = selectedCurrency!.id;
        transaction.type = action;
        transaction.quantity = quantity;
        transaction.price = priceUpdate!.last;
        transaction.createdAt = new Date();

        const response = await fetch("http://localhost:8080/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(transaction),
        });

        if (response.status == HttpStatusCode.Created) {
            const data = await response.json() as Transaction;
            updateFromTransaction(data);
        }
    };

    return (
        <div className='w-1/3 p-4 h-full'>
            <Paper sx={{ width: '100%', overflow: 'hidden', padding: 4 }}>
                <Stack spacing={3}>
                    <Typography variant="h6" fontWeight="bold">
                        Buy / Sell
                    </Typography>

                    <FormControl fullWidth required error={walletError}>
                        <InputLabel id="wallet-select-label">Wallet</InputLabel>
                        <Select
                            labelId="wallet-select-label"
                            value={selectedWallet ? selectedWallet.id : -1}
                            label="Wallet"
                            onChange={(e) => {
                                if (walletError)
                                    setWalletError(false);

                                selectWallet(e.target.value);
                            }}>
                            {wallets?.map((wallet) => (
                                <MenuItem key={wallet.id} value={wallet.id}>
                                    {wallet.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            
                            if (quantityError)
                                setQuantityError(value <= 0);
                            
                            if (value >= 0 || isNaN(value)) {
                                setQuantity(value);
                            }
                        }}
                        fullWidth
                        required
                        error={quantityError}
                    />

                    <div>
                        <Typography variant="body2" color="textSecondary">
                            Total:&nbsp;
                            <NumericFormat
                                className='font-semibold'
                                value={formatNumber(totalValue)}
                                displayType={'text'}
                                prefix='$'
                                thousandSeparator={true}
                            />
                            &nbsp;at&nbsp;
                            {priceUpdate ? (
                                <NumericFormat
                                    className='font-medium'
                                    value={formatNumber(priceUpdate.last)}
                                    displayType={'text'}
                                    prefix='$'
                                    thousandSeparator={true}
                                />
                            ) :
                                (
                                    <span>---</span>
                                )}

                            &nbsp;per {selectedCurrency?.symbol}
                        </Typography>
                    </div>

                    <RadioGroup
                        row
                        value={action}
                        onChange={(e) => setAction(e.target.value as 'BUY' | 'SELL')}
                    >
                        <FormControlLabel value="BUY" control={<Radio />} label="Buy" />
                        <FormControlLabel value="SELL" control={<Radio />} label="Sell" />
                    </RadioGroup>

                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
}

export default BuySell;

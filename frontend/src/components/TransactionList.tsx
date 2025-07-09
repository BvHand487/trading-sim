import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper
} from '@mui/material';
import { useAuth } from './AuthProvider';
import { Transaction } from '../utils/types';
import { useCurrencies } from './CurrencyProvider';
import { HttpStatusCode } from 'axios';
import { NumericFormat } from 'react-number-format';
import { formatNumber } from '../utils/functions';
import { useWallets } from './WalletProvider';

function TransactionList() {
    const { token } = useAuth();
    const { currencies, selectedCurrency } = useCurrencies();
    const { wallets } = useWallets();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8080/api/transactions", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (res.status === HttpStatusCode.Ok) {
                const data = await res.json();
                setTransactions(data);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-[68%] p-4">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 460 }} className="overflow-y-auto">
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Wallet</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Symbol</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Price/Unit</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions
                                .filter((tx: Transaction) => tx.currencyId == selectedCurrency!.id)
                                .sort((tx1: Transaction, tx2: Transaction) => new Date(tx1.createdAt).getTime() - new Date(tx2.createdAt).getTime())
                                .map((tx: Transaction) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>
                                            <span className="text-sm font-light text-gray-700">
                                                {wallets.find(w => w.id === tx.walletId)!.name}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-light text-gray-700">{tx.type}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-light text-gray-700">
                                                {currencies.find(c => c.id === tx.currencyId)?.symbol || '—'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <NumericFormat
                                                className="text-sm text-right font-light text-gray-700"
                                                value={formatNumber(tx.quantity)}
                                                displayType={'text'}
                                                thousandSeparator
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <NumericFormat
                                                className="text-sm text-right font-light text-gray-700"
                                                value={formatNumber(tx.price)}
                                                prefix="$"
                                                displayType={'text'}
                                                thousandSeparator
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <NumericFormat
                                                className={`text-sm text-right font-light ${tx.type === 'BUY' ? 'text-red-500' : 'text-green-600'}`}
                                                value={formatNumber(tx.quantity * tx.price)}
                                                prefix={tx.type === 'BUY' ? '-$' : '+$'}
                                                displayType={'text'}
                                                thousandSeparator
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-light text-gray-700">
                                                {new Date(tx.createdAt).toLocaleString()}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default TransactionList;
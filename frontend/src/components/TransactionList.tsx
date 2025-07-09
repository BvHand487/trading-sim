import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination
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
    const { currencies } = useCurrencies();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8080/api/transactions", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (res.status == HttpStatusCode.Ok) {
                const data = await res.json();
                setTransactions(data);
            }
        };

    }, []);

    const changePage = (e: any, newPage: number) => {
        setPage(newPage);
    };

    const changeRowsPerPage = (e: any) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <div className='w-2/3 p-4'>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Symbol</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Price per unit</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((tx: Transaction) => (
                                <TableRow key={tx.id}>
                                    <TableCell>
                                        <span className='text-sm text-right font-light text-gray-700'>
                                            {tx.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className='text-sm text-right font-light text-gray-700'>
                                            {currencies.find(c => c.id == tx.currencyId)?.symbol}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <NumericFormat className='text-sm text-right font-light text-gray-700'
                                            value={formatNumber(tx.quantity)}
                                            displayType={'text'}
                                            thousandSeparator={true} />
                                    </TableCell>
                                    <TableCell>
                                        <NumericFormat className='text-sm text-right font-light text-gray-700'
                                            value={formatNumber(tx.price)}
                                            displayType={'text'}
                                            prefix='$'
                                            thousandSeparator={true} />
                                    </TableCell>
                                    <TableCell>
                                        <NumericFormat className='text-sm text-right font-light text-gray-700'
                                            value={formatNumber(tx.quantity * tx.price)}
                                            displayType={'text'}
                                            prefix='$'
                                            thousandSeparator={true} />
                                    </TableCell>
                                    <TableCell>
                                        <span className='text-sm text-right font-light text-gray-700'>
                                            {new Date(tx.createdAt).toLocaleString()}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={transactions.length}
                    page={page}
                    onPageChange={changePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={changeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Paper>
        </div>
    )
}

export default TransactionList
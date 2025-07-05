import React, { useEffect, useState } from 'react'
import Wallet from './Wallet';
import WalletAdd from './WalletAdd';

const data: Array<any> = [
    {
        id: '1',
        name: 'Main Wallet',
        balance: 1234.56,
        createdAt: '2024-11-10T14:23:00Z',
    },
    {
        id: '2',
        name: 'Savings Wallet',
        balance: 98765.43,
        createdAt: '2023-05-12T09:12:00Z',
    },
    {
        id: '3',
        name: 'Trading Wallet',
        balance: 412.88,
        createdAt: '2025-02-01T11:00:00Z',
    }
];

function WalletList() {

    const [wallets, setWallets] = useState(data);

    useEffect(() => {

    }, [wallets]);

    const resetAction = (id: number) => {
        setWallets(wallets.map(w =>
            w.id === id ? { ...w, balance: 1000 } : w
        ));
    }

    const addAction = () => {
        let newWallet = {
            id: wallets.length + 1,
            name: 'Default',
            balance: 1000,
            createdAt: Date.now(),
        }

        setWallets([...wallets, newWallet]);
    }

    const removeAction = (id: number) => {
        setWallets(wallets.filter(w => w.id !== id));
    }

    return (
        <div className="max-w-md p-4">
            <div className="h-[86vh] flex flex-col justify-start items-start overflow-y-auto gap-4">
                {wallets.map(wallet => (
                    <Wallet
                        key={wallet.id}
                        id={wallet.id}
                        name={wallet.name}
                        balance={wallet.balance}
                        createdAt={wallet.createdAt}
                        removeAction={removeAction}
                        resetAction={resetAction}
                    />
                ))}

                <WalletAdd
                    addAction={addAction}
                />
            </div>
        </div>
    )
}

export default WalletList
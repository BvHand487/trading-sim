import React, { createContext, useContext, useEffect, useState } from 'react'
import { Wallet, WalletContextData } from '../types/types';
import { EmptyObject } from 'chart.js/dist/types/basic';
import { useAuth } from './AuthProvider';


const WalletContext = createContext<WalletContextData>({} as WalletContextData);

function WalletProvider({ children }: any) {
    const { token } = useAuth();
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

    useEffect(() => {
        if (token)
            refreshWallets();
    }, [token]);

    const addWallet = async () => {
        let wallet: Wallet = {} as Wallet;
        wallet.id = -1;
        wallet.name = 'Default Name';
        wallet.balance = 10000;
        wallet.createdAt = new Date();

        const response = await fetch("http://localhost:8080/api/wallets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(wallet),
        });

        const data = await response.json() as Wallet;
        console.log('addWallet: ', data);

        setWallets([...wallets, data]);
    }

    const removeWallet = async (id: number) => {
        let wallet = wallets.find(w => w.id == id);

        const response = await fetch(`http://localhost:8080/api/wallets/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        console.log('removeWallet');

        setWallets(wallets.filter(w => w.id != id));
    }

    const resetWallet = async (id: number) => {
        let wallet = wallets.find(w => w.id == id)!;

        wallet.balance = 10000  // move to backend maybe

        const response = await fetch(`http://localhost:8080/api/wallets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ balance: wallet.balance }),
        });

        console.log('resetWallet');

        setWallets(wallets.map(w => w.id === id ? { ...w, balance: 10000 } : w));
    }

    const selectWallet = async (id: number) => {
        let wallet = wallets.find(w => w.id == id)!;
        setSelectedWallet(wallet);
    }

    const deselectWallet = async () => {
        setSelectedWallet(null);
    }

    const refreshWallets = async () => {
        const response = await fetch("http://localhost:8080/api/wallets", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json() as Wallet[];
        console.log('refreshWallets: ', data);

        setWallets(data);
    }

    const value: WalletContextData = {
        wallets: wallets,
        selectedWallet: selectedWallet,
        selectWallet: selectWallet,
        deselectWallet: deselectWallet,
        addWallet: addWallet,
        removeWallet: removeWallet,
        resetWallet: resetWallet,
        refreshWallets: refreshWallets,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallets = () => {
    return useContext(WalletContext);
};

export default WalletProvider
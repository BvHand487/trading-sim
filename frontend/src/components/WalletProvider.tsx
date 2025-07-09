import { createContext, useContext, useEffect, useState } from 'react'
import { Transaction, Wallet, WalletContextData } from '../utils/types';
import { useAuth } from './AuthProvider';
import { HttpStatusCode } from 'axios';


const WalletContext = createContext<WalletContextData>({} as WalletContextData);

function WalletProvider({ children }: any) {
    const { token } = useAuth();
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

    useEffect(() => {
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

        refreshWallets();

    }, []);

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

        if (response.status == HttpStatusCode.Created) {
            const data = await response.json() as Wallet;
            setWallets([...wallets, data]);
        }
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

        if (response.status == HttpStatusCode.NoContent) {
            setWallets(wallets.filter(w => w.id != id));
        }
    }

    const renameWallet = async (id: number, newName: string) => {
        let wallet = wallets.find(w => w.id == id)!;

        wallet.name = newName;

        const response = await fetch(`http://localhost:8080/api/wallets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name: wallet.name }),
        });

        if (response.status == HttpStatusCode.Ok) {
            setWallets(wallets.map(w => w.id === id ? { ...w, name: newName } : w));
        }
    }

    const resetWallet = async (id: number) => {
        const response = await fetch(`http://localhost:8080/api/wallets/${id}/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.status == HttpStatusCode.Ok) {
            setWallets(wallets.map(w => w.id === id ? { ...w, balance: 10000 } : w));
        }
    }

    const updateFromTransaction = async (transaction: Transaction) => {
        setWallets(
            wallets.map(w => w.id === transaction.walletId ?
                { ...w, balance: w.balance - transaction.quantity * transaction.price }
                : w
            )
        );
    }

    const selectWallet = async (id: number) => {
        let wallet = wallets.find(w => w.id == id)!;
        setSelectedWallet(wallet);
    }

    const deselectWallet = async () => {
        setSelectedWallet(null);
    }

    const value: WalletContextData = {
        wallets: wallets,
        selectedWallet: selectedWallet,
        selectWallet: selectWallet,
        deselectWallet: deselectWallet,
        addWallet: addWallet,
        removeWallet: removeWallet,
        renameWallet: renameWallet,
        resetWallet: resetWallet,
        updateFromTransaction: updateFromTransaction,
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
export interface User {
    id: number,
    username: string,
}

export interface UserCredentials {
    username: string,
    password: string,
}

export type AuthContextData = {
    isAuthed: boolean,
    username: string,
    token: string,
    login: Function,
    signup: Function,
    logout: Function,
}

export interface Wallet {
    id: number,
    name: string,
    balance: number,
    createdAt: Date,
}

export type WalletContextData = {
    wallets: Wallet[],
    selectedWallet: Wallet | null,
    selectWallet: Function,
    deselectWallet: Function,
    addWallet: Function,
    removeWallet: Function,
    resetWallet: Function,
    refreshWallets: Function,
}
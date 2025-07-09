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
    renameWallet: Function,
    resetWallet: Function,
    updateFromTransaction: Function,
}

export interface Currency {
    id: number,
    symbol: string,
    name: string,
    logoUrl: string,
}

export type CurrencyContextData = {
    currencies: Currency[],
    selectedCurrency: Currency | null,
    selectCurrency: Function,
    deselectCurrency: Function,
}

export interface PriceUpdate {
    last: number,
    volume: number,
    change_pct: number,
}

export type PriceUpdateContextData = {
    priceUpdate: PriceUpdate | null,
}

export interface Transaction {
    id: number,
    walletId: number,
    currencyId: number,
    type: 'BUY' | 'SELL',
    quantity: number,
    price: number,
    createdAt: Date,
}
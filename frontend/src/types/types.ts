export interface User {
    id: number,
    username: string,
}

export interface WalletData {
    name: string,
    balance: number,
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


import { createContext, useContext, useEffect, useState } from 'react'
import { Currency, CurrencyContextData } from '../utils/types';
import { useAuth } from './AuthProvider';

const CurrencyContext = createContext<CurrencyContextData>({} as CurrencyContextData);

function CurrencyProvider({ children }: any) {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

    useEffect(() => {
        const refreshCurrencies = async () => {
        const response = await fetch("http://localhost:8080/api/currencies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json() as Currency[];
        console.log('refreshCurrencies: ', data);

        setCurrencies(data);
    }
    
        refreshCurrencies();
    }, []);

    const selectCurrency = async (id: number) => {
        let currency = currencies.find(c => c.id == id)!;
        setSelectedCurrency(currency);
    }

    const deselectCurrency = async () => {
        setSelectedCurrency(null);
    }

    const value: CurrencyContextData = {
        currencies: currencies,
        selectedCurrency: selectedCurrency,
        selectCurrency: selectCurrency,
        deselectCurrency: deselectCurrency,
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    )
}

export const useCurrencies = () => {
    return useContext(CurrencyContext);
};

export default CurrencyProvider
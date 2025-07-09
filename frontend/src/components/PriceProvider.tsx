import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { PriceUpdate, PriceUpdateContextData } from '../utils/types';
import { useCurrencies } from './CurrencyProvider';

const PriceContext = createContext<PriceUpdateContextData>({} as PriceUpdateContextData);

function PriceProvider({ children }: any) {
    const { selectedCurrency } = useCurrencies();
    const [priceUpdate, setPriceUpdate] = useState<PriceUpdate | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!selectedCurrency) return;

        const krakenSymbol = `${selectedCurrency.symbol}/USD`;

        ws.current = new WebSocket('wss://ws.kraken.com/v2');

        ws.current.onopen = () => {
            console.log('WebSocket connected');

            const subscribeMsg = {
                method: 'subscribe',
                params: {
                    channel: "ticker",
                    symbol: [krakenSymbol],
                }
            };

            ws.current?.send(JSON.stringify(subscribeMsg));
        };

        ws.current.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            if (msg.channel != "ticker")
                return;

            console.log(msg);

            let priceUpdate: PriceUpdate = {
                last: msg.data[0].last,
                volume: msg.data[0].volume,
                change_pct: msg.data[0].change_pct,
            };

            console.log("before", priceUpdate);
            setPriceUpdate(priceUpdate);
            console.log("after", priceUpdate);
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');

            const unsubscribeMsg = {
                method: 'unsubscribe',
                params: {
                    channel: "ticker",
                    symbol: [krakenSymbol],
                }
            };

            ws.current?.send(JSON.stringify(unsubscribeMsg));
        };

        return () => ws.current?.close();

    }, [selectedCurrency]);

    const value: PriceUpdateContextData = {
        priceUpdate: priceUpdate,
    };

    return (
        <PriceContext.Provider value={value}>
            {children}
        </PriceContext.Provider>
    )
}

export const usePriceUpdates = () => {
    return useContext(PriceContext);
};

export default PriceProvider;

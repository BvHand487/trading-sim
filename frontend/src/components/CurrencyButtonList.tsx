import React from 'react'
import { Currency as CurrencyType } from '../utils/types';
import { useCurrencies } from './CurrencyProvider';
import CurrencyButton from './CurrencyButton';

function CurrencyButtonList() {

    const { currencies } = useCurrencies();

    return (
        <div className="max-w-md">
            <div className="pl-4 pr-2 pt-2 h-[89vh] flex flex-col justify-start items-center overflow-y-auto gap-2">
                {currencies.map((currency: CurrencyType) =>
                    <CurrencyButton
                        key={currency.id}
                        currency={currency}
                    />
                )}
            </div>
        </div>
    )
}

export default CurrencyButtonList
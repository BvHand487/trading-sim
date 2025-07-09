import { Button } from '@mui/material'
import { useCurrencies } from './CurrencyProvider'
import Currency from './Currency';

function CurrencyButton({ currency }: any) {

    const { selectedCurrency, selectCurrency, deselectCurrency } = useCurrencies();

    const isSelected = (): boolean => {
        return !!selectedCurrency && selectedCurrency.id == currency.id;
    }

    const triggerSelected = (event: any) => {
        event.preventDefault();

        if (isSelected())
            deselectCurrency(currency.id);
        else
            selectCurrency(currency.id);
    }

    return (
        <Button className="p-6 bg-white shadow rounded-lg w-full max-w-80 mx-auto flex flex-row justify-start items-center gap-4"
            onClick={triggerSelected}
            sx={{
                border: isSelected() ? '2px solid #1976D2' : '2px solid transparent',
                cursor: 'pointer',
                color: 'black'
            }}>
                <div className='size-6'>
                    <img src={currency.logoUrl}></img>
                </div>
                <span className='text-left font-semibold text-gray-900'>{currency.symbol}</span>
                <span className='text-right flex-1 font-light text-gray-500'>{currency.name}</span>
        </Button>
    )
}

export default Currency
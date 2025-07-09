import React from 'react'
import { usePriceUpdates } from './PriceProvider'
import { useCurrencies } from './CurrencyProvider';
import { NumericFormat } from 'react-number-format';
import { formatNumber } from '../utils/functions';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

function Prices() {

    const { priceUpdate } = usePriceUpdates();
    const { selectedCurrency } = useCurrencies();

    return (
        <div className='flex flex-row w-full min-h-16 justify-between items-center px-[6.5rem] overflow-clip'>
            <div className='w-[20%] flex flex-row gap-2 justify-start'>
                {selectedCurrency ?
                    (<>
                        <div className='size-8 shrink-0'>
                            <img src={selectedCurrency?.logoUrl}></img>
                        </div>
                        <span className='text-xl text-left font-semibold text-gray-900'>{selectedCurrency?.symbol}</span>
                        <span className='text-xl text-right font-light text-gray-500'>{selectedCurrency?.name}</span>
                    </>) :
                    (<>
                        <div className='size-8 shrink-0'>
                            <img src='https://placehold.co/40x40'></img>
                        </div>
                        <span className='text-xl text-left font-semibold text-gray-900'>---</span>
                        <span className='text-xl text-right font-light text-gray-500'>---</span>
                    </>)}
            </div>
            <div className='w-1/4 flex flex-row gap-2 justify-start'>
                <span className='text-xl text-left font-semibold text-gray-900'>Volume:</span>
                {selectedCurrency && priceUpdate?.volume ? (
                    <NumericFormat className='text-xl text-right font-light text-gray-700'
                        value={formatNumber(priceUpdate?.volume!)}
                        displayType={'text'}
                        thousandSeparator={true} />) :
                    (<span className='text-xl text-right font-light text-gray-700'>---</span>)
                }
                <span className='text-xl text-right font-light text-gray-700'>USD</span>
            </div>
            <div className='text-xl w-1/4 flex flex-row gap-2 justify-start'>
                <span className='text-left font-semibold text-gray-900'>Last Price:</span>
                {selectedCurrency && priceUpdate?.last ? (
                    <NumericFormat className='text-xl text-right font-light text-gray-700'
                        value={formatNumber(priceUpdate?.last!)}
                        displayType={'text'}
                        thousandSeparator={true} />) :
                    (<span className='text-xl text-right font-light text-gray-700'>---</span>)
                }
                <span className='text-xl text-right font-light text-gray-700'>USD</span>
            </div>
            <div className='w-1/6 flex flex-row gap-2 justify-start'>
                <span className='text-xl text-left font-semibold text-gray-900'>Change:</span>
                <div className='text-xl flex flex-row gap-0'>
                    {selectedCurrency && priceUpdate?.change_pct ? (
                        <>
                            <div className='relative bottom-[2.5px]'>
                                {priceUpdate!.change_pct > 0 ? <NorthIcon className='text-green-500'/> : <SouthIcon  className='text-red-500'/>}
                            </div>
                            <NumericFormat
                                className={`text-right font-light ${priceUpdate?.change_pct >= 0 ? 'text-green-500' : 'text-red-500'}`}
                                value={priceUpdate?.change_pct.toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true} />
                        </>
                    ) :
                        (<span className='text-right font-light text-gray-700'>---</span>)
                    }
                    <span
                        className={`text-right font-light
                        ${selectedCurrency && priceUpdate?.change_pct ?
                                (priceUpdate?.change_pct >= 0 ? 'text-green-500' : 'text-red-500') :
                                'text-gray-700'
                            }`}>
                        %
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Prices
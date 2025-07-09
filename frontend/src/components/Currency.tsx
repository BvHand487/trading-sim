import React from 'react'

function Currency({ currency }: any) {
    return (
        <>
            <div className='size-6'>
                <img src={currency.logoUrl}></img>
            </div>
            <span className='text-left font-semibold text-gray-900'>{currency.symbol}</span>
            <span className='text-right flex-1 font-light text-gray-500'>{currency.name}</span>
        </>
    )
}

export default Currency
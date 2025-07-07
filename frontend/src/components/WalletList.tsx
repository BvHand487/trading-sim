import React, { useEffect, useState } from 'react'
import { Wallet as WalletType } from '../types/types';
import Wallet from './Wallet';
import WalletAdd from './WalletAdd';
import { useWallets } from './WalletProvider';


function WalletList() {

    const { wallets, addWallet, removeWallet, resetWallet } = useWallets();

    return (
        <div className="max-w-md p-4">
            <div className="h-[86vh] flex flex-col justify-start items-start overflow-y-auto gap-4">
                {wallets.map((wallet: WalletType) => {

                    console.log(wallet);

                    return (
                        <Wallet
                            key={wallet.id}
                            wallet={wallet}
                            removeAction={removeWallet}
                            resetAction={resetWallet}
                        />
                    )
                })}

                <WalletAdd
                    addAction={addWallet}
                />
            </div>
        </div>
    )
}

export default WalletList
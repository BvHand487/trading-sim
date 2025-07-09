import React, { useEffect, useState } from 'react'
import { Wallet as WalletType } from '../utils/types';
import Wallet from './Wallet';
import WalletAdd from './WalletAdd';
import { useWallets } from './WalletProvider';


function WalletList() {

    const { wallets, addWallet, removeWallet, resetWallet } = useWallets();

    return (
        <div className="max-w-md">
            <div className="pl-4 pr-2 pt-2 h-[89vh] flex flex-col justify-start items-start overflow-y-auto overflow-visible gap-2">
                {wallets && wallets.map((wallet: WalletType) => <Wallet
                    key={wallet.id}
                    wallet={wallet}
                    removeAction={removeWallet}
                    resetAction={resetWallet}
                />
                )}

                <WalletAdd
                    addAction={addWallet}
                />
            </div>
        </div>
    )
}

export default WalletList
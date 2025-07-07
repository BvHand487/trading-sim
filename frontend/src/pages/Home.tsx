import React, { useContext } from 'react'
import { useAuth } from '../components/AuthProvider';
import { AuthContextData } from '../types/types';
import Chart from '../components/Chart';
import Wallet from '../components/Wallet';
import WalletList from '../components/WalletList';
import WalletProvider from '../components/WalletProvider';

function Home() {
  const auth: AuthContextData = useAuth();

  return (
    <>
    <WalletProvider>
      <WalletList />
    </WalletProvider>
    </>
  )
}

export default Home
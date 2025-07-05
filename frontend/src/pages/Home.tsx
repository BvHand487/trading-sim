import React, { useContext } from 'react'
import { useAuth } from '../components/AuthProvider';
import { AuthContextData } from '../types/types';
import Chart from '../components/Chart';
import Wallet from '../components/Wallet';
import WalletList from '../components/WalletList';

function Home() {
  const auth: AuthContextData = useAuth();

  return (
    <>
    <WalletList />
    </>
  )
}

export default Home
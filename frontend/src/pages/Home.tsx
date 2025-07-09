import { useAuth } from '../components/AuthProvider';
import { AuthContextData } from '../utils/types';
import Chart from '../components/Chart';
import WalletList from '../components/WalletList';
import CurrencyButtonList from '../components/CurrencyButtonList';
import Prices from '../components/Prices';
import TransactionList from '../components/TransactionList';
import BuySell from '../components/BuySell';
import { CircularProgress, Typography } from '@mui/material';
import { useCurrencies } from '../components/CurrencyProvider';

function Home() {
  const auth: AuthContextData = useAuth();
  const { selectedCurrency } = useCurrencies();

  return (
    <>
      {auth.isLoading ? (<CircularProgress />) : (
        <div className='flex flex-row'>
          <CurrencyButtonList />
          <WalletList />

          <div className='flex flex-col w-full'>
            <Prices />
            <Chart />
            {selectedCurrency ? (
              <div className='flex flex-row mr-16'>
                <TransactionList />
                <BuySell />
              </div>) : (
              <div className='flex mr-16 content-center h-full w-full'>
                <Typography variant='h2' className='font-light text-gray-900 w-full h-full text-center justify-center content-center'>Please select a currency.</Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home
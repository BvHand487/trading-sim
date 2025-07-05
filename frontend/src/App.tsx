import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthProvider from './components/AuthProvider';
import { CookiesProvider } from 'react-cookie';
import Landing from './pages/Landing';
import { ThemeProvider, useTheme } from '@emotion/react';
import { createTheme } from '@mui/material';

declare module '@mui/material/styles'
{
  interface Palette {
    white: Palette['primary']
  }
  interface PaletteOptions {
    white?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

function App() {

  const theme = createTheme({
    palette: {
      white: {
        main: '#fff',
        contrastText: '#000',
      },
    },
  });

  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Header />
            <div className='flex-1 flex flex-col'>
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/home' element={<Home />} />
              </Routes>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  )
}

export default App

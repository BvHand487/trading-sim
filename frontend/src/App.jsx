import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

import { Route, Routes } from 'react-router-dom';
import './App.css'
import CreateProduct from './pages/CreateProduct/CreateProduct';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Product from './pages/Product';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header'

import { CartProvider } from './contexts/CartContext'

import { awakeAPI } from "./api/helpers";
import Routes from './components/Routes';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }


function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const awake = async () => { return await awakeAPI() }
    awake().then(resp => setLoading(false))
  }, [query])

  return (
    <CartProvider>
      <div className='App'>
        <Header setQuery={setQuery} />
        <Routes query={query} setQuery={setQuery} loading={loading} />
      </div>
    </CartProvider>
  );
}

export default App;

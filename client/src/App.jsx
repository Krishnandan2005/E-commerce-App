import { useState } from 'react'
import DataProvider from './context/DataProvider'

// componrnts 
import Header from './Componenets/Header/Header'
import Home from './Componenets/Home/Home'
import { Box } from '@mui/material'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import DetailedView from './Componenets/details/DetailedView'
import Cart from './Componenets/cart/Cart'


function App() {
  const [count, setCount] = useState(0)

  return (
    <DataProvider>
      <BrowserRouter>
    <Header />
    <Box style={{marginTop:54}}>
      <Routes>
      < Route path='/' element={<Home />}/>
      < Route path='/product/:id' element={<DetailedView />}/>
      < Route path='/cart' element={<Cart />}/>
      </Routes>
      
    </Box>
    </BrowserRouter>
    </DataProvider>
  )
}

export default App

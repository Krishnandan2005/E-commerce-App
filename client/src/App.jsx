import { useState } from "react";
import DataProvider from "./context/DataProvider";

// Components
import Header from "./Componenets/Header/Header";
import Home from "./Componenets/Home/Home";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DetailedView from "./Componenets/details/DetailedView";
import Cart from "./Componenets/cart/Cart";
import Products from "./Componenets/products/Products";

import SellerAuth from "./Componenets/seller/SellerAuth";
import SellerDashboard from "./Componenets/seller/SellerDashboard";
import AddProduct from "./Componenets/seller/AddProduct";
import ManageProducts from "./Componenets/seller/ManageProducts";

import Orders from "./Componenets/orders/Orders";

function App() {
  const [count, setCount] = useState(0);

  return (
    <DataProvider>
      <BrowserRouter>
        <Header />

        <Box style={{ marginTop: 54 }}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Products */}
            <Route path="/products" element={<Products />} />

            {/* Product Details */}
            <Route path="/product/:id" element={<DetailedView />} />

            {/* Cart */}
            <Route path="/cart" element={<Cart />} />

            <Route path="/orders" element={<Orders />} />

            {/* Seller Authentication */}
            <Route path="/seller" element={<SellerAuth />} />

            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/add-product" element={<AddProduct />} />
            <Route path="/seller/products" element={<ManageProducts />} />
            
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;

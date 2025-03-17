import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./componets/Login"
import Home from "./componets/Home";
import { Shop } from "./componets/Shop";

function App(){
    return(
        <>
        <Routes>
        {/* <Route index element={<Login />} /> */}
        <Route index element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/login" element={<Login/>}/>
       
</Routes>
        </>
    )
}
export default App

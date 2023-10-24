import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Analysis, NotFound, ProductList, CreateProduct, CategoryList } from "./";


function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Analysis />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/product/edit/:id" element={<CreateProduct />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Pages;
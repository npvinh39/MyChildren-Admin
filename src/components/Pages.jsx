import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    Login,
    Analysis,
    NotFound,
    ProductList,
    CreateProduct,
    CategoryList,
    PromotionList,
    Promotion,
    CreatePromotion,
    OrderList,
} from "./";


function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Analysis />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/product/edit/:id" element={<CreateProduct />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/promotions" element={<PromotionList />} />
            <Route path="/promotion/:id" element={<Promotion />} />
            <Route path="/promotion/create" element={<CreatePromotion />} />
            <Route path="/promotion/edit/:id" element={<CreatePromotion />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Pages;
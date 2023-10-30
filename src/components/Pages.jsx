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
    Order,
    UserList,
    WarehouseList,
    WarehouseInOut,
    RevenueList,
    RatedList,
    ContactList,
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
            <Route path="/order/:id" element={<Order />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/warehouses" element={<WarehouseList />} />
            <Route path="/warehouses/in" element={<WarehouseInOut />} />
            <Route path="/warehouses/out" element={<WarehouseInOut />} />
            <Route path="/revenues" element={<RevenueList />} />
            <Route path="/rated" element={<RatedList />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Pages;
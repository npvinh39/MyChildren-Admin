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
    EditOrder,
    UserList,
    User,
    EditUser,
    AdminList,
    CreateAdmin,
    WarehouseList,
    WarehouseInOut,
    Warehouse,
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
            <Route path="/order/edit/:id" element={<EditOrder />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="/admins" element={<AdminList />} />
            <Route path="/admin/create" element={<CreateAdmin />} />
            <Route path="/admin/edit/:id" element={<CreateAdmin />} />
            <Route path="/warehouses" element={<WarehouseList />} />
            <Route path="/warehouse/:id" element={<Warehouse />} />
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
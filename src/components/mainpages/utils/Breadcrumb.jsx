import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiArrowRightSLine } from "react-icons/ri";

export const Breadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter((path) => path);

    return (
        <nav className="text-sm font-base">
            <ol className="list-none p-0 inline-flex">

                <li className="flex items-center">
                    <Link to="/" className="text-gray-500 hover:text-red-500">
                        Trang chủ
                    </Link>
                    {paths.length > 0 && <RiArrowRightSLine className="mx-1" />}
                </li>

                {paths.map((path, index) => {
                    const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
                    const isLast = index === paths.length - 1;
                    let slug;
                    switch (path) {
                        case 'products':
                            slug = 'Sản phẩm';
                            break;
                        case 'product':
                            slug = 'Chi tiết sản phẩm';
                            break;
                        case 'categories':
                            slug = 'Danh mục';
                            break;
                        case 'cart':
                            slug = 'Giỏ hàng';
                            break;
                        case 'checkout':
                            slug = 'Thanh toán';
                            break;
                        case 'callback':
                            slug = 'Thanh toán';
                            break;
                        case 'search':
                            slug = 'Tìm kiếm';
                            break;
                        case 'orders':
                            slug = 'Đơn hàng';
                            break;
                        case 'order':
                            slug = 'Chi tiết đơn hàng';
                            break;
                        case 'promotions':
                            slug = 'Khuyến mãi';
                            break;
                        case 'users':
                            slug = 'Người dùng';
                            break;
                        case 'admin':
                            slug = 'Quản trị viên';
                            break;
                        case 'warehouse':
                            slug = 'Quản lý kho';
                            break;
                        case 'revenue':
                            slug = 'Doanh thu';
                            break;
                        case 'rated':
                            slug = 'Đánh giá';
                            break;
                        case 'contact':
                            slug = 'Danh sách liên hệ';
                            break;
                        case 'create':
                            slug = 'Thêm mới';
                            break;
                        case 'edit':
                            slug = 'Chỉnh sửa';
                            break;
                        case 'login':
                            slug = 'Đăng nhập';
                            break;
                        case 'register':
                            slug = 'Đăng ký';
                            break;
                        default:
                            slug = path;
                            break;
                    }
                    return (
                        <li key={index} className="flex items-center">
                            <Link to={routeTo} className="text-gray-500 hover:text-red-500">
                                {slug}
                            </Link>
                            {!isLast && <RiArrowRightSLine className="mx-1" />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;

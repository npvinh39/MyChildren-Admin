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
                        case 'promotion':
                            slug = 'Chi tiết khuyến mãi';
                            break;
                        case 'users':
                            slug = 'Người dùng';
                            break;
                        case 'user':
                            slug = 'Chi tiết người dùng';
                            break;
                        case 'admins':
                            slug = 'Quản trị viên';
                            break;
                        case 'admin':
                            slug = 'Chi tiết quản trị viên';
                            break;
                        case 'warehouses':
                            slug = 'Quản lý kho';
                            break;
                        case 'warehouse':
                            slug = 'Chi tiết kho';
                            break;
                        case 'in':
                            slug = 'Nhập kho';
                            break;
                        case 'out':
                            slug = 'Xuất kho';
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
                        case 'revenues':
                            slug = 'Doanh thu';
                            break;
                        case 'contacts':
                            slug = 'Liên hệ';
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

import React, { useEffect } from 'react';
import { Pagination, Space, Table } from 'antd';
import { fetchCategories } from '../../../features/category/path-api';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const columns = [
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: 'image',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },

    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link to='' className='text-red-500'>Sửa</Link>
                <Link to='' className='text-red-500'>Xóa</Link>
            </Space>
        ),
    },
];


export const CategoryList = () => {
    const dispatch = useDispatch();
    const { categories, pageSize, currentPage, totalPages, loading } = useSelector(state => state.category);
    const total = totalPages * pageSize;
    console.log("test categories: ", total);
    useEffect(() => {
        dispatch(fetchCategories({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const data = categories.map(category => {
        return {
            key: category._id,
            name: category.name,
            image: category.image,
            description: category.description,
        }
    });
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{
                    pageSize: pageSize,
                    current: currentPage,
                    total: total,
                    onChange: (page, pageSize) => {
                        dispatch(fetchCategories({ currentPage: page, pageSize }));
                    }
                }}
            />
        </>
    )
};
export default CategoryList;
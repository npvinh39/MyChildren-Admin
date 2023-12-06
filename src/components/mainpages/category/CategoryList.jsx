import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Popconfirm } from 'antd';
import { fetchCategories, deleteCategory } from '../../../features/category/path-api';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CreateCategory } from './CreateCategory';
import dayjs from 'dayjs';


export const CategoryList = () => {
    const dispatch = useDispatch();
    const { categories, pageSize, currentPage, totalPages, loading } = useSelector(state => state.category);
    const total = totalPages * pageSize;
    const [isOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState([]);

    useEffect(() => {
        dispatch(fetchCategories({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const showModal = () => {
        setIsOpen(true);
        setValues([]);
    }

    const data = categories.map((category, index) => {
        return {
            index: -(- (currentPage - 1) * pageSize - (index + 1)),
            id: category._id,
            key: category._id,
            name: category.name,
            description: category.description,
            createdAt: dayjs(category.createdAt).format('HH:mm:ss DD/MM/YYYY'),
        }
    });

    const confirmDelete = (id) => {
        dispatch(deleteCategory(id));
    };
    const cancelDelete = (e) => {
        console.log(e);
    };

    const columns = [

        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },

        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },

        {
            title: "Hành động",
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type='primary'
                        ghost
                        onClick={() => {
                            setValues(record);
                            setIsOpen(true);
                        }}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xác nhận xóa"
                        description={`Bạn có chắc chắn muốn xóa danh mục ${record.name} ?`}
                        onConfirm={() => confirmDelete(record.id)}
                        onCancel={cancelDelete}
                        okText="Đồng ý"
                        cancelText="Không"
                    >
                        <Button
                            danger

                        // onClick={() => {
                        //     dispatch(deleteCategory(record.id));
                        // }}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className='mb-4'>
                <Button
                    type="primary"
                    onClick={showModal}
                >
                    Thêm mới
                </Button>
                <CreateCategory
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    loading={loading}
                    values={values}
                    setValues={setValues}
                />
            </div>
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
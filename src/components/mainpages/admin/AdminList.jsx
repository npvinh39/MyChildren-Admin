import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Button, Badge, Select, Popconfirm } from 'antd';
import { fetchAdmins, editAdmin, deleteAdmin } from '../../../features/admin/path-api';
import { unwrapResult } from '@reduxjs/toolkit';

export const AdminList = () => {
    const dispatch = useDispatch();
    const { admins, pageSize, currentPage, totalPages, loading } = useSelector((state) => state.admin);
    const total = totalPages * pageSize;
    const [selectStatus, setSelectStatus] = useState('');

    useEffect(() => {
        dispatch(fetchAdmins({ currentPage, pageSize, status: selectStatus }));
    }, [dispatch, pageSize, currentPage]);

    const [data, setData] = useState([]);

    useEffect(() => {
        const result = admins.map((admin, index) => {
            return {
                index: -(- (currentPage - 1) * pageSize - (index + 1)),
                id: admin._id,
                key: admin._id,
                name: `${admin.last_name} ${admin.first_name}`,
                email: admin.email,
                phone: admin.phone,
                status: admin.status,
                edit: false,
            };
        });
        setData(result);
    }, [admins]);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return (
                    <>
                        {status === 'activated' && (
                            <Badge status="processing" text="Đã xác minh" />
                        )}
                        {status === 'inactive' && (
                            <Badge status="warning" text="Chưa xác minh" />
                        )}
                        {status === 'blocked' && (
                            <Badge status="error" text="Bị khóa" />
                        )}
                    </>
                )
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Link to={`/admin/edit/${record.id}`}>
                            <Button type="primary">
                                Sửa
                            </Button>
                        </Link>
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa?"
                            onConfirm={() => {
                                dispatch(deleteAdmin(record.id))
                                    .then(unwrapResult)
                                    .then(() => {
                                        dispatch(fetchAdmins({ currentPage, pageSize }));
                                    })
                                    .catch((error) => console.log(error));
                            }}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="primary" danger>
                                Xóa
                            </Button>
                        </Popconfirm>
                    </Space>
                );
            }
        },
    ];

    const handleChange = (value) => {
        setSelectStatus(value);
    };

    const handleSelect = () => {

        dispatch(fetchAdmins({ currentPage, pageSize, status: selectStatus }));

    };

    const handleReset = () => {
        dispatch(fetchAdmins({ currentPage, pageSize }));
        setSelectStatus('');
    };

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <div className="filter">
                    <Select
                        className='mr-2'
                        defaultValue="Tất cả"
                        style={{ width: 144 }}
                        onChange={handleChange}
                    >
                        <Select.Option value="">Tất cả</Select.Option>
                        <Select.Option value="activated">Đã xác minh</Select.Option>
                        <Select.Option value="inactive">Chưa xác minh</Select.Option>
                        <Select.Option value="blocked">Bị khóa</Select.Option>
                    </Select>
                    <Button type="primary" onClick={handleSelect}>
                        Lọc
                    </Button>
                    {/* <Button type="primary" onClick={handleReset}>
                        Reset
                    </Button> */}
                </div>
                <Link to='/admin/create'>
                    <Button type="primary">Thêm admin</Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onChange: (page, pageSize) => {
                        dispatch(fetchAdmins({ currentPage: page, pageSize }));
                    },
                }}
                loading={loading}
            />
        </>
    );
}

export default AdminList;
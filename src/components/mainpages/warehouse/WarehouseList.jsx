import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWarehouses } from '../../../features/warehouse/path-api';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Table, Button, Space, Input, Pagination, Spin } from 'antd';

export const WarehouseList = () => {
    const dispatch = useDispatch();
    const { warehouses, pageSize, currentPage, totalPages, loading } = useSelector(state => state.warehouse);
    const total = totalPages * pageSize;

    const formatDate = (date) => {
        return dayjs(date).format("HH:mm:ss DD/MM/YYYY");
    };

    React.useEffect(() => {
        dispatch(fetchWarehouses({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const data = warehouses.map((warehouse, index) => {
        return {
            index: -(- (currentPage - 1) * pageSize - (index + 1)),
            id: warehouse._id,
            key: warehouse._id,
            importDate: formatDate(warehouse.importDate),
            type: warehouse.type,
            total_quantity: warehouse.products.map(product => product.quantity).reduce((a, b) => a + b, 0),
            products_quantity: warehouse.products.length,
        }
    });

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Thời gian',
            dataIndex: 'importDate',
            key: 'importDate',
        },

        {
            title: 'Loại kho',
            dataIndex: 'type',
            key: 'type',
        },

        {
            title: 'Số lượng sản phẩm',
            dataIndex: 'products_quantity',
            key: 'products_quantity',
        },

        {
            title: 'Số lượng tổng',
            dataIndex: 'total_quantity',
            key: 'total_quantity',
        },

        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/warehouse/${record.id}`}>
                        <Button type="primary">Chi tiết</Button>
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Link to="/warehouses/in" className='mr-3'>
                    <Button type="primary">
                        Nhập kho
                    </Button>
                </Link>
                <Link to="/warehouses/out">
                    <Button type="primary" danger>
                        Xuất kho
                    </Button>
                </Link>
            </div>
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </Spin>
            <Pagination
                style={{ marginTop: 16, textAlign: "right" }}
                current={currentPage}
                total={total}
                pageSize={pageSize}
                onChange={(page, pageSize) => dispatch(fetchWarehouses({ currentPage: page, pageSize }))}
            />
        </div>
    );
}

export default WarehouseList;
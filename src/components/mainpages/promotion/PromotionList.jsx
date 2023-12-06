import React, { useState } from 'react';
import { Button, Space, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPromotions } from '../../../features/promotion/path-api';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export const PromotionList = () => {
    const dispatch = useDispatch();
    const { promotions, pageSize, currentPage, totalPages, loading } = useSelector(state => state.promotion);
    const total = totalPages * pageSize;

    React.useEffect(() => {
        dispatch(fetchPromotions({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const data = promotions.map((promotion, index) => {
        return {
            index: -(- (currentPage - 1) * pageSize - (index + 1)),
            id: promotion._id,
            key: promotion._id,
            name: promotion.name,
            description: promotion.description,
            startDate: dayjs(promotion.startDate).format('HH:mm:ss DD/MM/YYYY'),
            endDate: dayjs(promotion.endDate).format('HH:mm:ss DD/MM/YYYY'),
        }
    });

    const columns = [

        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên khuyến mãi',
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
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
        },

        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
        },

        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/promotion/${record.id}`}>
                        <Button>Chi tiết</Button>
                    </Link>
                    <Link to={`/promotion/edit/${record.id}`}>
                        <Button ghost type="primary">Sửa</Button>
                    </Link>

                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Link to="/promotion/create">
                    <Button type="primary">
                        Thêm khuyến mãi
                    </Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    total,
                    current: currentPage,
                    pageSize,
                    onChange: (page, pageSize) => {
                        dispatch(fetchPromotions({ currentPage: page, pageSize }));
                    }
                }}
                loading={loading}
            />
        </div>
    )
};

export default PromotionList;
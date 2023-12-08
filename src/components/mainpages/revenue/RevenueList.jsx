import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRevenues } from "../../../features/revenue/path-api";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { Table, Button, Space, Input, Pagination, Spin } from "antd";

export const RevenueList = () => {
    const dispatch = useDispatch();
    const { revenues, pageSize, currentPage, totalPages, loading } = useSelector(
        (state) => state.revenue
    );
    const total = totalPages * pageSize;

    const formatDate = (date) => {
        return dayjs(date).format("HH:mm:ss DD/MM/YYYY");
    };

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    React.useEffect(() => {
        dispatch(fetchRevenues({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const data = revenues.map((revenue, index) => {
        return {
            index: -(- (currentPage - 1) * pageSize - (index + 1)),
            id: revenue._id,
            key: revenue._id,
            date: formatDate(revenue.date),
            quantity: revenue.quantity,
            total_price: VND.format(revenue.total_price),
        };
    });

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Ngày",
            dataIndex: "date",
            key: "date",
        },

        {
            title: "Số lượng bán",
            dataIndex: "quantity",
            key: "quantity",
        },

        {
            title: "Tổng doanh thu",
            dataIndex: "total_price",
            key: "total_price",
        },

        {
            title: "Xem chi tiết",
            dataIndex: "id",
            key: "id",
            render: (id) => (
                <Link to={`/revenue/${id}`}>
                    <Button type="primary">Xem chi tiết</Button>
                </Link>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <div className="product-list">
                <div className="product-list__header">
                    <h2 className="product-list__title">Doanh thu</h2>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{
                        total: total,
                        pageSize: pageSize,
                        current: currentPage,
                        onChange: (page, pageSize) => {
                            dispatch(fetchRevenues({ currentPage: page, pageSize }));
                        },
                    }}
                />
            </div>
        </Spin>
    );
};

export default RevenueList;
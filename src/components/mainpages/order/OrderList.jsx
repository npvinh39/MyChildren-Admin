import React from "react";
import { Button, Space, Table, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../features/order/path-api";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, pageSize, currentPage, totalPages, loading } = useSelector(
        (state) => state.order
    );
    const total = totalPages * pageSize;

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    React.useEffect(() => {
        dispatch(fetchOrders({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const data = orders.map((order, index) => {
        return {
            index: -(-(currentPage - 1) * pageSize - (index + 1)),
            id: order._id,
            key: order._id,
            customer: order.customer,
            status: order.status,
            final_total: VND.format(order.final_total),
            createdAt: dayjs(order.createdAt).format("HH:mm:ss DD/MM/YYYY"),
        };
    });

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Khách hàng",
            dataIndex: "customer",
            key: "customer",
            render: (text) => <a>{text}</a>,
        },

        {
            title: "Trạng thái đơn",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "";
                let text = "";
                switch (status) {
                    case "Chờ xác nhận":
                        color = "orange";
                        text = "Chờ xác nhận";
                        break;
                    case "Đang xử lý":
                        color = "orange";
                        text = "Đang xử lý";
                        break;
                    case "Đã xác nhận":
                        color = "green";
                        text = "Đã xác nhận";
                        break;
                    case "Đang giao hàng":
                        color = "cyan";
                        text = "Đang giao hàng";
                        break;
                    case "Đã giao hàng":
                        color = "blue";
                        text = "Đã giao hàng";
                        break;
                    case "Đã hủy":
                        color = "red";
                        text = "Đã hủy";
                        break;
                    default:
                        break;
                }
                return (
                    <Badge color={color} text={text} />
                );
            },
        },

        {
            title: "Tổng tiền",
            dataIndex: "final_total",
            key: "final_total",
        },

        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
        },

        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/order/${record.id}`}>Chi tiết</Link>
                    <Link to={`/order/edit/${record.id}`}>Sửa</Link>
                    <Button
                        type="link"
                        onClick={() => dispatch(deleteOrder(record.id))}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onChange: (page, pageSize) => {
                        dispatch(fetchOrders({ currentPage: page, pageSize }));
                    },
                }}
                loading={loading}
            />
            {/* <CreateOrder
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                values={values}
                setValues={setValues}
            /> */}
        </>
    );
};

export default OrderList;
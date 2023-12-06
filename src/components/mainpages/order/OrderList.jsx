import React from "react";
import { Button, Space, Table, Badge, Select, Popconfirm } from "antd";
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrder, deleteOrder } from "../../../features/order/path-api";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, pageSize, currentPage, totalPages, loading } = useSelector(
        (state) => state.order
    );

    const total = totalPages * pageSize;

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const [selectStatus, setSelectStatus] = React.useState(0);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        dispatch(fetchOrders({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    React.useEffect(() => {
        const result = orders?.map((order, index) => {
            return {
                index: -(-(currentPage - 1) * pageSize - (index + 1)),
                id: order?._id,
                key: order?._id,
                customer: order?.customer,
                status: order?.status,
                final_total: VND.format(order?.final_total),
                createdAt: dayjs(order?.createdAt).format("HH:mm:ss DD/MM/YYYY"),
                edit: false,
            };
        });
        setData(result);
    }, [orders]);

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
            render: (status, item) => {
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
                    <div className='flex justify-around items-center'>
                        {
                            !item.edit ? (
                                < Badge color={color} text={text} />
                            ) : (
                                <Select
                                    defaultValue={status}
                                    style={{ width: 120 }}
                                    onChange={(value) => {
                                        setSelectStatus(value);
                                    }}
                                >
                                    <Select.Option value="Chờ xác nhận">
                                        Chờ xác nhận
                                    </Select.Option>
                                    <Select.Option value="Đang xử lý">
                                        Đang xử lý
                                    </Select.Option>
                                    <Select.Option value="Đã xác nhận">
                                        Đã xác nhận
                                    </Select.Option>
                                    <Select.Option value="Đang giao hàng">
                                        Đang giao hàng
                                    </Select.Option>
                                    <Select.Option value="Đã giao hàng">
                                        Đã giao hàng
                                    </Select.Option>
                                    <Select.Option value="Đã hủy">
                                        Đã hủy
                                    </Select.Option>
                                </Select>
                            )
                        }
                        <Button onClick={async () => {
                            try {
                                if (item.edit) {
                                    const result = await dispatch(updateOrder({ id: item.id, status: selectStatus }));

                                    const payload = await unwrapResult(result);
                                    const newData = [...data];
                                    const index = newData.findIndex((i) => i.key === item.key);
                                    const items = newData[index];
                                    newData.splice(index, 1, {
                                        ...items,
                                        status: selectStatus,
                                        edit: !item.edit,
                                    });
                                    setData(newData);
                                }
                                else {
                                    const newData = [...data];
                                    const index = newData.findIndex((i) => i.key === item.key);
                                    const items = newData[index];
                                    newData.splice(index, 1, {
                                        ...items,
                                        edit: !item.edit,
                                    });
                                    setData(newData);
                                }
                            } catch (error) {
                                console.log('error', error)
                            }
                        }}>
                            {item.edit ? 'Xác nhận' : 'Cập nhật'}
                        </Button>
                    </div >

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
                    <Link to={`/order/${record.id}`}>
                        <Button>Chi tiết</Button>
                    </Link>
                    <Link to={`/order/edit/${record.id}`}>
                        <Button type="primary" ghost>Sửa</Button>
                    </Link>
                    <Popconfirm
                        title="Xác nhận xóa"
                        description={`Bạn có chắc chắn muốn xóa đơn hàng ${record.customer} ?`}
                        onConfirm={() => dispatch(deleteOrder(record.id))}
                        okText="Đồng ý"
                        cancelText="Không"
                    >
                        <Button
                            danger
                            ghost
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
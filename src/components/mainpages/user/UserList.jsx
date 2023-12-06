import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button, Badge, Select, Popconfirm } from "antd";
import { fetchUsers, updateUser, deleteUser } from "../../../features/user/path-api";
import { unwrapResult } from '@reduxjs/toolkit';

export const UserList = () => {
    const dispatch = useDispatch();
    const { users, pageSize, currentPage, totalPages, loading } = useSelector(
        (state) => state.user
    );
    const total = totalPages * pageSize;

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    useEffect(() => {
        dispatch(fetchUsers({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const [selectStatus, setSelectStatus] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const result = users.map((user, index) => {
            return {
                index: -(- (currentPage - 1) * pageSize - (index + 1)),
                id: user._id,
                key: user._id,
                name: `${user.last_name} ${user.first_name}`,
                email: user.email,
                phone: user.phone,
                status: user.status,
                spending: VND.format(user.spending),
                edit: false,
            };
        });
        setData(result);
    }, [users]);

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên người dùng",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },

        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },

        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },

        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status, item) => {
                return (
                    <div className="flex justify-around items-center">
                        {
                            item.edit ? (
                                <Select
                                    defaultValue={status}
                                    style={{ width: 120 }}
                                    onChange={(value) => {
                                        setSelectStatus(value);
                                    }}
                                >
                                    <Option value="inactive">Chưa xác minh</Option>
                                    <Option value="activated">Đã xác minh</Option>
                                    <Option value="blocked">Bị chặn</Option>
                                </Select>
                            )
                                :
                                (
                                    <div>
                                        {
                                            status === "inactive" ?
                                                <Badge status='processing' text='Chưa xác minh' />
                                                :
                                                status === "activated" ?
                                                    <Badge status='success' text="Đã xác minh" />
                                                    :
                                                    <Badge status='error' text="Bị chặn" />
                                        }
                                    </div>
                                )
                        }
                        <Button
                            onClick={async () => {
                                try {
                                    if (item.edit) {
                                        const result = await dispatch(updateUser({ ...item, status: selectStatus }));

                                        const payload = await unwrapResult(result);
                                        const newData = [...data];
                                        const index = newData.findIndex((i) => i.key === item.key);
                                        const items = newData[index];
                                        newData.splice(index, 1, {
                                            ...items,
                                            status: payload.user.status,
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
                                    console.log("Failed to update status user", error);
                                }
                            }
                            }
                        >
                            {item.edit ? "Xác nhận" : "Cập nhật"}
                        </Button>
                    </div>
                );
            },
        },

        {
            title: "Tổng chi tiêu",
            dataIndex: "spending",
            key: "spending",
        },

        {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/user/${record.id}`}>
                        <Button>Chi tiết</Button>
                    </Link>
                    <Link to={`/user/edit/${record.id}`}>
                        <Button type="primary" ghost>Sửa</Button>
                    </Link>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        description="Hành động này không thể hoàn tác"
                        onConfirm={() => dispatch(deleteUser(record.id))}
                        okText="Xóa"
                        cancelText="Hủy"
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
        <div>
            {/* <div style={{ marginBottom: 16 }}>
                <Link to="/admin/user/create">
                    <Button type="primary">Thêm người dùng</Button>
                </Link>
            </div> */}
            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onChange: (page, pageSize) => {
                        dispatch(fetchUsers({ currentPage: page, pageSize }));
                    }
                }}
            />
        </div>
    );
}

export default UserList;
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button } from "antd";
import { fetchUsers } from "../../../features/user/path-api";

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

    React.useEffect(() => {
        dispatch(fetchUsers({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const data = users.map((user, index) => {
        return {
            index: -(- (currentPage - 1) * pageSize - (index + 1)),
            id: user._id,
            key: user._id,
            name: user.last_name + " " + user.first_name,
            email: user.email,
            phone: user.phone,
            address: user.default_address,
            spending: VND.format(user.spending),
        };
    });

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
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
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
                    <Link to={`/admin/user/${record.id}`}>Chi tiết</Link>
                    <Link to={`/admin/user/edit/${record.id}`}>Sửa</Link>
                    <Button
                        type="link"
                        onClick={() => dispatch(deleteUser(record.id))}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Link to="/admin/user/create">
                    <Button type="primary">Thêm người dùng</Button>
                </Link>
            </div>
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
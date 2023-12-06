import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../../features/user/path-api';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';

export const EditUser = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (id) {
            dispatch(fetchUser({ id }));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (user && id) {
            form.setFieldsValue({
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
                phone: user?.phone,
                status: user?.status,
            });
        }
    }, [form, user]);

    const onFinish = (value) => {
        dispatch(updateUser({ id, ...value }));
        navigate('/users');
    };

    return (
        <div className="edit-user">
            <h2>Chỉnh sửa người dùng</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="first_name"
                    label="Họ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Tên"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Trạng thái"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn trạng thái!',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value='inactive'>Chưa xác minh</Select.Option>
                        <Select.Option value='activated'>Đã xác minh</Select.Option>
                        <Select.Option value='blocked'>Bị chặn</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                    <Button type="primary" danger>
                        <Link to="/users">Hủy</Link>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditUser;
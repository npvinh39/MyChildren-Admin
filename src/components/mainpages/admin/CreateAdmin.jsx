import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmin, createAdmin } from '../../../features/admin/path-api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';

export const CreateAdmin = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);

    useEffect(() => {
        if (id) {
            dispatch(fetchAdmin({ id }));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (admin && id) {
            form.setFieldsValue({
                first_name: admin?.first_name,
                last_name: admin?.last_name,
                email: admin?.email,
                phone: admin?.phone,
                status: admin?.status,
            });
        }
    }, [form, admin]);

    const onFinish = (value) => {
        dispatch(createAdmin(value));
        navigate('/admins');
    };

    return (
        <div className="create-admin">
            <h2>Tạo người dùng</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className="flex justify-between">
                    <Form.Item
                        className='w-1/2 mr-2'
                        name="last_name"
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
                        className='w-1/2 ml-2'
                        name="first_name"
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
                </div>
                <div className="flex justify-between">
                    <Form.Item
                        className='w-1/2 mr-2'
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='w-1/2 ml-2'
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
                </div>
                {
                    id && admin
                        ? (
                            <div>
                                <Form.Item>
                                    <Button type="primary" className='mb-3'>
                                        Đổi mật khẩu
                                    </Button>
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
                                        <Select.Option value="activated">Đã xác minh</Select.Option>
                                        <Select.Option value="inactive">Chưa xác minh</Select.Option>
                                        <Select.Option value="blocked">Bị khóa</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="role"
                                    label="Vai trò"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn vai trò!',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="super-admin">Super Admin</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>

                        )
                        : (
                            <div>
                                <Form.Item
                                    name="password"
                                    label="Mật khẩu"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
                                        },
                                        {
                                            min: 8,
                                            message: 'Mật khẩu phải có ít nhất 8 ký tự!'
                                        },
                                        //password has to have at least one uppercase, one lowercase, one number and one special character
                                        {
                                            pattern: /^(?=.*[A-Z])/,
                                            message: 'Mật khẩu phải có ít nhất 1 chữ hoa!'
                                        },
                                        {
                                            pattern: /^(?=.*[a-z])/,
                                            message: 'Mật khẩu phải có ít nhất 1 chữ thường!'
                                        },
                                        {
                                            pattern: /^(?=.*\d)/,
                                            message: 'Mật khẩu phải có ít nhất 1 số!'
                                        },
                                        {
                                            pattern: /^(?=.*[^\da-zA-Z])/,
                                            message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt!'
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="confirm_password"
                                    label="Xác nhận mật khẩu"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng xác nhận mật khẩu!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                            },
                                        }),
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>
                            </div>
                        )
                }
                <Form.Item
                    className='text-center'
                >
                    <Link to={'/admins'} className='mx-3'>
                        <Button danger ghost>
                            Hủy
                        </Button>
                    </Link>
                    <Button type="primary" htmlType="submit">
                        Tạo
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
}

export default CreateAdmin;
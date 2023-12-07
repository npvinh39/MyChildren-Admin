import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmin, createAdmin, editAdmin } from '../../../features/admin/path-api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import { UpdatePassword } from './UpdatePassword';

export const CreateAdmin = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin, loading } = useSelector((state) => state.admin);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchAdmin({ id }));
        }
    }, [dispatch, id]);

    const showModal = () => {
        setIsOpen(true);
    }

    useEffect(() => {
        if (admin && id) {
            form.setFieldsValue({
                first_name: admin?.first_name,
                last_name: admin?.last_name,
                email: admin?.email,
                phone: admin?.phone,
                status: admin?.status,
                role: admin?.role
            });
        }
    }, [form, admin]);

    const onFinish = (value) => {
        if (id && admin) {
            dispatch(editAdmin({ id, ...value }));
        } else {
            dispatch(createAdmin(value));
        }
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
                            <div className='flex justify-between gap-3'>
                                <Form.Item
                                    className='w-1/3'
                                    label="Mật khẩu"
                                >
                                    <Button
                                        type="primary"
                                        className='mb-3'
                                        onClick={showModal}
                                    >
                                        Đổi mật khẩu
                                    </Button>
                                    <UpdatePassword
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        loading={loading}
                                        id={id}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className='w-1/3'
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
                                    className='w-1/3'
                                    name="role"
                                    label="Vai trò"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn vai trò!',
                                        },
                                    ]}
                                >
                                    <Select
                                    // defaultValue={admin?.role}
                                    // disabled={admin?.role === 'staff'}
                                    >
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="staff">Nhân viên</Select.Option>
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
                        {id ? 'Cập nhật' : 'Tạo'}
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
}

export default CreateAdmin;
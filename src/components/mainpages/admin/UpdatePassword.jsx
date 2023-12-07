import React, { useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../../features/admin/path-api';

export const UpdatePassword = ({ isOpen, setIsOpen, loading, id }) => {
    const dispatch = useDispatch();
    const handleOk = () => {
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false);
    };

    const [form] = Form.useForm();


    const onSubmit = async (data) => {
        try {
            await dispatch(updatePassword({ ...data, id }));
            setIsOpen(false);
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <Modal
            title="Cập nhật mật khẩu"
            open={isOpen}
            onOk={handleOk}
            confirmLoading={loading}
            onCancel={handleCancel}
            footer={null}

        >
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item
                    label="Mật khẩu"
                    name="password"
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
                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdatePassword;
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { createCategory, updateCategory } from '../../../features/category/path-api';

export const CreateCategory = ({ isOpen, setIsOpen, loading, values, setValues }) => {
    const dispatch = useDispatch();
    const handleOk = () => {
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false);
        setValues([]);
    };

    const [form] = Form.useForm();

    useEffect(() => {
        if (values) {
            form.setFieldsValue({
                name: values.name,
                description: values.description,
            })
        }
        else {
            form.resetFields();
        }
    }, [values])

    const onSubmit = async (data) => {
        try {
            if (values.id) {
                await dispatch(updateCategory({ ...data, id: values.id }));
            } else {
                await dispatch(createCategory(data));
            }
            setIsOpen(false);
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <Modal
            title="Thêm mới"
            open={isOpen}
            onOk={handleOk}
            confirmLoading={loading}
            onCancel={handleCancel}

            footer={null}

        >
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                layout="horizontal"
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng không bỏ trống trường này'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng không bỏ trống trường này'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <div className='flex justify-center'>
                    <Button
                        className='mr-3'
                        onClick={handleCancel}
                    >
                        Đóng
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {values.id ? 'Sửa danh mục' : 'Thêm mới'}
                    </Button>
                </div>
            </Form>
        </Modal>
    )
};

export default CreateCategory;
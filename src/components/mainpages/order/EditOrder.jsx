import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, updateOrder } from "../../../features/order/path-api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";

export const EditOrder = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);

    useEffect(() => {
        if (id) {
            dispatch(fetchOrder(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (order && id) {
            form.setFieldsValue({
                customer: order?.customer,
                phone: order?.phone,
                email: order?.email,
                address: order?.address,
                status: order?.status,
            });
        }
    }, [form, order]);

    const onFinish = (value) => {
        // console.log({ id, ...value });
        dispatch(updateOrder({ id, ...value }));
        navigate("/orders");
    };

    return (
        <div className="edit-order">
            <h2>Chỉnh sửa đơn hàng</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="customer"
                    label="Tên khách hàng"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên khách hàng!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số điện thoại!",
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
                            message: "Vui lòng nhập email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập địa chỉ!",
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
                            message: "Vui lòng chọn trạng thái!",
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="pending">
                            Chờ xác nhận
                        </Select.Option>
                        <Select.Option value="processing">
                            Đang xử lý
                        </Select.Option>
                        <Select.Option value="shipping">
                            Đang giao hàng
                        </Select.Option>
                        <Select.Option value="delivered">
                            Đã giao hàng
                        </Select.Option>
                        <Select.Option value="cancelled">
                            Đã hủy
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditOrder;
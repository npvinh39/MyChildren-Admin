import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPromotion, fetchPromotion, updatePromotion } from '../../../features/promotion/path-api';
import { fetchProducts, fetchProduct } from '../../../features/product/path-api';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Input, Form, InputNumber, DatePicker, Select } from 'antd';
const { RangePicker } = DatePicker;
import { useNavigate } from 'react-router-dom';


export const CreatePromotion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const [selectedDate, setSelectedDate] = React.useState([]);
    const { id } = useParams();
    const { selectProducts, product, loading } = useSelector(state => state.product);
    console.log("selectProducts", selectProducts)
    const { promotion } = useSelector(state => state.promotion);

    useEffect(() => {
        dispatch(fetchProducts({ currentPage: 1, pageSize: 1000 }));
        if (!id) { form.resetFields(); }
        if (id) {
            dispatch(fetchPromotion(id))
        }
    }, [dispatch]);

    useEffect(() => {
        if (promotion && id) {
            form.setFieldsValue({
                name: promotion.name,
                description: promotion.description,
                discount: promotion.discount,
                startDate: dayjs(promotion.startDate).format('YYYY-MM-DD'),
                endDate: dayjs(promotion.endDate).format('YYYY-MM-DD'),
                selectDate: [dayjs(promotion.startDate), dayjs(promotion.endDate)],
                products: promotion.products.map(product => product.product_id),
            });
        }
    }, [form, promotion])

    const onFinish = (values) => {
        values.products = values.products.map(product => ({
            product_id: product,
        }));
        console.log("selected date", selectedDate);
        values.startDate = selectedDate[0];
        values.endDate = selectedDate[1];
        console.log('Success:', values);
        if (!id) {
            dispatch(createPromotion(values));
        }
        else {
            dispatch(updatePromotion({ id, ...values }));
        }
        navigate('/promotions');
    }

    // Date Picker
    // eslint-disable-next-line no-unused-vars
    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };
    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    const options = selectProducts.map(product => ({
        value: product._id,
        label: product.name,
    }));

    // const options = []

    const handleChange = (value) => {
        value = value.map(item => ({
            product_id: item,
        }));
    };

    return (
        <div>
            <h1>{id ? 'Cập nhật khuyến mãi' : 'Tạo khuyến mãi'}</h1>
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <Form.Item
                    label="Tên khuyến mãi"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên khuyến mãi!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input />

                </Form.Item>

                <Form.Item

                    label="Giảm giá"
                    name="discount"
                    rules={[{ required: true, message: 'Vui lòng nhập giảm giá!' }]}
                >
                    <InputNumber
                        type='number'
                        min={0}
                        max={100}
                        addonAfter={'%'}
                        controls
                    />
                </Form.Item>

                <Form.Item
                    label="Chọn ngày"
                    name="selectDate"
                    rules={[{ required: true, message: 'Vui lòng nhập ngày chọn ngày!' }]}
                >
                    <RangePicker
                        showTime
                        size='large'
                        onOk={onOk}
                        format={'HH:mm:ss DD-MM-YYYY'}
                        placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                        onChange={(dates) => {
                            setSelectedDate(dates);
                            if (dates && dates.length === 2) {
                                form.setFieldsValue({
                                    startDate: dates[0],
                                    endDate: dates[1],
                                });
                            }
                        }}
                        defaultValue={selectedDate}
                    />
                </Form.Item>

                <Form.Item
                    label="Sản phẩm"
                    name="products"
                    rules={[{ required: true, message: 'Vui lòng nhập sản phẩm!' }]}
                >
                    <Select
                        mode="tags"
                        size={'large'}
                        placeholder="Chọn sản phẩm khuyến mãi"
                        onChange={handleChange}
                        style={{
                            width: '100%',
                        }}
                        options={options}
                    />
                </Form.Item>

                <div className='flex justify-center'>
                    <Button htmlType="button" className='mr-3' size='large' onClick={() => navigate(-1)}>
                        Trở về
                    </Button>
                    <Button type="primary" htmlType="submit" size='large' loading={loading}>
                        {id ? 'Cập nhật' : 'Tạo khuyến mãi'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default CreatePromotion;

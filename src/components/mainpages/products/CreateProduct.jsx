import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, createProduct, updateProduct } from '../../../features/product/path-api';
import { fetchCategories } from '../../../features/category/path-api';
import { Input, Button, Form, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../../../api/client-axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLayoutEffect } from 'react';

const { Option } = Select;

export const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm()

    const { id } = useParams();
    const { products, product, loading } = useSelector(state => state.product);
    const { categories } = useSelector(state => state.category);
    const [fileList, setFileList] = useState([]);



    useLayoutEffect(() => {
        dispatch(fetchCategories());
        if (!id) { form.resetFields(); }
        dispatch(fetchProduct(id))
    }, [dispatch]);

    React.useEffect(() => {
        if (product && id) {
            form.setFieldsValue({
                product_id: product.product_id,
                name: product.name,
                category_id: product.category_id,
                price: product.price,
                price_discount: product.price_discount,
                brand: product.description.brand,
                origin: product.description.origin,
                made_in: product.description.made_in,
                age_of_use: product.description.age_of_use,
                content: product.content,
                images: product.images,
            });
            setFileList([
                ...product.images.map(image => ({
                    uid: image._id,
                    name: image.public_id,
                    status: 'done',
                    url: image.url,
                    img_old: true,
                }))
            ]);
        }
    }, [form, product])


    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            fileList.forEach(file => {
                formData.append('files', file.originFileObj);
            });

            const response = await axiosClient.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            // console.log('Upload success:', response);
            // message.success('Upload thành công');
            setFileList([]);
            return response;
        } catch (error) {
            console.error('Upload failed:', error);
            message.error('Upload thất bại');
        }
    };

    const onSubmit = async (data) => {
        try {
            if (id) {
                const images = await handleUpload();
                console.log("images:", images)
                const result = fileList.filter(i => i.img_old).map(i => ({
                    public_id: i.name,
                    url: i.url,
                    _id: i.uid
                }))
                dispatch(updateProduct({ ...data, images: [...result, ...images], id: id }));

            } else {
                const images = await handleUpload();
                console.log("images:", images)
                console.log("data:", data)
                dispatch(createProduct({ ...data, images }));
            }
            message.success('Thao tác thành công');
            navigate('/products');
        } catch (error) {
            console.log(error);
        }
    };



    // Create a product_id of 8 characters starting with MC\
    const generateProductID = () => {
        const characters = '0123456789';
        const charactersLength = characters.length;
        let result = 'MC';
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    // react-quill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    return (
        <Form
            form={form}
            onFinish={onSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"

        >
            <Form.Item label="Mã sản phẩm" name="product_id" initialValue={!id && generateProductID()} rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Danh mục" name="category_id" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                {categories.length > 0 && (
                    <Select>
                        {categories.map(category => (
                            <Option key={category._id} value={category._id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <Input type="number" />
            </Form.Item>
            {
                id && (
                    <Form.Item label="Giá giảm" name="price_discount" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                        <Input type="number" />
                    </Form.Item>
                )
            }
            <Form.Item label="Thương hiệu" name="brand" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Nguồn gốc" name="origin" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Nơi sản xuất" name="made_in" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Độ tuổi sử dụng" name="age_of_use" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="content" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                />
            </Form.Item>
            <Form.Item label="Images" name="images" rules={[{ required: true, message: 'Vui lòng không bỏ trống trường này' }]}>
                <Upload
                    action="http://localhost:5000/api/success"
                    onChange={handleFileChange}
                    maxCount={10}
                    fileList={fileList}
                    multiple
                    listType="picture-card"
                >
                    <div>
                        <PlusOutlined />
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            Upload
                        </div>
                    </div>
                </Upload>
            </Form.Item>
            <Form.Item className='flex justify-center'>
                <Button type="primary" htmlType="submit" size='large' loading={loading}>
                    {id ? 'Sửa sản phẩm' : 'Thêm mới'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProduct;
import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Modal, Badge, Descriptions, Avatar, Popconfirm, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../../features/product/path-api';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
const { Meta } = Card;

export const ProductItem = ({
    _id,
    images,
    name,
    price,
    price_discount,
    product_id,
    category,
    stock,
    sold,
    featured_product,
    content,
    description,
    createdAt,
    updatedAt
}) => {
    const [open, setOpen] = useState(false);

    const showInfo = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);

    const confirmDelete = (e) => {
        dispatch(deleteProduct(_id));
        message.success('Xóa thành công');
    };

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    const formatDate = (date) => {
        return dayjs(date).format('HH:mm:ss DD/MM/YYYY');
    }
    const items = [
        {
            key: '1',
            label: 'Tên sản phẩm',
            children: name,
        },
        {
            key: '2',
            label: 'Danh mục',
            children: category.name,
        },
        {
            key: '3',
            label: 'Nổi bật',
            children: featured_product ? 'Có' : 'Không',
        },
        {
            key: '4',
            label: 'Ngày tạo',
            children: formatDate(createdAt),
        },
        {
            key: '5',
            label: "Cập nhật",
            children: formatDate(updatedAt),
        },
        {
            key: '6',
            label: 'Mã sản phẩm',
            children: product_id,
        },
        {
            key: '7',
            label: 'Số lượng',
            children: stock,
        },
        {
            key: '8',
            label: 'Hình ảnh',
            children: images.map(image => <Avatar shape="square" src={image.url} />),
        },
        {
            key: '9',
            label: 'Đã bán',
            children: sold,
        },
        {
            key: '10',
            label: 'Giá',
            children: VND.format(Number(price)),
        },
        {
            key: '11',
            label: 'Giá giảm',
            children: price_discount === price ? 'Không Giảm' : VND.format(Number(price_discount)),
        },
        {
            key: '12',
            label: 'Trạng thái',
            children: stock > 0 ? <Badge status="processing" text="Còn hàng" /> : <Badge status='Error' text="hết hàng" />,
        },
        {
            key: '13',
            label: 'Thông tin',
            children: (
                <>
                    <div><span className='font-light'>Chất liệu:</span> {description.origin}</div>
                    <div><span className='font-light'>Xuất xứ:</span> {description.made_in}</div>
                    <div><span className='font-light'>Thương hiệu:</span> {description.brand}</div>
                    <div><span className='font-light'>Độ tuổi sử dụng:</span> {description.age_of_use}</div>
                </>
            ),
        },
        {
            key: '14',
            label: 'Mô tả',
            children: (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            ),
        },
    ];
    return (
        <Card
            className='product-item col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 overflow-hidden shadow-lg'
            cover={
                <img
                    alt="product item"
                    src={images[0].url}
                />
            }
            actions={[
                <InfoCircleOutlined key="info" onClick={showInfo} />,
                <Link to={`/product/edit/${_id}`}><EditOutlined key="edit" /></Link>,
                <Popconfirm
                    title="Xóa sản phẩm"
                    description={`Bạn có chắc chắn xóa ${name} này chứ?`}
                    onConfirm={confirmDelete}
                    okText="Chắc chắn"
                    cancelText="Không"
                >
                    <DeleteOutlined key="delete" />
                </Popconfirm>
            ]}
        >
            <Meta
                // avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                // title={name}
                description={
                    <div>
                        <div className="h-12 line-clamp-2">
                            <h4 className="text-base text-blue-700 m-0">{name}</h4>
                        </div>
                        <span>SKU:{product_id}</span>
                        {
                            price_discount === price ?
                                <p className='text-red-500 font-bold'>{VND.format(Number(price))}</p>
                                :
                                <div className='flex justify-between'>
                                    <p className='text-red-500 font-bold'>{VND.format(Number(price_discount))}</p>
                                    <p className='line-through'>{VND.format(Number(price))}</p>
                                </div>
                        }
                        <Modal
                            // title="Thông tin sản phẩm"
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={1200}
                        >
                            <Descriptions title="Thông tin sản phẩm" bordered items={items} />
                        </Modal>
                    </div>
                }
            />
        </Card>
    )
};
export default ProductItem;
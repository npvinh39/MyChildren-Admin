import { Card, Descriptions } from 'antd';
const { Meta } = Card;
import React, { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPromotion } from '../../../features/promotion/path-api';
import { fetchProductPromotion } from '../../../features/product/path-api';
import dayjs from 'dayjs';

export const Promotion = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { promotion } = useSelector(state => state.promotion);
    const { productsPromotion } = useSelector(state => state.product);
    console.log('productsPromotion', productsPromotion)

    const formatDate = (date) => {
        return dayjs(date).format('HH:mm:ss DD/MM/YYYY');
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchPromotion(id));
        }
    }, [dispatch, id]);

    // get products from promotion
    useEffect(() => {
        if (promotion?.products) {
            promotion?.products.map(async (product) => {
                await dispatch(fetchProductPromotion(product.product_id));
            })
        }
    }, [dispatch, promotion?.products]);

    const items = [
        {
            key: '1',
            label: 'Tên khuyến mãi',
            children: promotion?.name,
        },
        {
            key: '2',
            label: 'Mô tả',
            children: promotion?.description,
        },
        {
            key: '3',
            label: 'Giảm giá',
            children: `${promotion?.discount}%`,
        },
        {
            key: '4',
            label: 'Ngày bắt đầu',
            children: formatDate(promotion?.startDate),
        },
        {
            key: '5',
            label: 'Ngày kết thúc',
            children: formatDate(promotion?.endDate),
        },

        {
            key: '6',
            label: 'Trạng thái',
            children:
                (
                    <>
                        {
                            // status = 0,1,2
                            promotion?.status === 0 ? 'Chưa bắt đầu' : promotion?.status === 1 ? 'Đang diễn ra' : 'Đã kết thúc'
                        }
                    </>
                )
        },

        {
            key: '7',
            label: 'Sản phẩm',
            children:
                (
                    <div className="grid grid-cols-12 gap-3">
                        {productsPromotion?.map((product, index) => (
                            <Card
                                className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 overflow-hidden shadow-lg'
                                key={index}
                                hoverable
                                cover={<img alt="example" src={product.images[0].url} />}
                            >
                                <Meta
                                    title={product.name}
                                // description={`${product.price}đ`}
                                />
                            </Card>
                        ))}
                    </div>
                ),

        },
    ];

    return (
        <Descriptions title="Thông tin khuyến mãi" bordered items={items} />
        // <div>hello</div>
    )
}

export default Promotion;
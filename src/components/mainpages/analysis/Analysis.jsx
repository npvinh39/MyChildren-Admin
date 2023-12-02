import React, { useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import { Column } from '@ant-design/plots';
import ColumnData from './ColumnData';
import PieData from './PieData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsLength } from '../../../features/product/path-api';
import { fetchUserLength } from '../../../features/user/path-api';
import { fetchOrdersLength } from '../../../features/order/path-api';
import { fetchRatedLength } from '../../../features/rated/path-api';


export const Analysis = () => {
    const dispatch = useDispatch();
    const { productsLength } = useSelector(state => state.product);
    const { usersLength } = useSelector(state => state.user);
    const { ordersLength } = useSelector(state => state.order);
    const { ratedLength } = useSelector(state => state.rated);

    useEffect(() => {
        dispatch(fetchProductsLength());
        dispatch(fetchUserLength());
        dispatch(fetchOrdersLength());
        dispatch(fetchRatedLength());
    }, [dispatch]);

    const formatter = (value) => <CountUp end={value} separator="." />;

    return (
        <div>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        bordered={false}
                        className='bg-lime-300 mb-4'
                    >
                        <Statistic title="Sản phẩm" value={productsLength} formatter={formatter} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        bordered={false}
                        className='bg-red-300 mb-4'
                    >
                        <Statistic title="Đơn hàng" value={ordersLength} formatter={formatter} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        bordered={false}
                        className='bg-sky-300 mb-4'
                    >
                        <Statistic title="Khách hàng" value={usersLength} formatter={formatter} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        bordered={false}
                        className='bg-yellow-300 mb-4'
                    >
                        <Statistic title="Đánh giá" value={ratedLength} formatter={formatter} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={20} className='mt-4'>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Card title="Thống kê doanh thu" bordered={false}>
                        <ColumnData />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Card title="Thống kê tiêu thụ" bordered={false}>
                        <PieData />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Analysis
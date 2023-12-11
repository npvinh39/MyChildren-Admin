import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRevenuesFillTime } from '../../../features/revenue/path-api'

export const ColumnData = () => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { revenues } = useSelector(state => state.revenue);

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const formatDate = (date) => {
        return dayjs(date).format("YYYY/MM/DD");
    };

    useEffect(() => {
        dispatch(fetchRevenuesFillTime({ from: startDate, to: endDate }));
    }, [dispatch, startDate, endDate]);

    const data = revenues.map((revenue) => {
        return {
            type: dayjs(revenue.date).format("MM/DD"),
            sales: revenue.total_price,
        }
    }).reverse();

    // const data = [
    //     {
    //         type: '19/11',
    //         sales: 1020000,
    //     },
    //     {
    //         type: '20/11',
    //         sales: 2090000,
    //     },
    //     {
    //         type: '21/11',
    //         sales: 340000,
    //     },
    //     {
    //         type: '22/11',
    //         sales: 503000,
    //     },
    //     {
    //         type: '23/11',
    //         sales: 800000,
    //     },
    //     {
    //         type: '24/11',
    //         sales: 0,
    //     },
    //     {
    //         type: '25/11',
    //         sales: 0,
    //     },
    //     {
    //         type: '26/11',
    //         sales: 200000,
    //     },
    // ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'doanh thu',
            },
            sales: {
                alias: 'doanh thu',
            },
        },
    };

    const onChange = (value) => {
        setStartDate(formatDate(value[0]));
        setEndDate(formatDate(value[1]));
    }

    return (
        <>
            <div className='flex justify-between items-center mb-6'>
                <span className='font-semibold text-base'>Thống kê doanh thu</span>
                <RangePicker
                    placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                    onChange={onChange}
                />
            </div>
            <Column {...config} />
        </>
    )
}

export default ColumnData;
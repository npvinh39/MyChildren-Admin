import React from 'react';
import { Column } from '@ant-design/plots';


export const ColumnData = () => {
    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const data = [
        {
            type: '19/11',
            sales: 1020000,
        },
        {
            type: '20/11',
            sales: 2090000,
        },
        {
            type: '21/11',
            sales: 340000,
        },
        {
            type: '22/11',
            sales: 503000,
        },
        {
            type: '23/11',
            sales: 800000,
        },
        {
            type: '24/11',
            sales: 0,
        },
        {
            type: '25/11',
            sales: 0,
        },
        {
            type: '26/11',
            sales: 200000,
        },
    ];
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

    return (
        <Column {...config} />
    )
}

export default ColumnData;
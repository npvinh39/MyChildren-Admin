import React from 'react';
import { Pie } from '@ant-design/plots';


export const PieData = () => {
    const data = [
        {
            type: 'sẩn phẩm 01',
            value: 27,
        },
        {
            type: 'sản phẩm 02',
            value: 25,
        },
        {
            type: 'sản phẩm 03',
            value: 18,
        },
        {
            type: 'sản phẩm 04',
            value: 15,
        },
        {
            type: 'sản phẩm 05',
            value: 10,
        },
        {
            type: 'sản phẩm 06',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    return <Pie {...config} />;
};

export default PieData;
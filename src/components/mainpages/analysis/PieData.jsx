import React, { useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/product/path-api';


export const PieData = () => {
    const dispatch = useDispatch();
    const { selectProducts } = useSelector(state => state.product);
    console.log("selectProducts", selectProducts)

    useEffect(() => {
        dispatch(fetchProducts({ currentPage: 1, pageSize: 10, sort: '-sold' }));
    }, [dispatch]);

    const data = selectProducts.map((product) => {
        return {
            type: product.name,
            value: product.sold,
        }
    });

    // const data = [
    //     {
    //         type: 'sẩn phẩm 01',
    //         value: 27,
    //     },
    //     {
    //         type: 'sản phẩm 02',
    //         value: 25,
    //     },
    //     {
    //         type: 'sản phẩm 03',
    //         value: 18,
    //     },
    //     {
    //         type: 'sản phẩm 04',
    //         value: 15,
    //     },
    //     {
    //         type: 'sản phẩm 05',
    //         value: 10,
    //     },
    //     {
    //         type: 'sản phẩm 06',
    //         value: 5,
    //     },
    // ];
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
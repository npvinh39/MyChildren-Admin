import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWarehouse } from '../../../features/warehouse/path-api';
import { Descriptions, Table } from 'antd';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs'

export const Warehouse = () => {
    const id = useParams();
    const dispatch = useDispatch();
    const { warehouse } = useSelector(state => state.warehouse);



    useEffect(() => {
        dispatch(fetchWarehouse(id));
    }, [dispatch]);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index'
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];

    const items = [
        {
            key: "1",
            label: "Loại kho",
            children: warehouse?.type,
            span: 2,
        },
        {
            key: "2",
            label: "Thời gian",
            children: dayjs(warehouse?.importDate).format("HH:mm:ss DD/MM/YYYY"),

        },
        {
            key: "3",
            label: "Số lượng sản phẩm",
            children: warehouse?.products.length,
            span: 2,
        },
        {
            key: "4",
            label: "Số lượng tổng",
            children: warehouse?.products.map(product => product.quantity).reduce((a, b) => a + b, 0),
        },
        {
            key: "5",
            label: "Sản phẩm",
            span: 3,
            children: (
                <Table
                    columns={columns}
                    pagination={false}
                    dataSource={warehouse?.products.map((product, index) => {
                        return {
                            key: index,
                            index: index + 1,
                            name: product.product_name,
                            quantity: product.quantity,
                        }
                    })}
                />

            )
        },
    ];

    return (
        <div className="warehouse">
            <Descriptions bordered items={items} />
        </div>
    );
}

export default Warehouse;
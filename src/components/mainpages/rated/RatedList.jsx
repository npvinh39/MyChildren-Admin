import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRateds, updateRated, deleteRated } from '../../../features/rated/path-api';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { Table, Badge, Pagination, Spin, Rate, Button, Select, Popconfirm } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';

export const RatedList = () => {
    const dispatch = useDispatch();
    const { rateds, pageSize, currentPage, totalPages, loading } = useSelector(state => state.rated);
    const total = totalPages * pageSize;

    const formatDate = (date) => {
        return dayjs(date).format("HH:mm:ss DD/MM/YYYY");
    };

    React.useEffect(() => {
        dispatch(fetchRateds({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);





    const [data, setData] = React.useState([]);
    useEffect(() => {
        const result = rateds.map((rated, index) => {
            return {
                index: -(- (currentPage - 1) * pageSize - (index + 1)),
                id: rated._id,
                key: rated._id,
                name: rated.name,
                date: formatDate(rated.date),
                status: rated.status,
                rating: rated.rating,
                comment: rated.comment,
                edit: false
            }
        });
        setData(result);
    }, [rateds]);

    const [selectStatus, setSelectStatus] = React.useState(0);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, item) => {
                return (
                    <div className='flex justify-around items-center'>
                        {
                            !item.edit ? (

                                <div>
                                    {item.status === 0 ?
                                        <Badge status='processing' text='Chờ duyệt' />
                                        :
                                        item.status === 1 ?
                                            <Badge status='success' text='Đã duyệt' />
                                            :
                                            <Badge status='error' text='Đã từ chối' />}
                                </div>
                            ) : (
                                <Select
                                    defaultValue={item.status}
                                    onChange={(value) => {
                                        setSelectStatus(value);
                                    }}
                                >
                                    <Option value={0}>Chờ duyệt</Option>
                                    <Option value={1}>Đã duyệt</Option>
                                    <Option value={2}>Đã từ chối</Option>
                                </Select>
                            )
                        }
                        <Button
                            onClick={async () => {
                                try {
                                    if (item.edit) {
                                        const result = await dispatch(updateRated({ ...item, status: selectStatus }));

                                        const payload = await unwrapResult(result);
                                        const newData = [...data];
                                        const index = newData.findIndex((i) => i.key === item.key);
                                        const items = newData[index];
                                        newData.splice(index, 1, {
                                            ...items,
                                            status: payload.data.status,
                                            edit: !item.edit,
                                        });
                                        setData(newData);
                                    }
                                    else {
                                        const newData = [...data];
                                        const index = newData.findIndex((i) => i.key === item.key);
                                        const items = newData[index];
                                        newData.splice(index, 1, {
                                            ...items,
                                            edit: !item.edit,
                                        });
                                        setData(newData);
                                    }
                                } catch (error) {
                                    console.log('error', error)
                                }
                            }}
                        >
                            {item.edit ? 'Xác nhận' : 'Cập nhật'}
                        </Button>
                    </div>
                )
            },
        },

        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (
                <Rate disabled defaultValue={rating} />
            ),
        },

        {
            title: 'Bình luận',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            render: (_, item) => {
                return (
                    <div className='flex justify-around items-center'>
                        <Popconfirm
                            title='Bạn có chắc chắn muốn xóa?'
                            onConfirm={() => {
                                dispatch(deleteRated(item.id));
                            }}
                            okText='Xóa'
                            cancelText='Hủy'
                        >
                            <Button
                                type='primary'
                                danger
                                ghost
                            >Xóa</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }

    ];

    return (
        <div>
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{
                        total: total,
                        pageSize: pageSize,
                        current: currentPage,
                        onChange: (page, pageSize) => {
                            dispatch(fetchRateds({ currentPage: page, pageSize }));
                        },

                    }}
                />
            </Spin>
        </div>
    );
}

export default RatedList;
import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Table, Button, Space, Input, Pagination, Spin, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, updateContact } from '../../../features/contact/path-api';

export const ContactList = () => {
    const dispatch = useDispatch();
    const { contacts, pageSize, currentPage, totalPages, loading } = useSelector(state => state.contact);
    const total = totalPages * pageSize;

    const formatDate = (date) => {
        return dayjs(date).format("HH:mm:ss DD/MM/YYYY");
    };

    React.useEffect(() => {
        dispatch(fetchContacts({ currentPage, pageSize }));
    }, [dispatch, pageSize, currentPage]);

    const data = contacts.map((contact, index) => {
        return {
            index: -(- (currentPage - 1) * pageSize - (index + 1)),
            id: contact._id,
            key: contact._id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            status: contact.status,
            content: contact.content,
            created_at: formatDate(contact.created_at),
        }
    });

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },

        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return (
                    <div className='flex justify-around items-center'>
                        {
                            // checkbox
                            <Checkbox
                                onChange={(e) => {
                                    dispatch(updateContact({ id: record.id, status: e.target.checked ? 'resolved' : 'pending' }));
                                }}
                                checked={record.status === 'resolved' ? true : false}
                            //
                            >
                                {record.status === 'resolved' ? 'Đã xử lý' : 'Chưa xử lý'}
                            </Checkbox>
                        }
                    </div>
                )
            }
        },

        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            key: 'created_at',
        },

        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/admin/contacts/${record.id}`}>
                        <Button type="primary">Xem</Button>
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div className="warehouse-list">
            <div className="warehouse-list__header">
                <h2 className="warehouse-list__title">Danh sách liên hệ</h2>
                {/* <Link to="/admin/contacts/add">
                    <Button type="primary">Thêm liên hệ</Button>
                </Link> */}
            </div>
            <div className="warehouse-list__body">
                <Spin spinning={loading}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                    />
                </Spin>
            </div>
            <div className="warehouse-list__footer">
                <Pagination
                    style={{ marginTop: 16, textAlign: "right" }}
                    defaultCurrent={1}
                    total={total}
                    pageSize={pageSize}
                    current={currentPage}
                    onChange={(page, pageSize) => dispatch(fetchContacts({ currentPage: page, pageSize }))}
                />
            </div>
        </div>
    );
}

export default ContactList;
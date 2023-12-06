import React from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Descriptions, Badge } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../features/user/path-api';


export const User = () => {
    const dispatch = useDispatch();
    const id = useParams();
    const { user } = useSelector(state => state.user);

    const formatDate = (date) => {
        return dayjs(date).format("HH:mm:ss DD/MM/YYYY");
    };

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    React.useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch]);

    const items = [
        {
            key: '1',
            label: 'Họ',
            children: user?.last_name,
        },
        {
            key: '2',
            label: 'Tên',
            children: user?.first_name,
        },
        {
            key: '3',
            label: 'Trạng thái',
            children: <Badge status={user?.status ? 'success' : 'error'} text={user?.status ? 'Đang hoạt động' : 'Đã khóa'} />,
        },
        {
            key: '4',
            label: 'Email',
            children: user?.email,
            span: 2,
        },
        {
            key: '5',
            label: 'Số điện thoại',
            children: user?.phone,
        },
        {
            key: '6',
            label: 'Số tiền đã chi',
            children: VND.format(user?.spending),
        },
        {
            key: '7',
            label: 'Thời gian tạo',
            children: formatDate(user?.createdAt),
        },
        {
            key: '7',
            label: 'Cập nhật gần nhất',
            children: formatDate(user?.createdAt),
        },
        {
            key: '8',
            label: 'Địa chỉ',
            span: 3,
            children: (
                <>
                    {
                        user?.address?.map((address, index) => (
                            <p key={index}>
                                {address.number_street},{address.ward}, {address.district}, {address.province}
                            </p>
                        ))
                    }
                </>
            )
        }
    ];

    return (
        <div className="user">
            <div className="user__header">
                <div className="flex justify-between items-center">
                    <h2>
                        Thông tin người dùng
                    </h2>
                    <Link to="/profile/edit">
                        <Button type="link">Quay lại</Button>
                    </Link>
                </div>
            </div>
            <div className="user__body">
                <Descriptions bordered items={items} />
            </div>
        </div>
    )
}

export default User;

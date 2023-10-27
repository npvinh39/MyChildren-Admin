import React, { useLayoutEffect, useState } from 'react';
import {
    ShoppingOutlined,
    PieChartOutlined,
    IdcardOutlined,
    UserOutlined,
    LogoutOutlined,
    DollarOutlined,
    ContactsOutlined,
    CommentOutlined,
    TagsOutlined,
    HomeOutlined,
    InboxOutlined,
    PercentageOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../../features/login/path-api';
import { Link, useNavigate } from 'react-router-dom';
import Pages from '../Pages';
import Cookies from 'js-cookie';
import { Login, Breadcrumb } from '../';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Tổng quan', '1', <Link to='/'><PieChartOutlined /></Link>),
    getItem('Sản phẩm', '2', <Link to='/products'><ShoppingOutlined /></Link>),
    getItem('Danh mục', '3', <Link to='/categories'><TagsOutlined /></Link>),
    getItem('Khuyến mãi', '4', <Link to='/promotions'><PercentageOutlined /></Link>),
    getItem('Đơn hàng', '5', <Link to='/orders'><InboxOutlined /></Link>),
    getItem('Người dùng', '6', <Link to='/users'><UserOutlined /></Link>),
    getItem('Quản trị viên', '7', <Link to='/admin'><IdcardOutlined /></Link>),
    getItem('Quản lý kho', '8', <Link to='/warehouses'><HomeOutlined /></Link>),
    getItem('Doanh thu', '9', <Link to='/revenues'><DollarOutlined /></Link>),
    getItem('Đánh giá', '10', <Link to='/rated'><CommentOutlined /></Link>),
    getItem('Danh sách liên hệ', '11', <Link to='/contact'><ContactsOutlined /></Link>),
];

const access_Token = Cookies.get('accessToken')

export const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const [modalText, setModalText] = useState('Bạn có chắc chắn muốn đăng xuất?');
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // Modal logout
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        setModalText('Đang đăng xuất...');
        setConfirmLoading(true);
        await dispatch(onLogout());
        navigate('/login');
        setOpen(false);
        setConfirmLoading(false);
        setModalText('Bạn có chắc chắn muốn đăng xuất?');
    };
    const handleCancel = () => {
        setOpen(false);
    };

    // check login state if not login redirect to login page
    const loginSelector = useSelector((state) => state.login)
    useLayoutEffect(() => {

        if (!access_Token) {
            navigate('/login')
        }
    }, [loginSelector.isAuth])
    if (!loginSelector.isAuth) return <Login />;

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                {collapsed ?
                    <div className='flex justify-center items-center h-16'>
                        <h1 className='text-white text-2xl'>MC</h1>
                    </div>
                    :
                    <div className='flex justify-center items-center h-16'>
                        <h1 className='text-white text-2xl'>My Children</h1>
                    </div>
                }

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className='flex justify-end items-center h-full px-5'>
                        <Button
                            className='text-base cursor-pointer'
                            onClick={showModal}
                        >
                            <LogoutOutlined
                                className='pr-2'
                            />
                            Đăng xuất
                        </Button>
                        <Modal
                            title="Bạn chắc chứ"
                            open={open}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                            okText="Đăng xuất"
                            cancelText="Hủy"
                        >
                            <p>{modalText}</p>
                        </Modal>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 500,
                            background: colorBgContainer,
                        }}
                    >
                        <Pages />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    My Children ©2023 Created by npvinh39
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Dashboard;
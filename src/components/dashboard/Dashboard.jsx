import React, { useLayoutEffect, useState, useEffect } from 'react';
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
import { Layout, Menu, theme, Button, Modal, message, Avatar, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../../features/login/path-api';
import { Link, useNavigate } from 'react-router-dom';
import Pages from '../Pages';
import Cookies from 'js-cookie';
import { Login, Breadcrumb } from '../';
import { CallBox } from '../';

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
    getItem('Quản trị viên', '7', <Link to='/admins'><IdcardOutlined /></Link>),
    getItem('Quản lý kho', '8', <Link to='/warehouses'><HomeOutlined /></Link>),
    getItem('Doanh thu', '9', <Link to='/revenues'><DollarOutlined /></Link>),
    getItem('Đánh giá', '10', <Link to='/rated'><CommentOutlined /></Link>),
    getItem('Danh sách liên hệ', '11', <Link to='/contacts'><ContactsOutlined /></Link>),
];

const access_Token = Cookies.get('accessToken')

export const Dashboard = () => {
    const location = window.location.pathname;
    const params = location.split('/');
    const page = params[1];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
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

    // check params to set selectedKey
    useEffect(() => {
        switch (page) {
            case '':
                setSelectedKey('1');
                break;
            case 'products':
                setSelectedKey('2');
                break;
            case 'categories':
                setSelectedKey('3');
                break;
            case 'promotions':
                setSelectedKey('4');
                break;
            case 'orders':
                setSelectedKey('5');
                break;
            case 'users':
                setSelectedKey('6');
                break;
            case 'admins':
                setSelectedKey('7');
                break;
            case 'warehouses':
                setSelectedKey('8');
                break;
            case 'revenues':
                setSelectedKey('9');
                break;
            case 'rated':
                setSelectedKey('10');
                break;
            case 'contacts':
                setSelectedKey('11');
                break;
            default:
                setSelectedKey(null);
                break;
        }
    }, [page]);

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

                <Menu theme="dark" defaultSelectedKeys={[selectedKey]} selectedKeys={[selectedKey]} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className='flex justify-end items-center h-full px-5'>
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '1',
                                        label: 'Thông tin tài khoản',
                                        icon: <UserOutlined />,
                                        onClick: () => {
                                            message.info('Thông tin tài khoản');
                                        },
                                    },
                                    {
                                        key: '2',
                                        label: 'Đăng xuất',
                                        icon: <LogoutOutlined />,
                                        onClick: () => {
                                            showModal();
                                        },
                                    },
                                ],
                            }}
                            placement="bottomRight"
                        >
                            <Avatar
                                style={{
                                    backgroundColor: '#87d068',
                                }}
                                icon={<UserOutlined />}
                            />
                        </Dropdown>
                        {/* <Button
                            className='text-base cursor-pointer'
                            onClick={showModal}
                        >
                            <LogoutOutlined
                                className='pr-2'
                            />
                            Đăng xuất
                        </Button> */}
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
            <CallBox />
        </Layout>
    );
};
export default Dashboard;
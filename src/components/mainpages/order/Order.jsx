import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../../features/order/path-api";
import { fetchProductOrder } from "../../../features/product/path-api";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Card, Descriptions, Badge } from "antd";
const { Meta } = Card;

export const Order = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);
    const { productsOrder } = useSelector((state) => state.product);
    const formatDate = (date) => {
        return dayjs(date).format("HH:mm:ss DD/MM/YYYY");
    };

    const VND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });


    React.useEffect(() => {
        if (id) {
            dispatch(fetchOrder(id));
        }
    }, [dispatch, id]);

    // get products from order
    React.useEffect(() => {
        if (order?.products) {
            order?.products.map(async (product) => {
                await dispatch(fetchProductOrder(product));
            });
        }
    }, [dispatch, order?.products]);

    const items = [
        {
            key: "1",
            label: "Tên khách hàng",
            children: order?.customer,
        },
        {
            key: "2",
            label: "Số điện thoại",
            children: order?.phone,
        },
        {
            key: "3",
            label: "Email",
            children: order?.email,
        },
        {
            key: "4",
            label: "Địa chỉ",
            children: order?.address,
        },
        {
            key: "5",
            label: "Ngày tạo",
            children: formatDate(order?.createdAt),
        },
        {
            key: "6",
            label: "Ngày cập nhật",
            children: formatDate(order?.updatedAt),
        },
        {
            key: "7",
            label: "Trạng thái đơn",
            children: (
                order?.status === "Đã hủy" ? <Badge status="error" text={order?.status} /> :
                    order?.status === "Đã xác nhận" ? <Badge status="processing" text={order?.status} /> :
                        order?.status === "Đang xử lý" ? <Badge status="processing" text={order?.status} /> :
                            order?.status === "Đang giao hàng" ? <Badge status="processing" text={order?.status} /> :
                                order?.status === "Đã giao hàng" ? <Badge status="success" text={order?.status} /> :
                                    <Badge status="default" text={order?.status} />
            ),
        },
        {
            key: "8",
            label: "Tạm tính",
            children: VND.format(order?.total_amount),
        },
        {
            key: "9",
            label: "Phí ship",
            children: VND.format(order?.shipping),
        },
        {
            key: "10",
            label: "Giảm giá",
            children: VND.format(order?.discount * order?.total_amount),
        },
        {
            key: "11",
            label: "Tổng tiền",
            children: VND.format(order?.final_total),
        },
        {
            key: "12",
            label: "Hình thức vận chuyển",
            children: order?.delivery_method,
        },
        {
            key: "13",
            label: "Hình thức thanh toán",
            children: order?.payment_method,
        },
        {
            key: "14",
            label: "Trạng thái thanh toán",
            children: order?.payment_status,
        }
    ];

    return (
        <div>
            <Link to="/admin/orders">Quay lại</Link>
            {/* <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={order?.image} />}
            >
                <Meta title={order?.name} description={order?.description} />
            </Card> */}
            <Descriptions title="Thông tin đơn hàng" bordered>
                {items.map((item) => (
                    <Descriptions.Item label={item.label} key={item.key}>
                        {item.children}
                    </Descriptions.Item>
                ))}
            </Descriptions>
            <h4>Sản phẩm</h4>
            <div className="grid grid-cols-12 gap-3">
                {productsOrder?.map((product, index) => (
                    <Card
                        className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 overflow-hidden shadow-lg"
                        key={index}
                        hoverable
                        cover={<img alt="example" src={product.images[0].url} />}
                    >
                        <Meta
                            title={product.name}
                            description={`Số lượng: ${product.quantity}`}
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Order;
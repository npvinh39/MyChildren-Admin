import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Select, Table } from 'antd';
import { fetchProducts, fetchProduct } from '../../../features/product/path-api';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {

    const { selectProducts, product, loading } = useSelector(state => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts({ currentPage: 1, pageSize: 1000 }));
    }, [dispatch]);
    const options = selectProducts.map(product => ({
        value: product._id,
        label: product.name,
    }));
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            console.log('values', values)

            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            dataIndex === 'product_id' ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
                    <Select
                        ref={inputRef}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                save();
                            }
                        }}
                        onChange={save}
                    >
                        {options.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>) : (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    {/* <Input ref={inputRef} onPressEnter={save} onBlur={save} /> */}
                    <InputNumber min={1} max={1000} defaultValue={1} ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            )
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {
                    dataIndex === 'product_id' ? (
                        // console.log('record', children)

                        children[1] !== 'Chọn sản phẩm' ? selectProducts.map(product => { if (product._id === record.product_id) return product.name }) : children
                    ) : (
                        children
                    )
                }
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
export const WarehouseInOut = () => {
    const [dataSource, setDataSource] = useState([]);
    console.log(dataSource)
    const [count, setCount] = useState(0);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product_id',
            width: '30%',
            editable: true,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            editable: true,
        },
        {
            title: 'Hành động',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Bạn chắc muốn xóa hàng này?" onConfirm={() => handleDelete(record.key)}>
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleAdd = () => {
        const newData = {
            key: count,
            product_id: `Chọn sản phẩm`,
            quantity: 1,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div>
            <div className='flex justify-between'>
                <Button
                    onClick={handleAdd}
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Thêm sản phẩm
                </Button>
                <Button
                    type="primary"
                >
                    Lưu
                </Button>
            </div>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
};
export default WarehouseInOut;
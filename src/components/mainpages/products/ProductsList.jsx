import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsWithDescription } from '../../../features/product/path-api';
import { fetchCategories } from '../../../features/category/path-api';
import { ProductItem } from './ProductItem';
import { Empty, Skeleton, Pagination, Button } from 'antd';

export const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, currentPage, pageSize, totalPages } = useSelector(state => state.product);
    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProductsWithDescription({ currentPage, pageSize }));
        }
        dispatch(fetchCategories());
    }, [dispatch, currentPage, pageSize]);


    const handlePageChange = (page, pageSize) => {
        dispatch(fetchProductsWithDescription({ currentPage: page, pageSize }));
    };

    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className=''>Tất cả sản phẩm</h1>
                <Link to='/products/create'>
                    <Button type="primary">+ Thêm mới</Button>
                </Link>
            </div>
            {loading ? <Skeleton active /> :
                products.length === 0 ? <Empty description={"Không có dữ liệu"} /> :
                    <>
                        <div className='grid grid-cols-12 gap-3'>
                            {products.map(product => {
                                const category = categories.find(category => category._id === product.category_id);
                                return (
                                    <ProductItem
                                        key={product._id}
                                        {...product}
                                        category={category}
                                    />
                                );
                            })}
                        </div>
                        <Pagination
                            className='mt-5 flex justify-center'
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalPages}
                            onChange={handlePageChange}
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                        />
                    </>
            }
        </div>
    );
};

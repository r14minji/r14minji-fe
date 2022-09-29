import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

import axios from 'axios';
import { useQuery } from 'react-query';
import { IProductsGet, Product } from '../types/product';
import HeaderComponent from '../components/common/Header';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(1);
  //console.log('page', page);

  const productsGet = async () => {
    try {
      const res: IProductsGet = await axios
        .get(`/products?page=${currentPage}&size=10`)
        .then((res) => res.data);
      console.log('Status 200');
      return res;
    } catch (err) {
      console.log('error');
    }
  };
  const { data: resResult, refetch } = useQuery([currentPage], productsGet, {
    enabled: page != null,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log('Status 200', data);
    },
    onError: () => {
      console.error('error!');
    },
  });

  console.log('resResult', resResult);
  const totalCount = resResult?.data.totalCount;
  const products = resResult?.data.products;
  let lastPage: number = Math.ceil((totalCount as number) / 10);

  // useEffect(() => {
  //   setCurrentPage(Number(page));
  // }, [page]);

  return (
    <>
      <HeaderComponent />
      <Container>
        <ProductList products={products as Product[]} />
        <Pagination totalCount={totalCount} setCurrentPage={setCurrentPage} lastPage={lastPage} />
      </Container>
    </>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const NoList = styled.div`
  text-align: center;
  padding: 100px 20px;
`;

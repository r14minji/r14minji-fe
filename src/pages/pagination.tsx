import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

import axios from 'axios';
import { useQuery } from 'react-query';
import { Product } from '../types/product';
import HeaderComponent from '../components/common/Header';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  //const [page, setPage] = useState(page);

  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = async () => {
    try {
      const res = await axios.get(`/products?page=${currentPage}&size=10`);
      console.log('Status 200');
      return res;
    } catch (err) {
      console.log('error');
    }
  };
  const { data: resResult, refetch } = useQuery([currentPage], getProducts, {
    //enabled: page != null,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log('Status 200', data);
    },
    onError: () => {
      console.error('error!');
    },
  });

  const totalCount: number = resResult?.data.data.totalCount;
  const products: Product[] = resResult?.data.data.products;

  return (
    <>
      <HeaderComponent />
      <Container>
        <ProductList products={products} />
        <Pagination totalCount={totalCount} setCurrentPage={setCurrentPage} />
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

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

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

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
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Container>
        <ProductList products={products} />
        <Pagination totalCount={totalCount} setCurrentPage={setCurrentPage} />
      </Container>
    </>
  );
};

export default PaginationPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

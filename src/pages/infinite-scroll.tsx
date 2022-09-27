import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import HeaderComponent from '../components/common/Header';
import useScrollPos from '../components/hooks/useScrollPos';

const InfiniteScrollPage: NextPage = () => {
  const observerRef = useRef<IntersectionObserver>();
  const [intersecting, setIntersecting] = useState<boolean>(false);
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const [list, setLists] = useState<any>([]);
  // const { loadPos } = useScrollPos();
  // loadPos();

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        console.log(entries);
        setIntersecting(entries[0]?.isIntersecting);
      });
    }
    return observerRef.current;
  }, [observerRef.current]);

  useEffect(() => {
    if (fetchMoreRef.current) getObserver().observe(fetchMoreRef.current);
  }, [fetchMoreRef.current]);

  const getProductList = async (pageParam: number) => {
    const res = await axios.get(`/products?page=${pageParam}&size=16`);
    const { products, totalCount } = res.data.data;
    const totalLength = Math.ceil(totalCount / 16);
    const nextPage = pageParam < totalLength ? pageParam + 1 : undefined;
    return { products, nextPage, isLast: !nextPage };
  };

  const { data, isSuccess, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['productList'],
    ({ pageParam = 1 }) => getProductList(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    }
  );

  useEffect(() => {
    console.log('data', data);
    if (data) {
      const items = data.pages
        .map((page) => page.products.map((product: any) => (product !== null ? product : [])))
        .flat();
      //console.log('items', items);
      setLists(items);
    }
  }, [data]);

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [intersecting]);

  return (
    <>
      <HeaderComponent />
      <Container>
        <ProductList products={list || []} />
        <div ref={fetchMoreRef} />
      </Container>
      {/* <button onClick={() => fetchNextPage()}>더 불러오기</button> */}
    </>
  );
};

export default InfiniteScrollPage;

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

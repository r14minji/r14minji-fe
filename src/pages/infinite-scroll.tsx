import type { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import HeaderComponent from '../components/common/Header';
import { IProductsGet, Product } from '../types/product';

const InfiniteScrollPage: NextPage = () => {
  const observerRef = useRef<IntersectionObserver>();
  const [intersecting, setIntersecting] = useState<boolean>(false);
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const [list, setLists] = useState<any>([]);

  //저장된 스크롤 위치로 이동
  useEffect(() => {
    const scroll = sessionStorage.getItem('productScroll');
    if (scroll != null) window.scrollTo(0, parseInt(scroll));
  });

  //페이지의 마지막 아이템 체크
  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        console.log(entries);
        setIntersecting(entries[0]?.isIntersecting);
      });
    }
    return observerRef.current;
  }, []);

  useEffect(() => {
    if (fetchMoreRef.current) getObserver().observe(fetchMoreRef.current);
  }, [getObserver]);

  //목록 가지고 오기
  const getProductList = async (pageParam: number) => {
    const res: IProductsGet = await axios
      .get(`/products?page=${pageParam}&size=16`)
      .then((res) => res.data);
    const { products, totalCount } = res.data;
    const totalLength = Math.ceil((totalCount as number) / 16);
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
        .map((page) => page.products.map((product: Product) => (product !== null ? product : [])))
        .flat();
      console.log('items', items);
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

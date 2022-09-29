import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import products from '../../api/data/products.json';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from 'react-query';
import { IProducts_ProductId_Get, Product } from '../../types/product';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: resResualt } = useQuery(
    [id],
    async () => {
      const res = await axios.get(`/products/${id}`); //타입추가하면 아래에서 에러
      console.log('Status 200');
      return res;
    },
    {
      refetchOnWindowFocus: false,
      enabled: id != null,
      onSuccess: (data) => {
        console.log('Status 200', data);
      },
      onError: () => {
        console.error('error!');
      },
    }
  );

  const product: Product = resResualt?.data.data.product;

  const changePrice = (price: number) => {
    const priceNum: number = price;
    const chagePirceNum: string = priceNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return chagePirceNum;
  };

  useEffect(() => {
    if (id === undefined) return;
  }, [id]);

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
      {product ? (
        <>
          <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
          <ProductInfoWrapper>
            <Name>{product.name}</Name>
            <Price>{changePrice(product.price)}원</Price>
          </ProductInfoWrapper>
        </>
      ) : (
        <NoList>존재하지 않는 상품입니다.</NoList>
      )}
    </>
  );
};

export default ProductDetailPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

const NoList = styled.div`
  text-align: center;
  padding: 100px 20px;
`;

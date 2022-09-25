import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import products from '../../api/data/products.json';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Product } from '../../types/product';

const ProductDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: resResualt } = useQuery(
    [id],
    async () => {
      const res = await axios.get(`/products/${id}`);
      console.log('Status 200');
      return res;
    },
    {
      refetchOnWindowFocus: false,
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
    const priceNum = price;
    const chagePirceNum = priceNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return chagePirceNum;
  };

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
        <NoProduct>존재하지 않는 상품입니다.</NoProduct>
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

const NoProduct = styled.div`
  text-align: center;
  padding: 100px 20px;
`;

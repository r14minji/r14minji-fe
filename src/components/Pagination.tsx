import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { KeyObject } from 'crypto';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Pagination = (props: any) => {
  let lastPage: number = Math.ceil(props.totalCount / 10);
  const [startPage, setStartPage] = useState<number>(1);
  const [active, setActive] = useState<string>('1');
  const router = useRouter();

  const onClickPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActive(event.currentTarget.id);
    props.setCurrentPage?.(event.currentTarget.id);
  };

  const onClickPrevPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStartPage(startPage - 5);
    setActive(event.currentTarget.id);
    props.setCurrentPage?.(event.currentTarget.id);
  };

  const onClickNextPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStartPage(startPage + 5);
    setActive(event.currentTarget.id);
    props.setCurrentPage?.(event.currentTarget.id);
  };

  const selectedCheck = () => {
    let checkNumber = Number(active) % 5;
    if (checkNumber !== 0) return checkNumber;
    if (checkNumber === 0) return 5 * (Number(active) / 5);
  };

  return (
    <Container>
      <Button disabled={startPage === 1} onClick={onClickPrevPage} id={`${startPage - 5}`}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {new Array(5).fill(1).map((_, i) => {
          return (
            <>
              {i + startPage <= lastPage ? (
                <Page
                  key={'num' + i}
                  selected={i === 1}
                  disabled={i === i + startPage}
                  onClick={onClickPage}
                  id={`${i + startPage}`}
                  aria-current={i === i + startPage}
                >
                  {i + startPage}
                </Page>
              ) : null}
            </>
          );
        })}
      </PageWrapper>
      <Button disabled={startPage + 5 > lastPage} onClick={onClickNextPage} id={`${startPage + 5}`}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;

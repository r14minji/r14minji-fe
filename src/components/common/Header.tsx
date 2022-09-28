import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAppSelector } from '../../store/configureStore.hooks';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, userValue } from '../../store/modules/user';
import { useRouter } from 'next/router';

function HeaderComponent() {
  const user: userValue = useAppSelector((state) => state.persistedReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const IsLogout = () => {
    dispatch(clearUser(user));
  };

  return (
    <Header>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      {user.id !== '' ? (
        <>
          <Container>
            <div>{user.name}</div>
            <Link href='/'>
              <LogoutButton onClick={() => IsLogout()}>logout</LogoutButton>
            </Link>
          </Container>
        </>
      ) : (
        <Link href='/login'>
          <p>login</p>
        </Link>
      )}
    </Header>
  );
}

export default HeaderComponent;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.button`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LogoutButton = styled.button`
  text-align: right;
`;

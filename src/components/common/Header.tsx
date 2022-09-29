import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAppSelector } from '../../store/configureStore.hooks';
import { useDispatch } from 'react-redux';
import { clearUser, userValue } from '../../store/modules/user';

function HeaderComponent() {
  const user: userValue = useAppSelector((state) => state.persistedReducer.userSlice);
  const dispatch = useDispatch();

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

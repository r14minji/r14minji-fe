import type { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/modules/user';
import HeaderComponent from '../components/common/Header';
import { LoninInfo, User } from '../types/product';

const LoginPage: NextPage = (props) => {
  const [userId, setUserID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errUserId, setErrUserId] = useState<boolean>(false);
  const [errPassword, setErrPassword] = useState<boolean>(false);
  const [disable, setDisabled] = useState<boolean>(true);
  const [validUserId, setValidUserId] = useState<boolean>(false);
  const [validPassWord, setValidPassWord] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onChangeUserId = (event: React.FormEvent<HTMLInputElement>) => {
    let valueUserId: string = event.currentTarget.value;
    const checkUserId: RegExp = /^[A-Za-z0-9]{5,30}$/;
    if (checkUserId.test(valueUserId)) {
      setErrUserId(false);
      setValidUserId(true);
    }
    setUserID(valueUserId);
  };

  const onBlurUserId = (event: React.FormEvent<HTMLInputElement>) => {
    let valueUserId: string = event.currentTarget.value;
    const checkUserId: RegExp = /^[A-Za-z0-9]{5,30}$/;
    !valueUserId || checkUserId.test(valueUserId) ? setErrUserId(false) : setErrUserId(true);
    setUserID(valueUserId);
  };

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    let valuePassword: string = event.currentTarget.value;
    const checkPassword: RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,30}$/;
    if (checkPassword.test(valuePassword)) {
      setErrPassword(false);
      setValidPassWord(true);
    }
    setPassword(valuePassword);
  };

  const onBlurPassword = (event: React.FormEvent<HTMLInputElement>) => {
    let valuePassword: string = event.currentTarget.value;
    const checkPassword: RegExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,30}$/;
    !valuePassword || checkPassword.test(valuePassword)
      ? setErrPassword(false)
      : setErrPassword(true);
    setPassword(valuePassword);
  };

  const checkValue = () => {
    validUserId && validPassWord ? setDisabled(false) : setDisabled(true);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log('id', userId);
    //console.log('password', password);

    let body: LoninInfo = {
      id: userId,
      password: password,
    };
    axios.post('/login', body).then((res) => {
      console.log(res);
      const code = res.status;
      if (code === 200) {
        const user: User = res.data.data.user;
        dispatch(loginUser(user));
        router.push('/');
      }
    });
  };

  return (
    <>
      <HeaderComponent />
      <Form onSubmit={onSubmitHandler}>
        <TextLabel htmlFor='userId'>아이디</TextLabel>
        <TextInput
          id='userId'
          type='text'
          value={userId}
          onChange={onChangeUserId}
          onBlur={onBlurUserId}
          onKeyUp={checkValue}
          isErr={errUserId}
        />
        {errUserId && <TextErr>올바른 아이디 형식으로 입력해주세요.</TextErr>}
        <TextLabel htmlFor='password'>비밀번호</TextLabel>
        <TextInput
          id='userId'
          type='password'
          value={password}
          onChange={onChangePassword}
          onBlur={onBlurPassword}
          onKeyUp={checkValue}
          isErr={errPassword}
        />
        {errPassword && <TextErr>올바른 비밀번호 형식으로 입력해주세요.</TextErr>}
        <LoginButton type='submit' disabled={disable}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const TextLabel = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
  margin-top: 16px;
`;

const TextInput = styled.input<{ isErr?: boolean }>`
  border: none;
  margin-top: 8px;
  padding: 16px;
  background: ${(props) => (props.isErr ? '#fdedee' : '#f7f7fa')};
  border-radius: 12px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #e2e2ea;
  }
`;

const TextErr = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;

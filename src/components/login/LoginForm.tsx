import React from 'react';
import styled from 'styled-components';
import useForm from './useForm';

function LoginForm() {
  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { userId: '', password: '' },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validate,
  });

  return (
    <Form onSubmit={onSubmitHandler}>
      <TextLabel htmlFor='userId'>아이디</TextLabel>
      {errUserId ? (
        <TextInput
          id='userId'
          //name='userId'
          type='text'
          value={name}
          onChange={onChangeUserId}
          onBlur={onBlurUserId}
          onKeyUp={checkValue}
          isErr
        />
      ) : (
        <TextInput
          id='userId'
          //name='userId'
          type='text'
          value={userId}
          onChange={onChangeUserId}
          onBlur={onBlurUserId}
          onKeyUp={checkValue}
        />
      )}
      {errUserId && <TextErr>올바른 아이디 형식으로 입력해주세요.</TextErr>}
      <TextLabel htmlFor='password'>비밀번호</TextLabel>
      {errPassword ? (
        <TextInput
          id='userId'
          //name='password'
          type='password'
          value={password}
          onChange={onChangePassword}
          onBlur={onBlurPassword}
          onKeyUp={checkValue}
          isErr
        />
      ) : (
        <TextInput
          id='userId'
          //name='password'
          type='password'
          value={password}
          onChange={onChangePassword}
          onBlur={onBlurPassword}
          onKeyUp={checkValue}
        />
      )}

      {errPassword && <TextErr>올바른 비밀번호 형식으로 입력해주세요.</TextErr>}
      <LoginButton type='submit' disabled={disable}>
        로그인
      </LoginButton>
    </Form>
  );
}

export default LoginForm;

const Form = styled.div`
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
  border: 1px solid #000;
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

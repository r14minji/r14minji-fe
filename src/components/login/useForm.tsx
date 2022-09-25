import { useEffect, useState } from 'react';

function useForm({ handleOnChange }) {
  const textInput = (event: any) => {
    const [inputs, setInputs] = useState({
      userId: '',
      password: '',
    });

    const { userId, password } = inputs; //구조분해할당을 통해 값 추출
  };

  const handleOnChange = (event) => {
    const { value, name } = event.target; // 타겟에서 네임과 벨류 추출
    setInputs({
      ...inputs, //기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 벨류로 설정
    });
  };

  return {
    handleOnChange,
  };
}

export default useForm;

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
//mport { useHistory } from 'react-router-dom';

export const userLogin = createAsyncThunk('user/login', async ({ id, password }) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post('/login', { id, password }, config);

    localStorage.setItem('userToken', data.userToken);

    const router = useRouter();
    router.push('/');
    return data;
  } catch (error) {
    console.log(error!);
  }
});

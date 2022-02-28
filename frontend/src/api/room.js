import axios from 'axios';
import appConfig from '../config';

export const createRoom = async ({ nickname, numberOfPlayers }) => {
  const res = await axios.post(
    `${appConfig.API_URL}/rooms/createRoom`,
    {
      nickname,
      numberOfPlayers,
    }
  );
  localStorage.setItem('roomId', res.data.roomId);
  localStorage.setItem('nickname', res.data.nickname);

  return res;
};

export const getRoom = async (id) => {
  const res = await axios.get(`${appConfig.API_URL}/rooms/getRoom`, {
    params: { id },
  });

  if (localStorage.getItem('roomId')) {
    localStorage.setItem('roomId', id);
  }

  return res;
};

export const createUser = async ({ nickname }) => {
  console.log(nickname);
  const res = await axios.post(
    `${appConfig.API_URL}/rooms/createUser`,
    {
      nickname,
    }
  );

  localStorage.setItem('roomId', res.data.roomId);
  localStorage.setItem('nickname', res.data.nickname);

  return res;
};

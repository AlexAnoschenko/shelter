import axios from 'axios';
import appConfig from '../config';

export const createRoom = (nickname) => {
  axios
    .post(`${appConfig.API_URL}/rooms/createRoom`, {
      nickname,
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem('roomId', res.data.roomId);
      localStorage.setItem('nickname', res.data.nickname);
    });
};

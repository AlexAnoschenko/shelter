import axios from 'axios';
import appConfig from '../config';

export const createRoom = ({ nickname, numberOfPlayers }) => {
  return axios
    .post(`${appConfig.API_URL}/rooms/createRoom`, {
      nickname,
      numberOfPlayers,
    })
    .then((res) => {
      localStorage.setItem('roomId', res.data.roomId);
      localStorage.setItem('nickname', res.data.nickname);
    });
};

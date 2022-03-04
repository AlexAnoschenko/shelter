import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { TelegramShareButton, TelegramIcon } from 'react-share';

import { socket } from '../../socket';
import Loader from '../../components/Loader/Loader';
import {
  addRoomAction,
  addNicknameAction,
} from '../../store/actions/roomActions';
import { getRoom } from '../../api/room';
import NewUserPage from '../NewUserPage/NewUserPage';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  title: {
    fontSize: '1.6rem',
  },
  subTitle: {
    fontSize: '1.6rem',
    color: '#c4ee0b',
  },
  tgIcon: {
    border: '2px solid white',
    borderColor: '#e0d01c',
    borderRadius: '50%',
    animation: `$tgAnim 2000ms infinite`,
  },
  '@keyframes tgAnim': {
    '0%': {
      boederColor: '#e0d01c',
    },
    '50%': {
      borderColor: '#8910ec',
    },
    '100%': {
      borderColor: '#e0d01c',
    },
  },
}));

const LobbyPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.room);
  const nickname = localStorage.getItem('nickname');

  if (room) {
    console.log(room);
  }

  const connectToWS = () => {
    socket.onopen = () => {
      console.log('FRONT SOCKET CONNECTED');
    };

    socket.onmessage = (event) => {
      console.log('MESSAGE', JSON.parse(event.data));
      addRoom(JSON.parse(event.data));
    };
  };

  connectToWS();

  const updateStoreRoom = () => {
    socket.send(
      JSON.stringify({
        method: 'updateRoom',
        id: room._id,
      })
    );
  };

  const getRoomIdFromLS = () => {
    return localStorage.getItem('roomId');
  };

  const addRoom = async (res) => {
    dispatch(addRoomAction(res));
  };

  const addNickname = async (res) => {
    dispatch(addNicknameAction(res));
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getRoom(props.match.params.id);
      addRoom(res.data);
    }

    addNickname(localStorage.getItem('nickname'));
    fetchData();
  }, []);

  return (
    <div className={classes.main}>
      <button onClick={updateStoreRoom}>GO</button>
      {nickname ? (
        <>
          <div className={classes.title}>Share Link</div>
          <div className={classes.subTitle}>Click!</div>
          <TelegramShareButton
            url={`http://localhost:3000/lobbyPage/${getRoomIdFromLS()}`}
          >
            <TelegramIcon
              size={256}
              round={true}
              className={classes.tgIcon}
            />
          </TelegramShareButton>
          <Loader />
          {room && (
            <div
              className={classes.title}
            >{`${room.users.length} from ${room.numberOfPlayers} joined`}</div>
          )}
        </>
      ) : (
        <NewUserPage updateStoreRoom={updateStoreRoom} />
      )}
    </div>
  );
};

export default LobbyPage;

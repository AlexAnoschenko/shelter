import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { TelegramShareButton, TelegramIcon } from 'react-share';

import Loader from '../../components/Loader/Loader';
import { addRoomAction } from '../../store/actions/roomActions';
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
  // const socket = new WebSocket('ws://localhost:5001/');

  // socket.onopen = () => {
  //   console.log('FRONT SOCKET CONNECTED');
  // };

  // socket.onmessage = (event) => {
  //   console.log('MESSAGE', event.data);
  // };

  const getRoomIdFromLS = () => {
    return localStorage.getItem('roomId');
  };

  const addRoom = async (res) => {
    dispatch(addRoomAction(res));
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getRoom(props.match.params.id);
      addRoom(res.data);
    }

    fetchData();
  }, []);

  return (
    <div className={classes.main}>
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
        <NewUserPage />
      )}
    </div>
  );
};

export default LobbyPage;

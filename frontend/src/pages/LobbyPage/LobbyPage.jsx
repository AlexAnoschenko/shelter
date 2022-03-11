import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { TelegramShareButton, TelegramIcon } from 'react-share';

import Loader from '../../components/Loader/Loader';
import UsersLoader from '../../components/UsersLoader/UsersLoader';
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
    marginBottom: '20px',
    textAlign: 'center',
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
  users: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    color: '#c4ee0b',
    textShadow:
      '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    fontSize: '20px',
  },
}));

const LobbyPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { room, socket } = useSelector((state) => state.room);
  const nickname = localStorage.getItem('nickname');

  const updateStoreRoom = () => {
    socket.send(
      JSON.stringify({
        method: 'updateRoom',
        id: room._id,
        nickname: localStorage.getItem('nickname'),
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

  const clearLS = () => {
    localStorage.clear();
  };

  useEffect(() => {
    if (socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          method: 'connection',
          nickname: localStorage.getItem('nickname'),
          id: localStorage.getItem('roomId'),
        })
      );
    }
  }, [socket.readyState]);

  useEffect(() => {
    socket.onmessage = (event) => {
      if (JSON.parse(event.data).users) {
        addRoom(JSON.parse(event.data));
      }
    };
  }, [socket]);

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
      <button onClick={clearLS}>Clear LS</button>
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
          {room ? (
            <div>
              <div
                className={classes.title}
              >{`${room.users.length} from ${room.numberOfPlayers} joined`}</div>
              <div className={classes.users}>
                {room.users.map((user) => (
                  <div
                    style={{
                      color: `#${Math.floor(
                        Math.random() * 16777215
                      ).toString(16)}`,
                    }}
                    key={user}
                  >
                    {user}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <UsersLoader />
          )}
        </>
      ) : (
        <NewUserPage updateStoreRoom={updateStoreRoom} />
      )}
    </div>
  );
};

export default LobbyPage;

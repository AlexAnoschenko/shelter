import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { getRoom } from '../../api/room';
import {
  addRoomAction,
  addUserAction,
} from '../../store/actions/roomActions';
import CardItem from './components/CardItem/CardItem';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    padding: 10,
  },
  cardsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
}));

const GamePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, room } = useSelector((state) => state.room);

  const addRoom = async (res) => {
    dispatch(addRoomAction(res));
  };

  const addUser = async (res) => {
    dispatch(addUserAction(res));
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getRoom(props.match.params.id);
      addRoom(res.data);
    }

    addUser({
      userId: localStorage.getItem('userId'),
      nickname: localStorage.getItem('nickname'),
    });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.main}>
      {user && room && (
        <>
          <div>{user.nickname}</div>
          <div className={classes.cardsList}>
            {room.users.map((usr) => {
              if (usr.nickname === user.nickname) {
                return usr.cards.map((card) => {
                  return <CardItem card={card} />;
                });
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;

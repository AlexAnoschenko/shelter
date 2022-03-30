import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { getRoom } from '../../api/room';
import {
  addRoomAction,
  addUserAction,
} from '../../store/actions/roomActions';
import CardItem from './components/CardItem/CardItem';
import PlayerSwicher from './components/PlayerSwicher/PlayerSwicher';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
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
  const [currentPlayer, setCurrentPlayer] = useState(
    localStorage.getItem('nickname')
  );

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

      res.data.users.map((user) => {
        if (user.nickname === localStorage.getItem('nickname')) {
          addUser(user);
        }
      });
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.main}>
      {user && room && (
        <>
          <div>{currentPlayer}</div>
          <div className={classes.cardsList}>
            {room.users.map((usr) => {
              if (usr.nickname === currentPlayer) {
                return usr.cards.map((card) => {
                  return <CardItem key={card.id} card={card} />;
                });
              }
              return null;
            })}
          </div>
          <PlayerSwicher currentPlayer={currentPlayer} room={room} />
        </>
      )}
    </div>
  );
};

export default GamePage;

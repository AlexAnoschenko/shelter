import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { getRoom } from '../../api/room';
import {
  addRoomAction,
  addUserAction,
} from '../../store/actions/roomActions';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
}));

const GamePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.room);

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
      {user && (
        <>
          <div>GamePage</div>
          <div>You are {user.nickname}</div>
        </>
      )}
    </div>
  );
};

export default GamePage;

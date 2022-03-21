import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../../components/Button/Button';
import CustomTextField from '../../components/TextField/TextField';
import { CreateRoomSchema } from './validators';
import { createRoom } from '../../api/room';
import { addUserAction } from '../../store/actions/roomActions';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '18px',
  },
  error: {
    fontSize: '20px',
    color: 'red',
    textAlign: 'center',
  },
}));

const CreateRoomPage = () => {
  const classes = useStyles();
  const { socket } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const router = useHistory();

  const addUser = async (res) => {
    dispatch(addUserAction(res));
  };

  const goToLobbyPage = () => {
    socket.send(
      JSON.stringify({
        method: 'connection',
        nickname: localStorage.getItem('nickname'),
        id: localStorage.getItem('roomId'),
      })
    );

    router.push(`/lobbyPage/${localStorage.getItem('roomId')}`);
  };

  const formik = useFormik({
    initialValues: {
      nickname: '',
      numberOfPlayers: '',
    },
    onSubmit: async (values) => {
      const res = await createRoom({
        nickname: values.nickname,
        numberOfPlayers: values.numberOfPlayers,
      });
      addUser(res.data.user);
      goToLobbyPage();
    },
    validationSchema: CreateRoomSchema,
  });

  return (
    <form className={classes.main} onSubmit={formik.handleSubmit}>
      {formik.errors.nickname || formik.errors.numberOfPlayers ? (
        <div className={classes.error}>Required fields!</div>
      ) : null}

      <CustomTextField
        id='nickname'
        name='nickname'
        value={formik.values.nickname}
        onChange={formik.handleChange}
        error={
          formik.touched.nickname && Boolean(formik.errors.nickname)
        }
        label='Enter your Nickname...'
      />
      <CustomTextField
        label='Number of Players...'
        id='numberOfPlayers'
        name='numberOfPlayers'
        value={formik.values.numberOfPlayers}
        onChange={formik.handleChange}
        error={
          formik.touched.numberOfPlayers &&
          Boolean(formik.errors.numberOfPlayers)
        }
        type='number'
      />
      <CustomButton type='submit' textButton='Ready!' height='62px' />
    </form>
  );
};

export default CreateRoomPage;

import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { makeStyles } from '@mui/styles';

import CustomButton from '../../components/Button/Button';
import CustomTextField from '../../components/TextField/TextField';
import { CreateRoomSchema } from './validators';
import { createRoom } from '../../api/createRoom';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '18px',
  },
}));

const CreateRoomPage = () => {
  const classes = useStyles();
  const router = useHistory();

  const goToLobbyPage = () => {
    router.push('/lobbyPage');
  };

  const formik = useFormik({
    initialValues: {
      nickname: '',
    },
    onSubmit: async (values) => {
      createRoom(values.nickname);
      goToLobbyPage();
    },
    validationSchema: CreateRoomSchema,
  });

  return (
    <form className={classes.main} onSubmit={formik.handleSubmit}>
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
      <CustomButton type='submit' textButton='Ready!' height='62px' />
    </form>
  );
};

export default CreateRoomPage;

import { useFormik } from 'formik';
import { makeStyles } from '@mui/styles';

import CustomButton from '../../components/Button/Button';
import CustomTextField from '../../components/TextField/TextField';
import { CreateUserSchema } from './validators';
import { createUser } from '../../api/room';

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

const NewUserPage = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      nickname: '',
    },
    onSubmit: async (values) => {
      await createUser({
        nickname: values.nickname,
      });
    },
    validationSchema: CreateUserSchema,
  });

  return (
    <form className={classes.main} onSubmit={formik.handleSubmit}>
      {formik.errors.nickname ? (
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

      <CustomButton type='submit' textButton='Ready!' height='62px' />
    </form>
  );
};

export default NewUserPage;

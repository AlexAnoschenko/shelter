import CustomButton from '../../components/Button/Button';
import { makeStyles } from '@mui/styles';
import CustomLink from '../../components/Link/Link';

const useStyles = makeStyles(() => ({
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '18px',
  },
  title: {
    fontSize: '3rem',
  },
}));

const StartPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.title}>S.H.E.L.T.E.R.</div>
      <CustomLink to='/createRoom'>
        <CustomButton textButton='Create Room!' />
      </CustomLink>

      <CustomLink to='/joinRoom'>
        <CustomButton textButton='Join the Room!' />
      </CustomLink>
    </div>
  );
};

export default StartPage;

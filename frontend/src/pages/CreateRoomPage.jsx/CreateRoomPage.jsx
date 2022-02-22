import CustomButton from '../../components/Button/Button';
import { makeStyles } from '@mui/styles';

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

  return (
    <div className={classes.main}>
      <CustomButton textButton='Ready!' />
    </div>
  );
};

export default CreateRoomPage;

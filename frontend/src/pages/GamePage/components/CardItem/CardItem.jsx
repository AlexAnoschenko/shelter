import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  main: {
    width: '90px',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    backgroundColor: '#016b2a',
    padding: '10px',
    border: '2px solid black',
    borderRadius: '10px',
  },
}));

const CardItem = ({ card }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div>{card.type.toUpperCase()}</div>
      <div>{card.description}</div>
    </div>
  );
};

export default CardItem;

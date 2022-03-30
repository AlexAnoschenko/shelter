import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '90px',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 18,
    backgroundColor: (props) =>
      props.isVisible ? '#016b2a' : '#3b3b3b',
    padding: '10px',
    border: '2px solid black',
    borderRadius: '10px',
  },
}));

const CardItem = ({ card }) => {
  const classes = useStyles({ isVisible: card.isVisible });

  return (
    <div className={classes.main}>
      <div>{card.type.toUpperCase()}</div>
      <div>{card.description}</div>
    </div>
  );
};

export default CardItem;

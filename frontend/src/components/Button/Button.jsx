import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: (props) => props.width,
    height: (props) => props.height,
    fontSize: '1.5rem !important',
    textTransform: 'none !important',
    backgroundColor: '#5f5f5f !important',
    color: 'antiquewhite !important',

    '&:active': {
      backgroundColor: '#1b1b1b !important',
    },
  },
}));

const CustomButton = ({ textButton, width = 280, height = 55 }) => {
  const classes = useStyles({ width, height });

  return (
    <Button className={classes.root} variant='contained'>
      {textButton}
    </Button>
  );
};

export default CustomButton;

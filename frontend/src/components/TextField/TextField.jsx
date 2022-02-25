import { Box, TextField } from '@mui/material';

const useStyles = () => ({
  root: {
    background: 'antiquewhite',
    borderRadius: '4px 4px 0 0',
    width: '280px',

    '& .MuiInputLabel-root': {
      fontSize: '20px',

      '&.Mui-focused': {
        color: '#575757',
      },
    },

    '& .MuiFilledInput-input': {
      fontSize: '20px',
    },

    '& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after': {
      borderBottom: '2px solid #eee60f',
    },
  },
  error: {
    fontSize: '20px',
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
});

const CustomTextField = ({
  label = 'Text',
  id,
  name,
  value,
  onChange,
  error,
}) => {
  const classes = useStyles();

  return (
    <div>
      {error && <Box sx={classes.error}>Required field!</Box>}
      <TextField
        sx={classes.root}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        label={label}
        variant='filled'
      />
    </div>
  );
};

export default CustomTextField;

import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    btn: {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
      '&:hover': {
        background: "linear-gradient(45deg,  #0e77ee  30%, #032449  90%)",
     }
    },
    googlebtn: {
      background: 'linear-gradient(45deg,  #047e4e  30%,  #0ce791  90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
      '&:hover': {
        background: "linear-gradient(45deg, #0ce791 30%,  #047e4e 90%)",
     }
    },
    link:{
        color: 'gray',
        textDecoration: 'none',
        '&:hover':{
            color: ' #066120 ',
            textDecoration: 'underline'
        }
    }

});

export default useStyles;
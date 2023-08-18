import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    headerBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: {
        fontWeight: 500,
        fontFamily: 'Poppins, sans-serif',
        color: '#4A90E2',
        textAlign: 'center'
    },
    addUserButton: {
        width: '100%'
    }
}));

export default useStyles;

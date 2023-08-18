import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '32px'
    },
    paper: {
        padding: '16px',
        marginBottom: '20px'
    },
    paginationBox: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

export default useStyles;

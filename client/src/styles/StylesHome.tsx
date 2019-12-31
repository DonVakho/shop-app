import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        itemsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            margin: theme.spacing(4),
        },
        scrollUpContainer: {
            position: 'fixed',
            flexDirection: 'column',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        kunaiIcon: {
            width: '30px',
            transform: 'rotate(-45deg)'
        },
        kunaiFab: {
            width: '55px',
            height: '55px',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #000000',
        },
    })
);
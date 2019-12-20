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
        card: {
            width: 250,
            margin: theme.spacing(2)
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-around',
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
        kunaiIconDown: {
            width: '30px',
            transform: 'rotate(135deg)'
        },
        kunaiFab: {
            width: '55px',
            height: '55px',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #000000',
        },
        popoverContainer: {
            margin: theme.spacing(2),
            position: 'absolute',
        },
        dialogContentRow: {
            display: 'flex',
            flexDirection: 'row',
        },
        dialogContentColumn: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
        },
        dialogForm: {
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            width: '500px' 
        },
        dialogFormMobile: {
            display: 'flex',
            flexDirection: 'column',
        },
        dialogImg: {
            marginRight: theme.spacing(2),
            width: '500px' 
        },
        dialogImgMobile: {
            width: '500px',
            marginRight: theme.spacing(2),
        },
        formControl: {
            marginTop: theme.spacing(2),
            minWidth: 120,
        },
        formControlLabel: {
            marginTop: theme.spacing(1),
        },
    }),
);
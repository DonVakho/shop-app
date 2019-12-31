import {
    createStyles,
    makeStyles,
    Theme,

} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogForm: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '40vw',
            padding: theme.spacing(1),
        },
        dialogFormMobile: {
            display: 'flex',
            width:  `calc(80vw - ${theme.spacing(2)}px)`,
            flexDirection: 'column',
        },
        expansionPanel: {
            overflowY: 'auto',
            maxHeight: '150px',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        expansionPanelMobile: {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(2),
            
        },
        kunaiIconDown: {
            width: '25px',
            transform: 'rotate(135deg)'
        },
        rowWithMultipleElements: {
            display: 'flex',
        },
        largeffilterRow: {
            flex: 1,
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(2),
           
        },
        buttonForm: {
            display:'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: theme.spacing(2),
        },
        buttonBuy: {
            color: 'green'
        },
        buttonCart:{
            color: 'blue'
        },
        buttonClose: {
            color: 'black'
        }
    }),
);
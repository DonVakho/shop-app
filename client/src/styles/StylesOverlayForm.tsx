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
            width: '40vw',
            padding: theme.spacing(1),
        },
        dialogFormMobile: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(1),
        },
        expansionPanel: {
            overflowY: 'auto',
            maxHeight: '150px',
            marginBottom: theme.spacing(2),
        },
        expansionPanelMobile: {
            marginBottom: theme.spacing(2),
        },
        kunaiIconDown: {
            width: '25px',
            transform: 'rotate(135deg)'
        },
        rowWithMultipleElements: {
            display: 'flex',
        },
        collumnWithMultipleElements: {
            display: 'flex',
            flexDirection: 'column'
        },
        largeffilterRow: {
            flex: 4,
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
            justifyContent: 'center',
            alignContent: 'center'
        },
        smallFilterRow: {
            flex: 2,
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
            justifyContent: 'center'
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
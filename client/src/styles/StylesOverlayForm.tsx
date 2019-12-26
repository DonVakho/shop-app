import {
    createStyles,
    makeStyles,
    withStyles,
    Theme
} from '@material-ui/core/styles';

import {
    InputBase,
} from '@material-ui/core';

export const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:focus': {
                borderRadius: 4,
                borderColor: 'rgba(208, 20, 20, .25)',
                boxShadow: '0 0 0 0.2rem rgba(208, 20, 20, .25)',
            },
            '&:disabled': {
                backgroundColor: 'rgba(0, 0, 0, .15)',
                'label': {
                    marginTop: theme.spacing(3),
                },
            }
        }
    })
)(InputBase);

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogForm: {
            display: 'flex',
            flexDirection: 'column',
            width: '40vw'
        },
        dialogFormMobile: {
            display: 'flex',
            flexDirection: 'column'
        },
        expansionPanel: {
            overflowY: 'auto',
            maxHeight: '300px',
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        expansionPanelMobile: {
            maxWidth: '70vw',
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        kunaiIconDown: {
            width: '25px',
            transform: 'rotate(135deg)'
        },
        divWithTwoSelects: {
            display: 'flex',
        },
        HalffilterRow: {
            flex: 1,
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
    }),
);
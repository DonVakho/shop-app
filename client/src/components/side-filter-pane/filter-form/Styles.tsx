import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';

import {
    InputBase
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
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }),
)(InputBase);


export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        filterRow: {
            width: '18vw',
            marginLeft: '1vw',
            marginBottom: '15px'
        },
        filterRowCenter: {
            alignContent: 'center'
        },
        divider: {
            marginTop: '5px',
            marginBottom: '5px'
        },
        option: {
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            transition: theme.transitions.create(['border-color', 'box-shadow']),
        }
    }),
);
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';

import {
    InputBase,
    Slider,
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

export const PriceSlider = withStyles((theme: Theme) =>
    createStyles({
        root: {
            color: '#9a1700',
            height: 8,
            width: '85%'
        },
        thumb: {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            marginTop: -8,
            marginLeft: -12,
            '&:focus,&:hover,&$active': {
                boxShadow: 'inherit',
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)',
        },
        track: {
            height: 8,
            borderRadius: 4,
            marginRight: '1000px'
        },
        rail: {
            height: 8,
            borderRadius: 4,
            
        }
    }),
)(Slider);

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column'
        },
        filterRow: {
            flexGrow: 1,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        filterRowCenter: {
            alignContent: 'center'
        },
        divider: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        priceSlider: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(3),
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-around'
        },
        sliderContainer: {
            flexGrow: 0
        },
        rotatedIcon: {
            transform: 'rotate(180deg)'
        }
    }),
);
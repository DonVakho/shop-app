import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogContentRow: {
            display: 'flex',
            flexDirection: 'row',
        },
        dialogContentColumn: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        dialogImg: {
            marginRight: theme.spacing(2),
            width: '32vw',
            height: '21.3vw'
        },
        dialogImgMobile: {
            width: '80vw',
        }
    })
);